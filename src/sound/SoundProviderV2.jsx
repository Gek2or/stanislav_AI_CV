import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const SoundContext = createContext(null)

const STORAGE_KEY = 'stanislav-site-sound'
const TRACK_URL = 'https://cdn1.suno.ai/d470d084-a7d9-418b-a2b7-fbfa1779ae5e.mp3'

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

function musicVolume() {
  if (typeof window === 'undefined') return 0.44
  return window.matchMedia?.('(max-width: 760px)').matches ? 0.36 : 0.44
}

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(readPreference)
  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const sfxRef = useRef(null)
  const compressorRef = useRef(null)
  const soundtrackRef = useRef(null)
  const fadeTimerRef = useRef(null)
  const hoverRef = useRef({ element: null, time: 0 })
  const sectionRef = useRef({ last: 0, seen: new Set() })

  const ensureGraph = useCallback(async () => {
    if (typeof window === 'undefined') return null
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null

    if (!ctxRef.current) {
      const ctx = new AudioCtx()
      const master = ctx.createGain()
      const sfx = ctx.createGain()
      const compressor = ctx.createDynamicsCompressor()

      // Keep the stronger SFX mix that was approved in the previous pass.
      master.gain.value = 0.92
      sfx.gain.value = 1.0

      compressor.threshold.value = -14
      compressor.knee.value = 12
      compressor.ratio.value = 5
      compressor.attack.value = 0.003
      compressor.release.value = 0.18

      sfx.connect(master)
      master.connect(compressor)
      compressor.connect(ctx.destination)

      ctxRef.current = ctx
      masterRef.current = master
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

  const stopSoundtrack = useCallback((fade = true) => {
    const audio = soundtrackRef.current
    if (!audio) return

    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current)
      fadeTimerRef.current = null
    }

    if (!fade || audio.paused) {
      audio.pause()
      try { audio.currentTime = 0 } catch {}
      audio.volume = musicVolume()
      return
    }

    const startVolume = audio.volume
    const steps = 9
    let step = 0
    fadeTimerRef.current = window.setInterval(() => {
      step += 1
      audio.volume = Math.max(0, startVolume * (1 - step / steps))
      if (step >= steps) {
        window.clearInterval(fadeTimerRef.current)
        fadeTimerRef.current = null
        audio.pause()
        try { audio.currentTime = 0 } catch {}
        audio.volume = musicVolume()
      }
    }, 40)
  }, [])

  const startSoundtrack = useCallback(async () => {
    if (typeof window === 'undefined') return false

    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current)
      fadeTimerRef.current = null
    }

    let audio = soundtrackRef.current
    if (!audio) {
      audio = new Audio(TRACK_URL)
      audio.loop = true
      audio.preload = 'auto'
      audio.volume = musicVolume()
      audio.setAttribute('playsinline', '')
      soundtrackRef.current = audio
    }

    audio.volume = musicVolume()
    if (!audio.paused) return true

    try {
      await audio.play()
      return true
    } catch {
      return false
    }
  }, [])

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

  useEffect(() => {
    const onResize = () => {
      if (soundtrackRef.current) soundtrackRef.current.volume = musicVolume()
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => () => {
    if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current)
    const audio = soundtrackRef.current
    if (audio) {
      audio.pause()
      audio.src = ''
      soundtrackRef.current = null
    }
    try { ctxRef.current?.close?.() } catch {}
  }, [])

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSiteSound() {
  const value = useContext(SoundContext)
  if (!value) return { enabled: false, toggle: () => {}, play: () => {} }
  return value
}
