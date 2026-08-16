import { useEffect, useRef } from 'react'
import { useSiteSound } from './SoundProvider'

const LOOP_URL = `${import.meta.env.BASE_URL}audio/midnight-compile.mp3`
const DESKTOP_VOLUME = 0.28
const MOBILE_VOLUME = 0.22

function targetVolume() {
  if (typeof window === 'undefined') return DESKTOP_VOLUME
  return window.matchMedia?.('(max-width: 760px)').matches ? MOBILE_VOLUME : DESKTOP_VOLUME
}

export default function MidnightLoop() {
  const { enabled } = useSiteSound()
  const audioRef = useRef(null)
  const frameRef = useRef(0)
  const transitionRef = useRef(0)

  useEffect(() => {
    const audio = new Audio(LOOP_URL)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    audioRef.current = audio

    return () => {
      transitionRef.current += 1
      cancelAnimationFrame(frameRef.current)
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    transitionRef.current += 1
    const transition = transitionRef.current
    cancelAnimationFrame(frameRef.current)

    const fade = (to, duration, onDone) => {
      const from = audio.volume
      const started = performance.now()

      const tick = (now) => {
        if (transitionRef.current !== transition) return
        const progress = Math.min(1, (now - started) / duration)
        const eased = 1 - Math.pow(1 - progress, 3)
        audio.volume = Math.max(0, Math.min(1, from + (to - from) * eased))
        if (progress < 1) frameRef.current = requestAnimationFrame(tick)
        else onDone?.()
      }

      frameRef.current = requestAnimationFrame(tick)
    }

    const removeRetryListeners = () => {
      window.removeEventListener('pointerdown', retryStart, true)
      window.removeEventListener('keydown', retryStart, true)
    }

    const start = async () => {
      if (!enabled || transitionRef.current !== transition) return false
      try {
        await audio.play()
        removeRetryListeners()
        fade(targetVolume(), 1500)
        return true
      } catch {
        return false
      }
    }

    const retryStart = () => {
      start()
    }

    if (enabled) {
      start().then((started) => {
        if (started || transitionRef.current !== transition) return
        // Browsers can restore SOUND=ON while still requiring a fresh gesture.
        window.addEventListener('pointerdown', retryStart, { once: true, capture: true, passive: true })
        window.addEventListener('keydown', retryStart, { once: true, capture: true })
      })
    } else {
      fade(0, 420, () => {
        if (transitionRef.current === transition) audio.pause()
      })
    }

    return () => {
      removeRetryListeners()
      cancelAnimationFrame(frameRef.current)
    }
  }, [enabled])

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current
      if (!audio || !enabled) return
      if (document.hidden) {
        audio.volume = Math.min(audio.volume, targetVolume() * 0.45)
      } else {
        audio.play().catch(() => {})
        audio.volume = targetVolume()
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [enabled])

  return null
}
