import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Code2, Languages, MapPin, Workflow } from 'lucide-react'
import AISystemApp from './AISystemApp'

const copy = {
  en: {
    iam: 'I am',
    kicker: 'AI SOFTWARE ENGINEER / APPLIED AI / FINLAND',
    application: 'Target role · AI Software Engineer · Bitonet Oy',
    selectedWork: 'selected work areas',
    liveContext: 'live operating business',
    engineeringTracks: 'engineering tracks',
    languages: 'site languages',
    timeline: [
      ['2020', 'Taitotalo', 'Software-development studies'],
      ['2022', 'Building', 'Software + game-development projects'],
      ['NOW', 'Finland', 'Operations → Python / APIs / AI systems'],
    ],
    console: 'INTERACTIVE ENGINEERING CONSOLE',
    consoleCopy: 'A compact view of how I approach applied AI work: define the outcome, structure context, choose the route, build, verify, and keep human review where it matters.',
  },
  fi: {
    iam: 'Minä olen',
    kicker: 'AI SOFTWARE ENGINEER / APPLIED AI / FINLAND',
    application: 'Tavoiterooli · AI Software Engineer · Bitonet Oy',
    selectedWork: 'valittua työaluetta',
    liveContext: 'toimiva liiketoimintaympäristö',
    engineeringTracks: 'engineering-polkuja',
    languages: 'sivuston kieltä',
    timeline: [
      ['2020', 'Taitotalo', 'Ohjelmistokehityksen opinnot'],
      ['2022', 'Rakentaminen', 'Software + game-development -projektit'],
      ['NYT', 'Suomi', 'Operatiivinen työ → Python / API:t / AI-järjestelmät'],
    ],
    console: 'INTERAKTIIVINEN ENGINEERING CONSOLE',
    consoleCopy: 'Tiivis näkymä applied AI -työtapaani: määritä tavoite, jäsennä konteksti, valitse toteutusreitti, rakenna, varmista ja pidä ihmisen tarkistus mukana siellä missä sillä on merkitystä.',
  },
  ru: {
    iam: 'Я —',
    kicker: 'AI SOFTWARE ENGINEER / APPLIED AI / FINLAND',
    application: 'Целевая роль · AI Software Engineer · Bitonet Oy',
    selectedWork: 'рабочих направлений',
    liveContext: 'реальный действующий бизнес',
    engineeringTracks: 'engineering-направлений',
    languages: 'языка сайта',
    timeline: [
      ['2020', 'Taitotalo', 'Обучение software development'],
      ['2022', 'Разработка', 'Software + game-development проекты'],
      ['СЕЙЧАС', 'Finland', 'Операционка → Python / API / AI-системы'],
    ],
    console: 'INTERACTIVE ENGINEERING CONSOLE',
    consoleCopy: 'Кратко о моём подходе к applied AI: определить результат, собрать контекст, выбрать маршрут, реализовать, проверить и оставить human review там, где он важен.',
  },
  uk: {
    iam: 'Я —',
    kicker: 'AI SOFTWARE ENGINEER / APPLIED AI / FINLAND',
    application: 'Цільова роль · AI Software Engineer · Bitonet Oy',
    selectedWork: 'робочих напрямів',
    liveContext: 'реальний діючий бізнес',
    engineeringTracks: 'engineering-напрямів',
    languages: 'мови сайту',
    timeline: [
      ['2020', 'Taitotalo', 'Навчання software development'],
      ['2022', 'Розробка', 'Software + game-development проєкти'],
      ['ЗАРАЗ', 'Finland', 'Операційна робота → Python / API / AI-системи'],
    ],
    console: 'INTERACTIVE ENGINEERING CONSOLE',
    consoleCopy: 'Коротко про мій підхід до applied AI: визначити результат, зібрати контекст, обрати маршрут, реалізувати, перевірити та залишити human review там, де він важливий.',
  },
}

export default function Hero({ t, lang = 'en' }) {
  const text = copy[lang] || copy.en
  const metrics = [
    [t.projects?.length || 0, text.selectedWork, BriefcaseBusiness],
    [1, text.liveContext, Workflow],
    [t.engineering?.length || 0, text.engineeringTracks, Code2],
    [4, text.languages, Languages],
  ]

  return (
    <section className="referenceHero sectionShell" id="top">
      <div className="referenceHeroTopline">
        <div><span className="availabilityDot"/><strong>{text.application}</strong></div>
        <div><MapPin size={13}/><span>Finland</span></div>
      </div>

      <div className="referenceHeroIdentity">
        <p>{text.iam}</p>
        <h1 aria-label="Stanislav Kosytskyy">
          <span>Stanislav</span>
          <span>Kosytskyy</span>
        </h1>
      </div>

      <div className="referenceHeroSplit">
        <div className="referenceHeroStatement">
          <span className="referenceHeroKicker">{text.kicker}</span>
          <h2>{t.hero}</h2>
          <p>{t.heroSecondary}</p>
          <div className="referenceHeroActions">
            <a href="#work" className="primaryButton">{t.ctaPrimary}<ArrowDownRight size={17}/></a>
            <a href="#contact" className="referenceTextLink">{t.ctaSecondary}<ArrowUpRight size={16}/></a>
          </div>
        </div>

        <div className="referenceHeroMetrics" aria-label="Portfolio overview">
          {metrics.map(([value, label, Icon], index) => (
            <article key={label}>
              <div><span>0{index + 1}</span><Icon size={17}/></div>
              <strong>{String(value).padStart(2, '0')}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="referenceHeroTimeline" aria-label="Professional direction timeline">
        {text.timeline.map(([year, title, detail], index) => (
          <article key={`${year}-${title}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{year}</strong>
            <div><b>{title}</b><small>{detail}</small></div>
          </article>
        ))}
        <div className="referenceTimelineRail" aria-hidden="true"><i/><i/><i/></div>
      </div>

      <div className="referenceConsoleIntro">
        <div><span>{text.console}</span><h3>{t.role}</h3></div>
        <p>{text.consoleCopy}</p>
      </div>

      <div className="referenceConsoleWrap">
        <AISystemApp t={t} lang={lang} />
      </div>
    </section>
  )
}
