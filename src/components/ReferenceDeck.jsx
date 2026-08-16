import { ArrowUpRight, Boxes, Braces, Code2, Database, GitBranch, Layers3, Orbit, Sparkles, Workflow } from 'lucide-react'
import { useMemo, useState } from 'react'

const copy = {
  en: {
    kicker: '01 / PROOF OF WORK',
    titleA: 'Real workflows.',
    titleB: 'Engineering decisions.',
    titleC: 'Software delivery.',
    intro: 'Across these projects I use the same pattern: understand the workflow, reduce ambiguity, encode useful parts in software, verify the output, and keep the delivery reviewable.',
    chapters: 'SELECTED EVIDENCE', selected: 'SELECTED SYSTEM', input: 'INPUT', transform: 'ENGINEER', output: 'DELIVER',
    stack: 'BUILD & DELIVERY SURFACE',
    stackIntro: 'The implementation surface behind the portfolio: code, APIs, version control, CI and AI-assisted engineering. The emphasis is on how the pieces connect, not on collecting tool logos.',
    principles: ['real constraints', 'smallest useful implementation', 'reviewable output'],
  },
  fi: {
    kicker: '01 / NÄYTTÖ TYÖSTÄ',
    titleA: 'Todelliset työnkulut.',
    titleB: 'Engineering-päätökset.',
    titleC: 'Software delivery.',
    intro: 'Näissä projekteissa käytän samaa mallia: ymmärrä työnkulku, vähennä epäselvyyttä, toteuta hyödylliset osat ohjelmistona, varmista tulos ja pidä toimitus tarkistettavana.',
    chapters: 'VALITTU NÄYTTÖ', selected: 'VALITTU JÄRJESTELMÄ', input: 'INPUT', transform: 'ENGINEER', output: 'DELIVER',
    stack: 'BUILD & DELIVERY SURFACE',
    stackIntro: 'Portfolion toteutuspinta: koodi, API:t, versionhallinta, CI ja AI-avusteinen engineering. Painotus on yhteydessä työkalujen välillä, ei logojen keräämisessä.',
    principles: ['todelliset rajat', 'pienin hyödyllinen toteutus', 'tarkistettava lopputulos'],
  },
  ru: {
    kicker: '01 / ДОКАЗАТЕЛЬСТВА РАБОТЫ',
    titleA: 'Реальные workflows.',
    titleB: 'Engineering-решения.',
    titleC: 'Software delivery.',
    intro: 'Во всех этих проектах я использую один подход: понять workflow, убрать неопределённость, реализовать полезные части в software, проверить output и сделать delivery прозрачным для review.',
    chapters: 'SELECTED EVIDENCE', selected: 'SELECTED SYSTEM', input: 'INPUT', transform: 'ENGINEER', output: 'DELIVER',
    stack: 'BUILD & DELIVERY SURFACE',
    stackIntro: 'Рабочая поверхность портфолио: code, API, version control, CI и AI-assisted engineering. Важнее то, как части соединяются, а не количество логотипов.',
    principles: ['реальные ограничения', 'минимально полезная реализация', 'проверяемый output'],
  },
  uk: {
    kicker: '01 / ДОКАЗИ РОБОТИ',
    titleA: 'Реальні workflows.',
    titleB: 'Engineering-рішення.',
    titleC: 'Software delivery.',
    intro: 'У цих проєктах я використовую один підхід: зрозуміти workflow, прибрати невизначеність, реалізувати корисні частини в software, перевірити output і зробити delivery прозорим для review.',
    chapters: 'SELECTED EVIDENCE', selected: 'SELECTED SYSTEM', input: 'INPUT', transform: 'ENGINEER', output: 'DELIVER',
    stack: 'BUILD & DELIVERY SURFACE',
    stackIntro: 'Робоча поверхня портфоліо: code, API, version control, CI та AI-assisted engineering. Важливіше те, як частини поєднуються, а не кількість логотипів.',
    principles: ['реальні обмеження', 'мінімально корисна реалізація', 'перевірюваний output'],
  },
}

const icons = [Workflow, Sparkles, Boxes, Database]
const stack = [
  ['Python', 'automation / backend logic', Code2],
  ['REST APIs', 'service integration', Braces],
  ['React + Vite', 'interactive frontend', Layers3],
  ['Git', 'versioned changes', GitBranch],
  ['GitHub Actions / CI', 'build + deploy checks', Workflow],
  ['RAG', 'grounded context', Database],
  ['Coding agents', 'Codex / Claude Code', Sparkles],
  ['VS Code / Cursor', 'implementation surface', Orbit],
]

export default function ReferenceDeck({ t, lang = 'en' }) {
  const text = copy[lang] || copy.en
  const chapters = useMemo(() => (t.projects || []).slice(0, 4), [t.projects])
  const [active, setActive] = useState(0)
  const selected = chapters[active] || chapters[0]
  const ActiveIcon = icons[active] || Workflow

  return (
    <section className="referenceDeck sectionShell" aria-label="Interactive portfolio story">
      <div className="referenceIntro">
        <div className="referenceKicker"><span>{text.kicker}</span><i/><b>2026</b></div>
        <h2><span>{text.titleA}</span><span>{text.titleB}</span><span>{text.titleC}</span></h2>
        <p>{text.intro}</p>
      </div>

      <div className="referenceStoryGrid">
        <div className="referenceChapters">
          <div className="referenceChapterLabel"><span>{text.chapters}</span><b>04</b></div>
          {chapters.map(([title, description], index) => {
            const Icon = icons[index] || Workflow
            return (
              <button
                type="button"
                key={title}
                className={active === index ? 'active' : ''}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <span className="referenceChapterIndex">0{index + 1}</span>
                <span className="referenceChapterIcon"><Icon size={17}/></span>
                <span className="referenceChapterText"><strong>{title}</strong><small>{description}</small></span>
                <ArrowUpRight size={17}/>
              </button>
            )
          })}
        </div>

        <aside className="referenceSystemCard" aria-live="polite">
          <div className="referenceSystemTop"><span>{text.selected}</span><b>0{active + 1} / 04</b></div>
          <div className="referenceSystemVisual" aria-hidden="true">
            <div className="referenceSystemOrbit orbitA"><i/></div>
            <div className="referenceSystemOrbit orbitB"><i/></div>
            <div className="referenceSystemOrbit orbitC"><i/></div>
            <div className="referenceSystemCore"><ActiveIcon size={22}/><strong>SK</strong><span>SYSTEM</span></div>
            <span className="referenceNode nodeOne">INPUT</span>
            <span className="referenceNode nodeTwo">LOGIC</span>
            <span className="referenceNode nodeThree">REVIEW</span>
            <span className="referenceNode nodeFour">OUTPUT</span>
          </div>
          <div className="referenceSystemCopy">
            <span>0{active + 1}</span>
            <h3>{selected?.[0]}</h3>
            <p>{selected?.[1]}</p>
          </div>
          <div className="referenceSystemFlow">
            <div><span>{text.input}</span><strong>{text.principles[0]}</strong></div>
            <div><span>{text.transform}</span><strong>{text.principles[1]}</strong></div>
            <div><span>{text.output}</span><strong>{text.principles[2]}</strong></div>
          </div>
        </aside>
      </div>

      <div className="referenceStack">
        <div className="referenceStackHeading">
          <div><span>{text.stack}</span><h3>{text.stack}</h3></div>
          <p>{text.stackIntro}</p>
        </div>
        <div className="referenceStackRail">
          {stack.map(([name, detail, Icon], index) => (
            <article key={name} tabIndex="0">
              <div><span>0{index + 1}</span><Icon size={17}/></div>
              <strong>{name}</strong>
              <small>{detail}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
