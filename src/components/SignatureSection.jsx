import { Activity, Braces, Code2, Languages, Layers3, Sparkles, Workflow } from 'lucide-react'
import { useMemo, useState } from 'react'

const copy = {
  en: {
    eyebrow: 'ENGINEERING PROFILE / 2026',
    titleA: 'Business reality,',
    titleB: 'translated into software.',
    intro: 'The strongest part of my profile is the connection between operational responsibility and software thinking. I use AI as an engineering multiplier — not as a substitute for understanding the problem.',
    areas: 'selected work areas',
    languages: 'site languages',
    engineering: 'engineering tracks',
    tools: 'AI / model routes',
    matrix: 'CAPABILITY MATRIX',
    matrixIntro: 'Hover or select a row. No fake percentages — only current working status and the direction I am building toward.',
    system: 'SYSTEM VIEW',
    live: 'interactive',
  },
  fi: {
    eyebrow: 'ENGINEERING PROFILE / 2026',
    titleA: 'Liiketoiminnan todellisuus,',
    titleB: 'muutettuna ohjelmistoksi.',
    intro: 'Profiilini vahvin osa on operatiivisen vastuun ja ohjelmistoajattelun yhteys. Käytän AI:ta engineering-multiplikattorina — en ongelman ymmärtämisen korvikkeena.',
    areas: 'valittua työaluetta',
    languages: 'sivuston kieltä',
    engineering: 'engineering-polkuja',
    tools: 'AI / model routes',
    matrix: 'CAPABILITY MATRIX',
    matrixIntro: 'Vie osoitin riville tai valitse se. Ei keksittyjä prosentteja — vain nykyinen työstatus ja suunta, jota rakennan.',
    system: 'SYSTEM VIEW',
    live: 'interaktiivinen',
  },
  ru: {
    eyebrow: 'ENGINEERING PROFILE / 2026',
    titleA: 'Реальный бизнес,',
    titleB: 'переведённый в software.',
    intro: 'Сильная сторона моего профиля — связь между операционной ответственностью и инженерным мышлением. AI для меня — усилитель разработки, а не замена пониманию задачи.',
    areas: 'рабочих направлений',
    languages: 'языка сайта',
    engineering: 'engineering-направлений',
    tools: 'AI / model routes',
    matrix: 'CAPABILITY MATRIX',
    matrixIntro: 'Наведи курсор или выбери строку. Без выдуманных процентов — только текущий рабочий статус и направление развития.',
    system: 'SYSTEM VIEW',
    live: 'interactive',
  },
  uk: {
    eyebrow: 'ENGINEERING PROFILE / 2026',
    titleA: 'Реальний бізнес,',
    titleB: 'перекладений у software.',
    intro: 'Сильна сторона мого профілю — зв’язок між операційною відповідальністю та інженерним мисленням. AI для мене — підсилювач розробки, а не заміна розумінню задачі.',
    areas: 'робочих напрямів',
    languages: 'мови сайту',
    engineering: 'engineering-напрямів',
    tools: 'AI / model routes',
    matrix: 'CAPABILITY MATRIX',
    matrixIntro: 'Наведи курсор або вибери рядок. Без вигаданих відсотків — лише поточний робочий статус і напрям розвитку.',
    system: 'SYSTEM VIEW',
    live: 'interactive',
  },
}

const icons = [Code2, Workflow, Layers3, Braces, Activity, Sparkles]

export default function SignatureSection({ t, lang = 'en' }) {
  const text = copy[lang] || copy.en
  const items = useMemo(() => t.engineering || [], [t.engineering])
  const [active, setActive] = useState(0)
  const selected = items[active] || items[0]

  const metrics = [
    [t.projects?.length || 0, text.areas, Workflow],
    [4, text.languages, Languages],
    [t.engineering?.length || 0, text.engineering, Code2],
    [t.models?.length || 0, text.tools, Sparkles],
  ]

  return (
    <section className="signatureSection sectionShell" aria-label="Engineering profile overview">
      <div className="signatureIntro">
        <div className="signatureKicker"><span>{text.eyebrow}</span><i/><b>{text.live}</b></div>
        <h2><span>{text.titleA}</span><span>{text.titleB}</span></h2>
        <p>{text.intro}</p>
      </div>

      <div className="signatureMetrics" aria-label="Portfolio metrics">
        {metrics.map(([value, label, Icon], index) => (
          <article key={label} className="signatureMetric">
            <div className="signatureMetricTop"><span>0{index + 1}</span><Icon size={17}/></div>
            <strong>{String(value).padStart(2, '0')}</strong>
            <p>{label}</p>
          </article>
        ))}
      </div>

      <div className="capabilityStage">
        <div className="capabilityMatrix">
          <div className="capabilityHeader">
            <span>{text.matrix}</span>
            <p>{text.matrixIntro}</p>
          </div>

          <div className="capabilityRows">
            {items.map(([name, status, description], index) => {
              const Icon = icons[index % icons.length]
              return (
                <button
                  type="button"
                  key={name}
                  className={index === active ? 'active' : ''}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={index === active}
                >
                  <span className="capabilityIndex">0{index + 1}</span>
                  <span className="capabilityIcon"><Icon size={16}/></span>
                  <strong>{name}</strong>
                  <span className="capabilityStatus"><i/>{status}</span>
                  <span className="capabilityLine"><i/></span>
                  <small>{description}</small>
                </button>
              )
            })}
          </div>
        </div>

        <aside className="capabilityVisual" aria-live="polite">
          <div className="capabilityVisualTop"><span>{text.system}</span><b>{selected?.[1]}</b></div>
          <div className="capabilityOrbital" aria-hidden="true">
            <div className="orbit orbitOne"><i/></div>
            <div className="orbit orbitTwo"><i/></div>
            <div className="orbit orbitThree"><i/></div>
            <div className="capabilityCore"><Sparkles size={20}/><strong>SK</strong><span>ENGINEERING</span></div>
            <span className="orbitalTag tagA">API</span>
            <span className="orbitalTag tagB">PY</span>
            <span className="orbitalTag tagC">LLM</span>
            <span className="orbitalTag tagD">GIT</span>
          </div>
          <div className="capabilitySelected">
            <span>{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            <h3>{selected?.[0]}</h3>
            <p>{selected?.[2]}</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
