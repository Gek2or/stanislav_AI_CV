import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import AICore from './components/AICore'
import Contact from './components/Contact'
import { content } from './data/content'

function readStoredLanguage() {
  try {
    return localStorage.getItem('stanislav-cv-lang') || 'fi'
  } catch {
    return 'fi'
  }
}

export default function App() {
  const [lang, setLang] = useState(readStoredLanguage)
  const safeLang = content[lang] ? lang : 'fi'
  const t = useMemo(() => content[safeLang], [safeLang])

  useEffect(() => {
    try {
      localStorage.setItem('stanislav-cv-lang', safeLang)
    } catch {
      // Some in-app browsers can block storage. The site should still work.
    }
    document.documentElement.lang = safeLang
  }, [safeLang])

  return (
    <div className="appFrame humanPortfolio">
      <Header lang={safeLang} setLang={setLang} nav={t.nav} />
      <main>
        <Hero t={t} lang={safeLang} />
        <Projects t={t} lang={safeLang} />
        <AICore t={t} lang={safeLang} />
        <Contact t={t} />
      </main>
      <footer className="humanFooter sectionShell">
        <span>© 2026 Stanislav Kosytskyy</span>
        <span>{t.footer}</span>
      </footer>
    </div>
  )
}
