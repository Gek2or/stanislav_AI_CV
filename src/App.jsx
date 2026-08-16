import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SignatureSection from './components/SignatureSection'
import Projects from './components/Projects'
import AICore from './components/AICore'
import BitonetFit from './components/BitonetFit'
import Assistant from './components/Assistant'
import Contact from './components/Contact'
import TechBackdrop3D from './components/TechBackdrop3D'
import { content } from './data/content'

function readStoredLanguage() {
  try {
    return localStorage.getItem('stanislav-cv-lang') || 'en'
  } catch {
    return 'en'
  }
}

export default function App() {
  const [lang, setLang] = useState(readStoredLanguage)
  const safeLang = content[lang] ? lang : 'en'
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
    <div className="appFrame">
      <TechBackdrop3D />
      <div className="ambientGlow" aria-hidden="true" />
      <Header lang={safeLang} setLang={setLang} nav={t.nav} />
      <main>
        <Hero t={t} lang={safeLang} />
        <SignatureSection t={t} lang={safeLang} />
        <Projects t={t} lang={safeLang} />
        <AICore t={t} lang={safeLang} />
        <BitonetFit t={t} />
        <Assistant t={t} lang={safeLang} />
        <Contact t={t} />
      </main>
      <footer className="footer sectionShell">
        <span>© 2026 Stanislav Kosytskyy</span>
        <span>React · Vite · AI Software Engineer portfolio</span>
      </footer>
    </div>
  )
}
