import { ArrowUpRight, BarChart3, FileText, Truck, Users } from 'lucide-react'
import { useState } from 'react'

const ui = {
  en: {
    overline: 'SELECTED WORK',
    title: 'Real work first. Tools second.',
    intro: 'These projects come from problems I have actually had to understand: customer requests, pricing, logistics, documents, tracking and software behavior. The technology follows the problem — not the other way around.',
    case: 'CASE 01', live: 'LIVE BUSINESS', flowTitle: 'OPERATING FLOW', active: 'OTHER PRACTICAL CONTEXT',
    tags: ['customer requirements', 'pricing logic', 'logistics', 'documents'],
    facts: [
      ['Problem', 'Moving-service work depends on clear requests, realistic pricing, vehicle and team coordination, and customer communication.'],
      ['My role', 'I handle the operating workflow in Autochemix Oy and see where manual steps create friction or ambiguity.'],
      ['Software direction', 'Turn repeatable parts into tools for quotes, tracking, structured data and future API-based integrations.'],
    ],
    flow: [
      ['Request', 'Capture the customer need, timing, access details and constraints before proposing a solution.'],
      ['Offer', 'Turn the request into a clear Finnish commercial offer with scope, assumptions and next steps.'],
      ['Price', 'Calculate the work using time, team, vehicle and operational constraints rather than guesswork.'],
      ['Delivery', 'Coordinate people, vehicle, customer communication and execution so the promise matches reality.'],
    ],
    selectedLabels: ['BUSINESS AUTOMATION', 'SOFTWARE PROTOTYPE', 'WORKFLOW SYSTEM'],
  },
  fi: {
    overline: 'VALITUT TYÖT',
    title: 'Ensin todellinen työ. Sitten työkalut.',
    intro: 'Projektit lähtevät ongelmista, joita olen itse joutunut ymmärtämään: asiakaspyynnöistä, hinnoittelusta, logistiikasta, dokumenteista, seurannasta ja ohjelmiston toiminnasta. Teknologia valitaan ongelman mukaan — ei päinvastoin.',
    case: 'CASE 01', live: 'TOIMIVA LIIKETOIMINTA', flowTitle: 'OPERATIIVINEN TYÖNKULKU', active: 'MUU KÄYTÄNNÖN KOKEMUS',
    tags: ['asiakastarpeet', 'hinnoittelulogiikka', 'logistiikka', 'dokumentit'],
    facts: [
      ['Ongelma', 'Muuttopalvelu vaatii selkeät lähtötiedot, realistisen hinnoittelun, auton ja tiimin koordinoinnin sekä toimivan asiakasviestinnän.'],
      ['Oma roolini', 'Vastaan Autochemix Oy:n operatiivisesta työnkulusta ja näen suoraan, missä manuaaliset vaiheet aiheuttavat kitkaa tai epäselvyyttä.'],
      ['Ohjelmistosuunta', 'Muutan toistuvia vaiheita työkaluiksi tarjouksiin, seurantaan, rakenteiseen dataan ja tuleviin API-pohjaisiin integraatioihin.'],
    ],
    flow: [
      ['Pyyntö', 'Kerää asiakkaan tarve, ajankohta, pääsytiedot ja rajoitteet ennen ratkaisun ehdottamista.'],
      ['Tarjous', 'Muuta pyyntö selkeäksi suomenkieliseksi tarjoukseksi, jossa työn laajuus, oletukset ja seuraavat vaiheet ovat näkyvissä.'],
      ['Hinta', 'Laske työ ajan, tiimin, ajoneuvon ja operatiivisten rajoitteiden perusteella arvailun sijaan.'],
      ['Toteutus', 'Koordinoi ihmiset, ajoneuvo, asiakasviestintä ja toteutus niin, että lupaus vastaa käytäntöä.'],
    ],
    selectedLabels: ['LIIKETOIMINNAN AUTOMAATIO', 'OHJELMISTOPROTOTYYPPI', 'TYÖNKULKUJÄRJESTELMÄ'],
  },
  ru: {
    overline: 'ИЗБРАННЫЕ ПРОЕКТЫ',
    title: 'Сначала реальная задача. Потом инструменты.',
    intro: 'Эти проекты выросли из задач, которые мне самому приходилось разбирать: запросы клиентов, цены, логистика, документы, учёт и поведение программ. Технология выбирается под проблему, а не наоборот.',
    case: 'КЕЙС 01', live: 'ДЕЙСТВУЮЩИЙ БИЗНЕС', flowTitle: 'РАБОЧИЙ ПРОЦЕСС', active: 'ДРУГИЕ ПРАКТИЧЕСКИЕ ПРОЕКТЫ',
    tags: ['требования клиентов', 'логика цены', 'логистика', 'документы'],
    facts: [
      ['Проблема', 'Услуги переезда зависят от понятных исходных данных, реалистичной цены, координации машины и команды и нормальной коммуникации с клиентом.'],
      ['Моя роль', 'Я веду операционный процесс Autochemix Oy и напрямую вижу, где ручные этапы создают лишнюю работу или неопределённость.'],
      ['Направление разработки', 'Превращать повторяющиеся этапы в инструменты для предложений, учёта, структурированных данных и будущих API-интеграций.'],
    ],
    flow: [
      ['Запрос', 'Собрать потребность клиента, сроки, доступ и ограничения до того, как предлагать решение.'],
      ['Предложение', 'Превратить запрос в ясное коммерческое предложение на финском с объёмом работ, допущениями и следующими шагами.'],
      ['Цена', 'Рассчитать работу через время, команду, автомобиль и реальные ограничения вместо приблизительной оценки.'],
      ['Выполнение', 'Скоординировать людей, автомобиль, коммуникацию и выполнение так, чтобы обещание совпадало с реальностью.'],
    ],
    selectedLabels: ['АВТОМАТИЗАЦИЯ БИЗНЕСА', 'ПРОТОТИП ПРОГРАММЫ', 'СИСТЕМА РАБОЧИХ ПРОЦЕССОВ'],
  },
  uk: {
    overline: 'ВИБРАНІ ПРОЄКТИ',
    title: 'Спочатку реальна задача. Потім інструменти.',
    intro: 'Ці проєкти виросли із задач, які мені самому доводилося розбирати: запити клієнтів, ціни, логістика, документи, облік і поведінка програм. Технологія обирається під проблему, а не навпаки.',
    case: 'КЕЙС 01', live: 'ДІЮЧИЙ БІЗНЕС', flowTitle: 'РОБОЧИЙ ПРОЦЕС', active: 'ІНШІ ПРАКТИЧНІ ПРОЄКТИ',
    tags: ['вимоги клієнтів', 'логіка ціни', 'логістика', 'документи'],
    facts: [
      ['Проблема', 'Послуги переїзду залежать від чітких вихідних даних, реалістичної ціни, координації автомобіля й команди та нормальної комунікації з клієнтом.'],
      ['Моя роль', 'Я веду операційний процес Autochemix Oy і напряму бачу, де ручні етапи створюють зайву роботу або невизначеність.'],
      ['Напрям розробки', 'Перетворювати повторювані етапи на інструменти для пропозицій, обліку, структурованих даних і майбутніх API-інтеграцій.'],
    ],
    flow: [
      ['Запит', 'Зібрати потребу клієнта, строки, доступ і обмеження до того, як пропонувати рішення.'],
      ['Пропозиція', 'Перетворити запит на чітку комерційну пропозицію фінською з обсягом робіт, припущеннями й наступними кроками.'],
      ['Ціна', 'Розрахувати роботу через час, команду, автомобіль і реальні обмеження замість приблизної оцінки.'],
      ['Виконання', 'Скоординувати людей, автомобіль, комунікацію й виконання так, щоб обіцянка відповідала реальності.'],
    ],
    selectedLabels: ['АВТОМАТИЗАЦІЯ БІЗНЕСУ', 'ПРОТОТИП ПРОГРАМИ', 'СИСТЕМА РОБОЧИХ ПРОЦЕСІВ'],
  },
}

const flowIcons = [Users, FileText, BarChart3, Truck]

export default function Projects({ t, lang = 'fi' }) {
  const copy = ui[lang] || ui.fi
  const selected = [t.projects[0], t.projects[4], t.projects[5], t.projects[1]].filter(Boolean)
  const supporting = [t.projects[2], t.projects[3], t.projects[6]].filter(Boolean)
  const [activeFlow, setActiveFlow] = useState(0)
  const activeFlowItem = copy.flow[activeFlow] || copy.flow[0]

  return (
    <section className="contentSection sectionShell convictionWork" id="work">
      <div className="sectionIntroGrid">
        <div>
          <p className="sectionNumber">01</p>
          <p className="overline">{copy.overline}</p>
          <h2>{copy.title}</h2>
        </div>
        <p className="sectionLead">{copy.intro}</p>
      </div>

      <article className="featuredCase evidenceCase">
        <div className="featuredCaseCopy">
          <div className="caseLabel"><span>{copy.case}</span><i/>{copy.live}</div>
          <h3>{selected[0]?.[0]}</h3>
          <p>{selected[0]?.[1]}</p>
          <div className="caseTags">
            {copy.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="caseFacts">
            {copy.facts.map(([label, detail]) => (
              <div key={label}><span>{label}</span><p>{detail}</p></div>
            ))}
          </div>
        </div>

        <div className="caseVisual" aria-label={copy.flowTitle}>
          <div className="caseVisualTop"><span>{copy.flowTitle}</span><span>01 → 04</span></div>
          <div className="flowTrack">
            {copy.flow.map(([label], index) => {
              const Icon = flowIcons[index]
              return (
                <button
                  type="button"
                  className={`flowStage ${activeFlow === index ? 'active' : ''}`}
                  key={label}
                  onMouseEnter={() => setActiveFlow(index)}
                  onFocus={() => setActiveFlow(index)}
                  onClick={() => setActiveFlow(index)}
                  aria-pressed={activeFlow === index}
                >
                  <div className="flowIcon"><Icon size={19}/></div>
                  <span>0{index + 1}</span>
                  <strong>{label}</strong>
                </button>
              )
            })}
          </div>
          <div className="caseSignal" aria-live="polite">
            <div>
              <span>{activeFlowItem[0]}</span>
              <strong>{activeFlowItem[1]}</strong>
            </div>
            <div className="signalBar" aria-hidden="true">
              {[0, 1, 2, 3].map((item) => <i key={item} className={item <= activeFlow ? 'active' : ''}/>) }
            </div>
          </div>
        </div>
      </article>

      <div className="experienceList compactExperienceList selectedProjectRows">
        {selected.slice(1).map(([title, text], index) => (
          <article className="experienceRow" key={title}>
            <div className="experienceIndex">0{index + 2}</div>
            <div className="experienceTitle">
              <span className="projectType">{copy.selectedLabels[index]}</span>
              <h3>{title}</h3>
            </div>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="buildsHeader">
        <p className="overline">{copy.active}</p>
        <span>{supporting.length.toString().padStart(2, '0')}</span>
      </div>
      <div className="buildGrid supportingContextGrid">
        {supporting.map(([title, text], index) => (
          <article className="buildCard" key={title} tabIndex="0">
            <div className="buildTopLine"><span className="buildNumber">0{index + 1}</span><span className="buildPulse"/></div>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="buildArrow"><ArrowUpRight size={17}/></div>
          </article>
        ))}
      </div>
    </section>
  )
}
