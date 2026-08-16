import { ArrowUpRight, Boxes, Braces, Code2, Database, GitBranch, Layers3, Orbit, Sparkles, Workflow } from 'lucide-react'
import { useMemo, useState } from 'react'

const copy = {
  en: {
    kicker: 'PORTFOLIO SYSTEM / SELECTED STORY',
    titleA: 'Operations.',
    titleB: 'Software.',
    titleC: 'AI systems.',
    intro: 'My path is not a list of disconnected tools. It is a progression from owning real business processes to designing cleaner software and AI-assisted systems around them.',
    chapters: 'SELECTED CHAPTERS',
    selected: 'SELECTED SYSTEM',
    input: 'INPUT',
    transform: 'TRANSFORM',
    output: 'OUTPUT',
    stack: 'ENGINEERING SURFACE',
    stackIntro: 'The software and coding environments around the work — presented as a working surface, not as a claim of senior-level mastery.',
    principles: ['real workflow', 'smallest useful tool', 'human review', 'repeatable delivery'],
  },
  fi: {
    kicker: 'PORTFOLIO SYSTEM / VALITTU TARINA',
    titleA: 'Operatiivinen työ.',
    titleB: 'Ohjelmistot.',
    titleC: 'AI-järjestelmät.',
    intro: 'Polkuni ei ole irrallinen lista työkaluja. Se etenee todellisten liiketoimintaprosessien vastuusta kohti selkeämpiä ohjelmistoja ja AI-avusteisia järjestelmiä.',
    chapters: 'VALITUT LUVUT',
    selected: 'VALITTU JÄRJESTELMÄ',
    input: 'INPUT',
    transform: 'TRANSFORM',
    output: 'OUTPUT',
    stack: 'ENGINEERING SURFACE',
    stackIntro: 'Työn ympärillä oleva software- ja coding-ympäristö — työpintana, ei väitteenä senior-tason osaamisesta.',
    principles: ['todellinen workflow', 'pienin hyödyllinen työkalu', 'ihmisen tarkistus', 'toistettava toimitus'],
  },
  ru: {
    kicker: 'PORTFOLIO SYSTEM / SELECTED STORY',
    titleA: 'Операционка.',
    titleB: 'Software.',
    titleC: 'AI-системы.',
    intro: 'Мой путь — не набор несвязанных инструментов. Он идёт от ответственности за реальные бизнес-процессы к более чистым software-решениям и AI-assisted системам вокруг них.',
    chapters: 'SELECTED CHAPTERS',
    selected: 'SELECTED SYSTEM',
    input: 'INPUT',
    transform: 'TRANSFORM',
    output: 'OUTPUT',
    stack: 'ENGINEERING SURFACE',
    stackIntro: 'Software и coding-среда вокруг работы — как рабочая система, а не как попытка выдать себя за senior engineer.',
    principles: ['реальный workflow', 'минимальный полезный инструмент', 'human review', 'повторяемая доставка'],
  },
  uk: {
    kicker: 'PORTFOLIO SYSTEM / SELECTED STORY',
    titleA: 'Операційна робота.',
    titleB: 'Software.',
    titleC: 'AI-системи.',
    intro: 'Мій шлях — не набір непов’язаних інструментів. Він іде від відповідальності за реальні бізнес-процеси до чистіших software-рішень та AI-assisted систем навколо них.',
    chapters: 'SELECTED CHAPTERS',
    selected: 'SELECTED SYSTEM',
    input: 'INPUT',
    transform: 'TRANSFORM',
    output: 'OUTPUT',
    stack: 'ENGINEERING SURFACE',
    stackIntro: 'Software і coding-середовище навколо роботи — як робоча система, а не як спроба видати себе за senior engineer.',
    principles: ['реальний workflow', 'мінімальний корисний інструмент', 'human review', 'повторювана доставка'],
  },
}

const icons = [Workflow, Sparkles, Boxes, Database]
const stack = [
  ['Python', 'automation / backend logic', Code2],
  ['REST APIs', 'service integration', Braces],
  ['React + Vite', 'interactive frontend', Layers3],
  ['Git + GitHub', 'versioned delivery', GitBranch],
  ['RAG', 'grounded context', Database],
  ['Agents', 'tool-assisted workflows', Orbit],
  ['Codex / Claude Code', 'agentic coding', Sparkles],
  ['VS Code / Cursor', 'implementation surface', Code2],
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
