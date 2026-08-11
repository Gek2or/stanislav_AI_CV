import { Code2 } from 'lucide-react'
import { languages } from '../data/content'

export default function Header({ lang, setLang, nav }) {
  const links = [
    ['#work', nav[2]],
    ['#engineering', nav[0]],
    ['#bitonet', nav[1]],
    ['#contact', nav[4]],
  ]

  return (
    <header className="topbar">
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
