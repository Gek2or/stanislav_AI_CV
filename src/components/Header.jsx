import { MapPin } from 'lucide-react'
import { languages } from '../data/content'

export default function Header({ lang, setLang, nav }) {
  const links = [
    ['#work', nav[2] || 'Work'],
    ['#engineering', nav[0] || 'How I work'],
    ['#contact', nav[4] || 'Contact'],
  ]

  return (
    <header className="humanHeader">
      <a href="#top" className="humanBrand" aria-label="Stanislav Kosytskyy home">
        <span className="humanMark">SK</span>
        <span className="humanBrandText">
          <strong>Stanislav Kosytskyy</strong>
          <small>Product-minded developer</small>
        </span>
      </a>

      <nav className="humanNav" aria-label="Main navigation">
        {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>

      <div className="humanHeaderTools">
        <span className="humanLocation"><MapPin size={14} /> Finland</span>
        <div className="humanLanguages" role="group" aria-label="Language selector">
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
