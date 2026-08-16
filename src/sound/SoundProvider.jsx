import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const SoundContext = createContext(null)
const MASTER_GAIN = 1.29 // 0.86 × 1.5 — requested +50% global level.

function readPreference() {
  try {
    return localStorage.getItem('stanislav-site-sound') === 'on'
  } catch {
    return false
  }
}

function savePreference(enabled) {
  try {
    localStorage.setItem('stanislav-site-sound', enabled ? 'on' : 'off')
  } catch {
    // Sound preference is optional; the site works without storage access.
  }
}

function safeStop(node, when) {
  try { node?.stop?.(when) } catch {}
}

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(readPreference)
  const audioRef = useRef(null)
  const masterRef = useRef(null)
  const ambientRef = useRef(null)
  const lastHoverRef = useRef({ element: null, time: 0 })
  const lastSectionRef = useRef(0)
  const seenSectionsRef = useRef(new Set())

  const ensureAudio = useCallback(async () => {
    if (typeof window === 'undefined') return null
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null

    if (!audioRef.current) {
      const ctx = new AudioCtx()
      const master = ctx.createGain()
      master.gain.value = MASTER_GAIN
      master.connect(ctx.destination)
      audioRef.current = ctx
      masterRef.current = master
    }

    const ctx = audioRef.current
    if (ctx.state === 'suspended') {
      try { await ctx.resume() } catch { return null }
    }
    return ctx
  }, [])

  const stopAmbient = useCallback((fade = true) => {
    const ambient = ambientRef.current
    ambientRef.current = null
    if (!ambient) return

    ambient.active = false
    ambient.timers.forEach((timer) => window.clearTimeout(timer))
    ambient.timers.clear()

    const now = ambient.ctx.currentTime
    const stopAt = now + (fade ? 0.42 : 0.02)

    try {
      ambient.bus.gain.cancelScheduledValues(now)
      ambient.bus.gain.setValueAtTime(Math.max(0.0001, ambient.bus.gain.value), now)
      ambient.bus.gain.exponentialRampToValueAtTime(0.0001, stopAt)
    } catch {}

    ambient.nodes.forEach((node) => safeStop(node, stopAt + 0.03))
    window.setTimeout(() => {
      ambient.connections.forEach((node) => {
        try { node.disconnect?.() } catch {}
      })
    }, fade ? 520 : 80)
  }, [])

  const startAmbient = useCallback(async () => {
    if (ambientRef.current?.active) return true

    const ctx = await ensureAudio()
    if (!ctx || ctx.state !== 'running' || !masterRef.current) return false

    const now = ctx.currentTime
    const bus = ctx.createGain()
    const toneFilter = ctx.createBiquadFilter()
    const airFilter = ctx.createBiquadFilter()
    const nodes = []
    const connections = [bus, toneFilter, airFilter]
    const timers = new Set()

    bus.gain.setValueAtTime(0.0001, now)
    bus.gain.exponentialRampToValueAtTime(0.012, now + 1.8)

    toneFilter.type = 'lowpass'
    toneFilter.frequency.value = 520
    toneFilter.Q.value = 0.55

    airFilter.type = 'bandpass'
    airFilter.frequency.value = 1850
    airFilter.Q.value = 0.42

    toneFilter.connect(bus)
    airFilter.connect(bus)
    bus.connect(masterRef.current)

    const connectTone = ({ frequency, type = 'sine', gain = 0.001, pan = 0, detune = 0 }) => {
      const osc = ctx.createOscillator()
      const amp = ctx.createGain()
      const panner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null

      osc.type = type
      osc.frequency.value = frequency
      osc.detune.value = detune
      amp.gain.value = gain
      if (panner) panner.pan.value = pan

      osc.connect(amp)
      if (panner) {
        amp.connect(panner)
        panner.connect(toneFilter)
        connections.push(panner)
      } else {
        amp.connect(toneFilter)
      }

      osc.start(now)
      nodes.push(osc)
      connections.push(osc, amp)
    }

    // Subtle cyberpunk bed: low electrical hum + upper digital air.
    connectTone({ frequency: 74, type: 'sine', gain: 0.0027, pan: -0.08 })
    connectTone({ frequency: 148.5, type: 'triangle', gain: 0.00125, pan: 0.08, detune: -4 })
    connectTone({ frequency: 222.6, type: 'sine', gain: 0.00065, pan: 0.02, detune: 5 })

    const lfo = ctx.createOscillator()
    const lfoDepth = ctx.createGain()
    lfo.type = 'sine'
    lfo.frequency.value = 0.075
    lfoDepth.gain.value = 0.0022
    lfo.connect(lfoDepth)
    lfoDepth.connect(bus.gain)
    lfo.start(now)
    nodes.push(lfo)
    connections.push(lfo, lfoDepth)

    const airLeft = ctx.createOscillator()
    const airRight = ctx.createOscillator()
    const airLeftGain = ctx.createGain()
    const airRightGain = ctx.createGain()
    const leftPan = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null
    const rightPan = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null

    airLeft.type = 'sine'
    airRight.type = 'sine'
    airLeft.frequency.value = 1780
    airRight.frequency.value = 1792
    airLeftGain.gain.value = 0.00018
    airRightGain.gain.value = 0.00016
    airLeft.connect(airLeftGain)
    airRight.connect(airRightGain)

    if (leftPan && rightPan) {
      leftPan.pan.value = -0.58
      rightPan.pan.value = 0.58
      airLeftGain.connect(leftPan)
      airRightGain.connect(rightPan)
      leftPan.connect(airFilter)
      rightPan.connect(airFilter)
      connections.push(leftPan, rightPan)
    } else {
      airLeftGain.connect(airFilter)
      airRightGain.connect(airFilter)
    }

    airLeft.start(now)
    airRight.start(now)
    nodes.push(airLeft, airRight)
    connections.push(airLeft, airRight, airLeftGain, airRightGain)

    const ambient = { ctx, bus, nodes, connections, timers, active: true }
    ambientRef.current = ambient

    const schedule = (fn, delay) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer)
        if (ambientRef.current !== ambient || !ambient.active) return
        fn()
      }, delay)
      timers.add(timer)
    }

    const scanner = () => {
      if (ambientRef.current !== ambient || !ambient.active) return
      const start = ctx.currentTime + 0.015
      const duration = 1.65 + Math.random() * 0.55
      const end = start + duration
      const osc = ctx.createOscillator()
      const amp = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      const panner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(235 + Math.random() * 35, start)
      osc.frequency.exponentialRampToValueAtTime(920 + Math.random() * 260, end)
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(620, start)
      filter.frequency.exponentialRampToValueAtTime(2100, end)
      filter.Q.value = 1.15
      amp.gain.setValueAtTime(0.0001, start)
      amp.gain.exponentialRampToValueAtTime(0.00115, start + duration * 0.28)
      amp.gain.exponentialRampToValueAtTime(0.0001, end)

      osc.connect(filter)
      filter.connect(amp)
      if (panner) {
        panner.pan.setValueAtTime(-0.68, start)
        panner.pan.linearRampToValueAtTime(0.68, end)
        amp.connect(panner)
        panner.connect(bus)
      } else {
        amp.connect(bus)
      }

      osc.start(start)
      osc.stop(end + 0.03)
      window.setTimeout(() => {
        try { osc.disconnect(); filter.disconnect(); amp.disconnect(); panner?.disconnect() } catch {}
      }, (duration + 0.2) * 1000)

      schedule(scanner, 11000 + Math.random() * 9000)
    }

    const sparkle = () => {
      if (ambientRef.current !== ambient || !ambient.active) return
      const base = ctx.currentTime + 0.015
      const count = Math.random() > 0.55 ? 2 : 1

      for (let index = 0; index < count; index += 1) {
        const osc = ctx.createOscillator()
        const amp = ctx.createGain()
        const panner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null
        const start = base + index * 0.055
        const end = start + 0.045 + Math.random() * 0.035
        const from = 1180 + Math.random() * 780

        osc.type = index % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(from, start)
        osc.frequency.exponentialRampToValueAtTime(from * (1.12 + Math.random() * 0.18), end)
        amp.gain.setValueAtTime(0.0001, start)
        amp.gain.exponentialRampToValueAtTime(0.00072, start + 0.008)
        amp.gain.exponentialRampToValueAtTime(0.0001, end)
        osc.connect(amp)

        if (panner) {
          panner.pan.value = -0.7 + Math.random() * 1.4
          amp.connect(panner)
          panner.connect(bus)
        } else {
          amp.connect(bus)
        }

        osc.start(start)
        osc.stop(end + 0.02)
      }

      schedule(sparkle, 6500 + Math.random() * 8500)
    }

    schedule(scanner, 6500 + Math.random() * 4500)
    schedule(sparkle, 3800 + Math.random() * 3500)
    return true
  }, [ensureAudio])

  const synth = useCallback(async (kind = 'tap', force = false) => {
    if (!enabled && !force) return
    const ctx = await ensureAudio()
    if (!ctx || !masterRef.current) return

    const now = ctx.currentTime
    const master = masterRef.current

    const note = ({ delay = 0, from = 520, to = from, duration = 0.07, volume = 0.012, type = 'sine', pan = 0 }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      const panner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null
      const start = now + delay
      const end = start + duration

      osc.type = type
      osc.frequency.setValueAtTime(Math.max(40, from), start)
      if (to !== from) osc.frequency.exponentialRampToValueAtTime(Math.max(40, to), end)

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(kind === 'section' ? 1300 : 2400, start)
      filter.Q.value = 0.5

      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), start + Math.min(0.012, duration * 0.2))
      gain.gain.exponentialRampToValueAtTime(0.0001, end)

      osc.connect(filter)
      filter.connect(gain)
      if (panner) {
        panner.pan.value = pan
        gain.connect(panner)
        panner.connect(master)
      } else {
        gain.connect(master)
      }

      osc.start(start)
      osc.stop(end + 0.02)
    }

    if (kind === 'hover') {
      note({ from: 820, to: 910, duration: 0.032, volume: 0.0045, pan: -0.08 })
      return
    }
    if (kind === 'select') {
      note({ from: 340, to: 440, duration: 0.065, volume: 0.010, type: 'triangle', pan: -0.14 })
      note({ delay: 0.018, from: 680, to: 760, duration: 0.055, volume: 0.0065, pan: 0.14 })
      return
    }
    if (kind === 'confirm') {
      note({ from: 520, to: 620, duration: 0.075, volume: 0.011, type: 'triangle', pan: -0.08 })
      note({ delay: 0.045, from: 780, to: 920, duration: 0.085, volume: 0.009, pan: 0.08 })
      return
    }
    if (kind === 'section') {
      note({ from: 155, to: 205, duration: 0.16, volume: 0.0075, pan: -0.12 })
      note({ delay: 0.045, from: 310, to: 390, duration: 0.14, volume: 0.0045, type: 'triangle', pan: 0.12 })
      return
    }
    if (kind === 'enable') {
      note({ from: 300, to: 390, duration: 0.075, volume: 0.009, type: 'triangle', pan: -0.2 })
      note({ delay: 0.06, from: 500, to: 640, duration: 0.09, volume: 0.008 })
      note({ delay: 0.125, from: 760, to: 980, duration: 0.11, volume: 0.0068, pan: 0.2 })
      return
    }
    if (kind === 'disable') {
      note({ from: 620, to: 280, duration: 0.11, volume: 0.008, type: 'triangle' })
      return
    }

    note({ from: 440, to: 530, duration: 0.055, volume: 0.008, type: 'triangle' })
  }, [enabled, ensureAudio])

  const toggle = useCallback(() => {
    const next = !enabled
    if (next) {
      setEnabled(true)
      savePreference(true)
      synth('enable', true)
      seenSectionsRef.current = new Set()
    } else {
      synth('disable', true)
      stopAmbient(true)
      setEnabled(false)
      savePreference(false)
    }
  }, [enabled, stopAmbient, synth])

  useEffect(() => {
    if (!enabled) {
      stopAmbient(false)
      return undefined
    }

    let disposed = false
    let waitingForGesture = false

    const bootAmbient = async () => {
      if (disposed) return
      const started = await startAmbient()
      if (started || disposed || waitingForGesture) return
      waitingForGesture = true
      window.addEventListener('pointerdown', bootAmbient, { once: true, passive: true })
      window.addEventListener('keydown', bootAmbient, { once: true })
    }

    bootAmbient()
    return () => {
      disposed = true
      window.removeEventListener('pointerdown', bootAmbient)
      window.removeEventListener('keydown', bootAmbient)
      stopAmbient(true)
    }
  }, [enabled, startAmbient, stopAmbient])

  useEffect(() => {
    if (!enabled) return undefined

    const onPointerOver = (event) => {
      if (event.pointerType === 'touch') return
      const interactive = event.target.closest?.('a, button, [role="button"], [tabindex="0"]')
      if (!interactive || interactive.dataset.sound === 'off' || interactive.dataset.soundToggle === 'true') return

      const now = performance.now()
      const previous = lastHoverRef.current
      if (previous.element === interactive && now - previous.time < 240) return
      if (now - previous.time < 55) return
      lastHoverRef.current = { element: interactive, time: now }
      synth('hover')
    }

    const onClick = (event) => {
      const interactive = event.target.closest?.('a, button, [role="button"], [tabindex="0"]')
      if (!interactive || interactive.dataset.sound === 'off' || interactive.dataset.soundToggle === 'true') return

      if (
        interactive.closest('.languageSwitch') ||
        interactive.closest('.aiAppTabs') ||
        interactive.closest('.processList') ||
        interactive.closest('.referenceChapters') ||
        interactive.classList.contains('flowStage') ||
        interactive.classList.contains('aiStage') ||
        interactive.closest('.aiModelRail')
      ) {
        synth('select')
        return
      }

      if (interactive.type === 'submit' || interactive.closest('.assistantInput')) {
        synth('confirm')
        return
      }

      synth('tap')
    }

    document.addEventListener('pointerover', onPointerOver, true)
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('pointerover', onPointerOver, true)
      document.removeEventListener('click', onClick, true)
    }
  }, [enabled, synth])

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return undefined

    const sections = [...document.querySelectorAll('main section, main .referenceDeck')]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.34)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (!visible) return
      const element = visible.target
      const key = element.id || element.className || 'section'
      const now = performance.now()
      if (seenSectionsRef.current.has(key) || now - lastSectionRef.current < 850) return

      seenSectionsRef.current.add(key)
      lastSectionRef.current = now
      synth('section')
    }, { threshold: [0.34, 0.5, 0.7] })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [enabled, synth])

  const value = useMemo(() => ({ enabled, toggle, play: synth }), [enabled, toggle, synth])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSiteSound() {
  const value = useContext(SoundContext)
  if (!value) return { enabled: false, toggle: () => {}, play: () => {} }
  return value
}
