import { languages } from '../data/editorial'

export default function Header({ lang, setLang, copy }) {
  return (
    <header className="siteHeader">
      <div className="shell headerInner">
        <a className="wordmark" href="#top" aria-label="Stanislav Kosytskyy — home">
          <strong>Stanislav Kosytskyy</strong>
          <span>Software · AI automation</span>
        </a>

        <nav className="mainNav" aria-label="Main navigation">
          <a href="#work">{copy.nav.work}</a>
          <a href="#operations">{copy.nav.operations}</a>
          <a href="#engineering">{copy.nav.capabilities}</a>
          <a href="#about">{copy.nav.about}</a>
          <a href="#contact">{copy.nav.contact}</a>
        </nav>

        <div className="languageSwitch" aria-label="Language selector">
          {languages.map((item) => (
            <button
              key={item.id}
              type="button"
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
