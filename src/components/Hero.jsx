import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Code2, Languages, MapPin, Sparkles, Workflow } from 'lucide-react'
import AISystemApp from './AISystemApp'

const copy = {
  en: {
    iam: 'I am',
    kicker: 'AI SOFTWARE ENGINEER / FINLAND',
    application: 'Application focus · Bitonet Oy',
    statement: 'I connect real operations with software, automation and practical AI systems.',
    selectedWork: 'selected work areas',
    engineeringTracks: 'engineering tracks',
    modelRoutes: 'AI / model routes',
    languages: 'site languages',
    timeline: [
      ['2020', 'Taitotalo', 'Software-development studies'],
      ['2022', 'Development', 'Software + game-development practice'],
      ['NOW', 'Finland', 'Business operations + AI engineering'],
    ],
    console: 'INTERACTIVE ENGINEERING CONSOLE',
    consoleCopy: 'Inspect the way I structure a practical AI workflow: problem, context, routing, build, evaluation and human review.',
  },
  fi: {
    iam: 'Minä olen',
    kicker: 'AI SOFTWARE ENGINEER / FINLAND',
    application: 'Hakukohde · Bitonet Oy',
    statement: 'Yhdistän todellisen operatiivisen työn ohjelmistoihin, automaatioon ja käytännöllisiin AI-järjestelmiin.',
    selectedWork: 'valittua työaluetta',
    engineeringTracks: 'engineering-polkuja',
    modelRoutes: 'AI / model routes',
    languages: 'sivuston kieltä',
    timeline: [
      ['2020', 'Taitotalo', 'Ohjelmistokehityksen opinnot'],
      ['2022', 'Development', 'Software + game-development -harjoittelu'],
      ['NYT', 'Suomi', 'Liiketoiminta + AI engineering'],
    ],
    console: 'INTERAKTIIVINEN ENGINEERING CONSOLE',
    consoleCopy: 'Tutki, miten rakennan käytännöllisen AI-workflow’n: ongelma, konteksti, reititys, toteutus, arviointi ja ihmisen tarkistus.',
  },
  ru: {
    iam: 'Я —',
    kicker: 'AI SOFTWARE ENGINEER / FINLAND',
    application: 'Фокус заявки · Bitonet Oy',
    statement: 'Я соединяю реальную операционную работу с software, автоматизацией и практичными AI-системами.',
    selectedWork: 'рабочих направлений',
    engineeringTracks: 'engineering-направлений',
    modelRoutes: 'AI / model routes',
    languages: 'языка сайта',
    timeline: [
      ['2020', 'Taitotalo', 'Обучение software development'],
      ['2022', 'Development', 'Практика software + game development'],
      ['СЕЙЧАС', 'Finland', 'Бизнес-операции + AI engineering'],
    ],
    console: 'INTERACTIVE ENGINEERING CONSOLE',
    consoleCopy: 'Здесь можно посмотреть, как я строю практический AI-workflow: задача, контекст, routing, build, evaluation и human review.',
  },
  uk: {
    iam: 'Я —',
    kicker: 'AI SOFTWARE ENGINEER / FINLAND',
    application: 'Фокус заявки · Bitonet Oy',
    statement: 'Я поєдную реальну операційну роботу із software, автоматизацією та практичними AI-системами.',
    selectedWork: 'робочих напрямів',
    engineeringTracks: 'engineering-напрямів',
    modelRoutes: 'AI / model routes',
    languages: 'мови сайту',
    timeline: [
      ['2020', 'Taitotalo', 'Навчання software development'],
      ['2022', 'Development', 'Практика software + game development'],
      ['ЗАРАЗ', 'Finland', 'Бізнес-операції + AI engineering'],
    ],
    console: 'INTERACTIVE ENGINEERING CONSOLE',
    consoleCopy: 'Тут можна побачити, як я будую практичний AI-workflow: задача, контекст, routing, build, evaluation та human review.',
  },
}

export default function Hero({ t, lang = 'en' }) {
  const text = copy[lang] || copy.en
  const metrics = [
    [t.projects?.length || 0, text.selectedWork, BriefcaseBusiness],
    [t.engineering?.length || 0, text.engineeringTracks, Code2],
    [t.models?.length || 0, text.modelRoutes, Sparkles],
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
          <h2>{text.statement}</h2>
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
