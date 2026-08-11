import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import AICore from './components/AICore'
import BitonetFit from './components/BitonetFit'
import Projects from './components/Projects'
import Assistant from './components/Assistant'
import Contact from './components/Contact'
import { content } from './data/content'

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('stanislav-cv-lang') || 'en')
  const t = useMemo(() => content[lang], [lang])

  useEffect(() => {
    localStorage.setItem('stanislav-cv-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="appFrame">
      <div className="gridBackground" aria-hidden="true" />
      <div className="orb orbOne" aria-hidden="true" />
      <div className="orb orbTwo" aria-hidden="true" />
      <Header lang={lang} setLang={setLang} nav={t.nav} />
      <main>
        <Hero t={t} />
        <AICore t={t} />
        <BitonetFit t={t} />
        <Projects t={t} />
        <Assistant t={t} lang={lang} />
        <Contact t={t} />
      </main>
      <footer className="footer sectionShell">
        <span>© 2026 Stanislav Kosytskyy</span>
        <span>React · Vite · Tailwind · AI-native portfolio</span>
      </footer>
    </div>
  )
}
