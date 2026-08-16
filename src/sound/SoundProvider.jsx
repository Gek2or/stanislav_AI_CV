import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const SoundContext = createContext(null)

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

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(readPreference)
  const audioRef = useRef(null)
  const masterRef = useRef(null)
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
      master.gain.value = 0.9
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

  const synth = useCallback(async (kind = 'tap', force = false) => {
    if (!enabled && !force) return
    const ctx = await ensureAudio()
    if (!ctx || !masterRef.current) return

    const now = ctx.currentTime
    const master = masterRef.current

    const note = ({
      delay = 0,
      from = 520,
      to = from,
      duration = 0.07,
      volume = 0.012,
      type = 'sine',
      pan = 0,
    }) => {
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
      note({ from: 820, to: 910, duration: 0.032, volume: 0.0045, type: 'sine', pan: -0.08 })
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
      note({ from: 155, to: 205, duration: 0.16, volume: 0.0075, type: 'sine', pan: -0.12 })
      note({ delay: 0.045, from: 310, to: 390, duration: 0.14, volume: 0.0045, type: 'triangle', pan: 0.12 })
      return
    }

    if (kind === 'enable') {
      note({ from: 360, to: 440, duration: 0.07, volume: 0.010, type: 'triangle', pan: -0.18 })
      note({ delay: 0.055, from: 540, to: 660, duration: 0.08, volume: 0.009, pan: 0 })
      note({ delay: 0.11, from: 760, to: 920, duration: 0.09, volume: 0.008, pan: 0.18 })
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
      setEnabled(false)
      savePreference(false)
    }
  }, [enabled, synth])

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
