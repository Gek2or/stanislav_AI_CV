import { Code2, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { languages } from '../data/content'
import { useSiteSound } from '../sound/SoundProviderV2'

const soundLabels = {
  en: ['Sound on · soundtrack + interface SFX', 'Sound off'],
  fi: ['Ääni päällä · soundtrack + interface SFX', 'Ääni pois'],
  ru: ['Звук включён · soundtrack + interface SFX', 'Звук выключен'],
  uk: ['Звук увімкнено · soundtrack + interface SFX', 'Звук вимкнено'],
}

export default function Header({ lang, setLang, nav }) {
  const [progress, setProgress] = useState(0)
  const { enabled: soundEnabled, toggle: toggleSound } = useSiteSound()
  const labels = soundLabels[lang] || soundLabels.en
  const links = [
    ['#work', nav[2]],
    ['#engineering', nav[0]],
    ['#assistant', nav[3]],
    ['#contact', nav[4]],
  ]

  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <header className="topbar">
      <span className="scrollProgress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <a href="#top" className="brand" aria-label="Stanislav Kosytskyy home">
        <span className="brandIcon"><Code2 size={17} /></span>
        <span className="brandText">
          <strong>Stanislav Kosytskyy</strong>
          <small>AI Software Engineer</small>
        </span>
      </a>

      <nav className="desktopNav" aria-label="Main navigation">
        {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>

      <div className="headerControls">
        <button
          type="button"
          className={`siteSoundToggle ${soundEnabled ? 'active' : ''}`}
          onClick={toggleSound}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? labels[0] : labels[1]}
          title={soundEnabled ? labels[0] : labels[1]}
          data-sound-toggle="true"
        >
          <span className="soundWave" aria-hidden="true"><i/><i/><i/></span>
          {soundEnabled ? <Volume2 size={15}/> : <VolumeX size={15}/>} 
          <span>SOUND</span>
        </button>

        <div className="languageSwitch" aria-label="Language selector">
          {languages.map((item) => (
            <button
              key={item.id}
              className={lang === item.id ? 'active' : ''}
              onClick={() => setLang(item.id)}
              aria-pressed={lang === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
