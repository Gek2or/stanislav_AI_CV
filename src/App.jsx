import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import { About, Capabilities, Contact, Operations } from './components/EditorialSections'
import { editorialCopy } from './data/editorial'

function readStoredLanguage() {
  try {
    return localStorage.getItem('stanislav-cv-lang') || 'fi'
  } catch {
    return 'fi'
  }
}

export default function App() {
  const [lang, setLang] = useState(readStoredLanguage)
  const safeLang = editorialCopy[lang] ? lang : 'fi'
  const copy = useMemo(() => editorialCopy[safeLang], [safeLang])

  useEffect(() => {
    try { localStorage.setItem('stanislav-cv-lang', safeLang) } catch {}
    document.documentElement.lang = safeLang
  }, [safeLang])

  return (
    <div className="appFrame">
      <Header lang={safeLang} setLang={setLang} copy={copy} />
      <main>
        <Hero copy={copy} />
        <Projects copy={copy} />
        <Operations copy={copy} />
        <Capabilities copy={copy} />
        <About copy={copy} />
        <Contact copy={copy} />
      </main>
      <footer className="siteFooter shell">
        <span>© 2026 Stanislav Kosytskyy</span>
        <span>React · Vite · Finland</span>
      </footer>
    </div>
  )
}
