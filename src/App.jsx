import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ReferenceDeck from './components/ReferenceDeck'
import Projects from './components/Projects'
import AICore from './components/AICore'
import BitonetFit from './components/BitonetFit'
import Assistant from './components/Assistant'
import Contact from './components/Contact'
import TechBackdrop3D from './components/TechBackdrop3D'
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
    <div className="appFrame">
      <TechBackdrop3D />
      <div className="ambientGlow" aria-hidden="true" />
      <Header lang={safeLang} setLang={setLang} nav={t.nav} />
      <main>
        <Hero t={t} lang={safeLang} />
        <Projects t={t} lang={safeLang} />
        <ReferenceDeck t={t} lang={safeLang} />
        <AICore t={t} lang={safeLang} />
        <BitonetFit t={t} />
        <Assistant t={t} lang={safeLang} />
        <Contact t={t} />
      </main>
      <footer className="footer sectionShell">
        <span>© 2026 Stanislav Kosytskyy</span>
        <span>AI Software Engineer · Python · APIs · Git/CI · Applied AI</span>
      </footer>
    </div>
  )
}
