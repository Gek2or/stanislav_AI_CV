import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const SoundContext = createContext(null)

const STORAGE_KEY = 'stanislav-site-sound'
const STEP_MS = 272

function readPreference() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on'
  } catch {
    return false
  }
}

function savePreference(enabled) {
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off')
  } catch {}
}

function safeStop(node, when = 0) {
  try { node?.stop?.(when) } catch {}
}

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(readPreference)
  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const musicRef = useRef(null)
  const sfxRef = useRef(null)
  const compressorRef = useRef(null)
  const soundtrackRef = useRef(null)
  const hoverRef = useRef({ element: null, time: 0 })
  const sectionRef = useRef({ last: 0, seen: new Set() })

  const ensureGraph = useCallback(async () => {
    if (typeof window === 'undefined') return null
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null

    if (!ctxRef.current) {
      const ctx = new AudioCtx()
      const master = ctx.createGain()
      const music = ctx.createGain()
      const sfx = ctx.createGain()
      const compressor = ctx.createDynamicsCompressor()

      // Deliberately audible mix. The previous version was technically running
      // but its individual voices were down around 0.004–0.012 gain.
      master.gain.value = 0.92
      music.gain.value = 0.72
      sfx.gain.value = 1.0

      compressor.threshold.value = -14
      compressor.knee.value = 12
      compressor.ratio.value = 5
      compressor.attack.value = 0.003
      compressor.release.value = 0.18

      music.connect(master)
      sfx.connect(master)
      master.connect(compressor)
      compressor.connect(ctx.destination)

      ctxRef.current = ctx
      masterRef.current = master
      musicRef.current = music
      sfxRef.current = sfx
      compressorRef.current = compressor
    }

    const ctx = ctxRef.current
    if (ctx.state === 'suspended') {
      try { await ctx.resume() } catch { return null }
    }
    return ctx
  }, [])

  const oneShot = useCallback((ctx, destination, {
    from = 440,
    to = from,
    delay = 0,
    duration = 0.08,
    volume = 0.12,
    type = 'triangle',
    pan = 0,
    cutoff = 5000,
  } = {}) => {
    if (!ctx || !destination) return
    const start = ctx.currentTime + delay
    const end = start + duration
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    const panner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null

    osc.type = type
    osc.frequency.setValueAtTime(Math.max(35, from), start)
    if (to !== from) osc.frequency.exponentialRampToValueAtTime(Math.max(35, to), end)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(cutoff, start)
    filter.Q.value = 0.55

    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), start + Math.min(0.012, duration * 0.22))
    gain.gain.exponentialRampToValueAtTime(0.0001, end)

    osc.connect(filter)
    filter.connect(gain)
    if (panner) {
      panner.pan.value = pan
      gain.connect(panner)
      panner.connect(destination)
    } else {
      gain.connect(destination)
    }

    osc.start(start)
    osc.stop(end + 0.03)
    window.setTimeout(() => {
      try { osc.disconnect(); filter.disconnect(); gain.disconnect(); panner?.disconnect() } catch {}
    }, Math.ceil((delay + duration + 0.15) * 1000))
  }, [])

  const noiseHit = useCallback((ctx, destination, {
    delay = 0,
    duration = 0.04,
    volume = 0.035,
    highpass = 3800,
    pan = 0,
  } = {}) => {
    if (!ctx || !destination) return
    const frames = Math.max(1, Math.floor(ctx.sampleRate * duration))
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < frames; i += 1) data[i] = Math.random() * 2 - 1

    const source = ctx.createBufferSource()
    const filter = ctx.createBiquadFilter()
    const gain = ctx.createGain()
    const panner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null
    const start = ctx.currentTime + delay
    const end = start + duration

    source.buffer = buffer
    filter.type = 'highpass'
    filter.frequency.value = highpass
    filter.Q.value = 0.65
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.0001, end)

    source.connect(filter)
    filter.connect(gain)
    if (panner) {
      panner.pan.value = pan
      gain.connect(panner)
      panner.connect(destination)
    } else {
      gain.connect(destination)
    }

    source.start(start)
    source.stop(end + 0.01)
  }, [])

  const stopSoundtrack = useCallback((fade = true) => {
    const track = soundtrackRef.current
    soundtrackRef.current = null
    if (!track) return

    track.active = false
    window.clearInterval(track.interval)
    window.clearTimeout(track.startTimer)

    const now = track.ctx.currentTime
    const stopAt = now + (fade ? 0.35 : 0.03)
    try {
      track.bedGain.gain.cancelScheduledValues(now)
      track.bedGain.gain.setValueAtTime(Math.max(0.0001, track.bedGain.gain.value), now)
      track.bedGain.gain.exponentialRampToValueAtTime(0.0001, stopAt)
    } catch {}

    track.nodes.forEach((node) => safeStop(node, stopAt + 0.04))
    window.setTimeout(() => {
      track.connections.forEach((node) => {
        try { node.disconnect?.() } catch {}
      })
    }, fade ? 500 : 80)
  }, [])

  const startSoundtrack = useCallback(async () => {
    if (soundtrackRef.current?.active) return true
    const ctx = await ensureGraph()
    const destination = musicRef.current
    if (!ctx || ctx.state !== 'running' || !destination) return false

    const now = ctx.currentTime
    const bedGain = ctx.createGain()
    const bedFilter = ctx.createBiquadFilter()
    const nodes = []
    const connections = [bedGain, bedFilter]

    bedGain.gain.setValueAtTime(0.0001, now)
    bedGain.gain.exponentialRampToValueAtTime(0.34, now + 0.8)
    bedFilter.type = 'lowpass'
    bedFilter.frequency.value = 1350
    bedFilter.Q.value = 0.6
    bedFilter.connect(bedGain)
    bedGain.connect(destination)

    const addBed = (frequency, type, gainValue, detune = 0, pan = 0) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const panner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null
      osc.type = type
      osc.frequency.value = frequency
      osc.detune.value = detune
      gain.gain.value = gainValue
      osc.connect(gain)
      if (panner) {
        panner.pan.value = pan
        gain.connect(panner)
        panner.connect(bedFilter)
        connections.push(panner)
      } else {
        gain.connect(bedFilter)
      }
      osc.start(now)
      nodes.push(osc)
      connections.push(osc, gain)
    }

    // Constant low cinematic bed so SOUND ON is immediately obvious.
    addBed(55, 'sine', 0.16, 0, -0.08)
    addBed(110, 'triangle', 0.075, -5, 0.08)
    addBed(164.8, 'sine', 0.038, 4, -0.18)
    addBed(220, 'triangle', 0.024, -7, 0.2)

    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.type = 'sine'
    lfo.frequency.value = 0.11
    lfoGain.gain.value = 0.09
    lfo.connect(lfoGain)
    lfoGain.connect(bedGain.gain)
    lfo.start(now)
    nodes.push(lfo)
    connections.push(lfo, lfoGain)

    const track = { ctx, active: true, interval: 0, startTimer: 0, step: 0, nodes, connections, bedGain }
    soundtrackRef.current = track

    const bass = [55, 55, 65.4, 55, 49, 49, 65.4, 73.4]
    const arp = [220, 261.6, 329.6, 392, 329.6, 261.6, 246.9, 293.7]

    const tick = () => {
      if (soundtrackRef.current !== track || !track.active) return
      const step = track.step % 16
      const phrase = Math.floor(track.step / 2) % 8

      if (step % 2 === 0) {
        const bassFreq = bass[phrase]
        oneShot(ctx, destination, {
          from: bassFreq,
          to: bassFreq * 0.965,
          duration: 0.22,
          volume: step % 4 === 0 ? 0.19 : 0.13,
          type: 'sine',
          cutoff: 620,
          pan: -0.04,
        })
        oneShot(ctx, destination, {
          from: arp[phrase],
          to: arp[phrase] * 1.018,
          duration: 0.11,
          volume: 0.055,
          type: 'triangle',
          cutoff: 2500,
          pan: step % 4 === 0 ? -0.3 : 0.3,
        })
      }

      if (step % 2 === 1) {
        noiseHit(ctx, destination, {
          duration: 0.032,
          volume: step % 4 === 3 ? 0.052 : 0.035,
          highpass: 4200,
          pan: step % 4 === 1 ? -0.22 : 0.22,
        })
      }

      if (step === 0 || step === 8) {
        oneShot(ctx, destination, {
          from: 92,
          to: 48,
          duration: 0.18,
          volume: 0.22,
          type: 'sine',
          cutoff: 900,
        })
      }

      if (step === 7 || step === 15) {
        oneShot(ctx, destination, {
          from: 880,
          to: 1320,
          duration: 0.09,
          volume: 0.045,
          type: 'sine',
          cutoff: 3800,
          pan: step === 7 ? -0.45 : 0.45,
        })
      }

      track.step += 1
    }

    tick()
    track.startTimer = window.setTimeout(() => {
      if (soundtrackRef.current !== track || !track.active) return
      track.interval = window.setInterval(tick, STEP_MS)
    }, STEP_MS)

    return true
  }, [ensureGraph, noiseHit, oneShot])

  const play = useCallback(async (kind = 'tap', force = false) => {
    if (!enabled && !force) return
    const ctx = await ensureGraph()
    const destination = sfxRef.current
    if (!ctx || !destination) return

    if (kind === 'hover') {
      oneShot(ctx, destination, { from: 900, to: 1080, duration: 0.035, volume: 0.075, type: 'sine', pan: -0.08 })
      return
    }
    if (kind === 'select') {
      oneShot(ctx, destination, { from: 330, to: 460, duration: 0.075, volume: 0.18, type: 'triangle', pan: -0.18 })
      oneShot(ctx, destination, { delay: 0.022, from: 720, to: 890, duration: 0.065, volume: 0.12, pan: 0.18 })
      return
    }
    if (kind === 'confirm') {
      oneShot(ctx, destination, { from: 480, to: 650, duration: 0.085, volume: 0.21, type: 'triangle', pan: -0.12 })
      oneShot(ctx, destination, { delay: 0.052, from: 760, to: 1040, duration: 0.095, volume: 0.16, pan: 0.12 })
      return
    }
    if (kind === 'section') {
      oneShot(ctx, destination, { from: 135, to: 210, duration: 0.18, volume: 0.15, type: 'sine', cutoff: 1200, pan: -0.1 })
      oneShot(ctx, destination, { delay: 0.045, from: 310, to: 410, duration: 0.15, volume: 0.095, type: 'triangle', cutoff: 1800, pan: 0.1 })
      return
    }
    if (kind === 'enable') {
      oneShot(ctx, destination, { from: 240, to: 360, duration: 0.085, volume: 0.24, type: 'triangle', pan: -0.22 })
      oneShot(ctx, destination, { delay: 0.065, from: 480, to: 680, duration: 0.10, volume: 0.20 })
      oneShot(ctx, destination, { delay: 0.14, from: 760, to: 1080, duration: 0.13, volume: 0.17, pan: 0.22 })
      return
    }
    if (kind === 'disable') {
      oneShot(ctx, destination, { from: 620, to: 260, duration: 0.13, volume: 0.18, type: 'triangle' })
      return
    }

    oneShot(ctx, destination, { from: 430, to: 560, duration: 0.06, volume: 0.14, type: 'triangle' })
  }, [enabled, ensureGraph, oneShot])

  const toggle = useCallback(async () => {
    const next = !enabled
    if (next) {
      setEnabled(true)
      savePreference(true)
      sectionRef.current = { last: 0, seen: new Set() }
      await ensureGraph()
      await play('enable', true)
      await startSoundtrack()
    } else {
      await play('disable', true)
      window.setTimeout(() => stopSoundtrack(true), 120)
      setEnabled(false)
      savePreference(false)
    }
  }, [enabled, ensureGraph, play, startSoundtrack, stopSoundtrack])

  useEffect(() => {
    if (!enabled) {
      stopSoundtrack(false)
      return undefined
    }

    let disposed = false
    let waiting = false

    const boot = async () => {
      if (disposed) return
      const started = await startSoundtrack()
      if (started || disposed || waiting) return
      waiting = true
      const retry = async () => {
        waiting = false
        await ensureGraph()
        await startSoundtrack()
      }
      window.addEventListener('pointerdown', retry, { once: true, capture: true, passive: true })
      window.addEventListener('keydown', retry, { once: true, capture: true })
    }

    boot()
    return () => {
      disposed = true
      stopSoundtrack(true)
    }
  }, [enabled, ensureGraph, startSoundtrack, stopSoundtrack])

  useEffect(() => {
    if (!enabled) return undefined

    const onPointerOver = (event) => {
      if (event.pointerType === 'touch') return
      const interactive = event.target.closest?.('a, button, [role="button"], [tabindex="0"]')
      if (!interactive || interactive.dataset.sound === 'off' || interactive.dataset.soundToggle === 'true') return

      const now = performance.now()
      const previous = hoverRef.current
      if (previous.element === interactive && now - previous.time < 220) return
      if (now - previous.time < 60) return
      hoverRef.current = { element: interactive, time: now }
      play('hover')
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
        play('select')
        return
      }

      if (interactive.type === 'submit' || interactive.closest('.assistantInput')) {
        play('confirm')
        return
      }

      play('tap')
    }

    document.addEventListener('pointerover', onPointerOver, true)
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('pointerover', onPointerOver, true)
      document.removeEventListener('click', onClick, true)
    }
  }, [enabled, play])

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return undefined

    const sections = [...document.querySelectorAll('main section, main .referenceDeck')]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.38)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return

      const key = visible.target.id || visible.target.className || 'section'
      const state = sectionRef.current
      const now = performance.now()
      if (state.seen.has(key) || now - state.last < 900) return
      state.seen.add(key)
      state.last = now
      play('section')
    }, { threshold: [0.38, 0.55, 0.72] })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [enabled, play])

  useEffect(() => () => {
    stopSoundtrack(false)
    try { ctxRef.current?.close?.() } catch {}
  }, [stopSoundtrack])

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSiteSound() {
  const value = useContext(SoundContext)
  if (!value) return { enabled: false, toggle: () => {}, play: () => {} }
  return value
}
