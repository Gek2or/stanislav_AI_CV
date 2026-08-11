import { Cpu } from 'lucide-react'
import { languages } from '../data/content'

export default function Header({ lang, setLang, nav }) {
  const links = [
    ['#ai-core', nav[0]],
    ['#bitonet', nav[1]],
    ['#projects', nav[2]],
    ['#assistant', nav[3]],
    ['#contact', nav[4]],
  ]

  return (
    <header className="topbar">
      <a href="#top" className="brand" aria-label="Stanislav AI home">
        <span className="brandIcon"><Cpu size={18} /></span>
        <span>STANISLAV<span className="accent">.AI</span></span>
      </a>

      <nav className="desktopNav" aria-label="Main navigation">
        {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>

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
    </header>
  )
}
