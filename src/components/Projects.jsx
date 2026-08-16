import { ArrowUpRight, BarChart3, FileText, Truck, Users } from 'lucide-react'
import { useState } from 'react'

const ui = {
  en: {
    case: 'CASE 01', live: 'LIVE BUSINESS', flowTitle: 'OPERATING FLOW', active: 'ACTIVE BUILDS',
    tags: ['requirements', 'pricing logic', 'logistics', 'AI-assisted documents'],
    flow: [
      ['Request', 'Capture the customer need, timing, access details and constraints before proposing a solution.'],
      ['Offer', 'Turn the request into a clear Finnish commercial offer with scope, assumptions and next steps.'],
      ['Price', 'Calculate the work using time, team, vehicle and operational constraints rather than guesswork.'],
      ['Delivery', 'Coordinate people, vehicle, customer communication and execution so the promise matches reality.'],
    ],
  },
  fi: {
    case: 'CASE 01', live: 'TOIMIVA LIIKETOIMINTA', flowTitle: 'OPERATIIVINEN FLOW', active: 'AKTIIVISET BUILDIT',
    tags: ['vaatimukset', 'hinnoittelulogiikka', 'logistiikka', 'AI-avusteiset dokumentit'],
    flow: [
      ['Pyyntö', 'Kerää asiakkaan tarve, ajankohta, pääsytiedot ja rajoitteet ennen ratkaisun ehdottamista.'],
      ['Tarjous', 'Muuta pyyntö selkeäksi suomalaiseksi tarjoukseksi, jossa scope, oletukset ja seuraavat askeleet ovat näkyvissä.'],
      ['Hinta', 'Laske työ ajan, tiimin, ajoneuvon ja operatiivisten rajoitteiden perusteella arvailun sijaan.'],
      ['Toimitus', 'Koordinoi ihmiset, ajoneuvo, asiakasviestintä ja toteutus niin, että lupaus vastaa käytäntöä.'],
    ],
  },
  ru: {
    case: 'CASE 01', live: 'РЕАЛЬНЫЙ БИЗНЕС', flowTitle: 'OPERATING FLOW', active: 'АКТИВНЫЕ BUILDS',
    tags: ['требования', 'логика цены', 'логистика', 'AI-assisted документы'],
    flow: [
      ['Запрос', 'Собрать потребность клиента, сроки, доступ и ограничения до того, как предлагать решение.'],
      ['Предложение', 'Превратить запрос в ясное коммерческое предложение на финском со scope, assumptions и следующими шагами.'],
      ['Цена', 'Рассчитать работу через время, команду, автомобиль и реальные ограничения вместо приблизительной оценки.'],
      ['Выполнение', 'Скоординировать людей, автомобиль, коммуникацию и выполнение так, чтобы обещание совпадало с реальностью.'],
    ],
  },
  uk: {
    case: 'CASE 01', live: 'РЕАЛЬНИЙ БІЗНЕС', flowTitle: 'OPERATING FLOW', active: 'АКТИВНІ BUILDS',
    tags: ['вимоги', 'логіка ціни', 'логістика', 'AI-assisted документи'],
    flow: [
      ['Запит', 'Зібрати потребу клієнта, строки, доступ і обмеження до того, як пропонувати рішення.'],
      ['Пропозиція', 'Перетворити запит на чітку комерційну пропозицію фінською зі scope, assumptions і наступними кроками.'],
      ['Ціна', 'Розрахувати роботу через час, команду, автомобіль і реальні обмеження замість приблизної оцінки.'],
      ['Виконання', 'Скоординувати людей, автомобіль, комунікацію й виконання так, щоб обіцянка відповідала реальності.'],
    ],
  },
}

const flowIcons = [Users, FileText, BarChart3, Truck]

export default function Projects({ t, lang = 'en' }) {
  const primary = t.projects.slice(0, 4)
  const builds = t.projects.slice(4)
  const [activeFlow, setActiveFlow] = useState(0)
  const copy = ui[lang] || ui.en
  const activeFlowItem = copy.flow[activeFlow] || copy.flow[0]

  return (
    <section className="contentSection sectionShell" id="work">
      <div className="sectionIntroGrid">
        <div>
          <p className="sectionNumber">02</p>
          <p className="overline">{t.nav[2]}</p>
          <h2>{t.projectsTitle}</h2>
        </div>
        <p className="sectionLead">{t.projectsIntro}</p>
      </div>

      <article className="featuredCase">
        <div className="featuredCaseCopy">
          <div className="caseLabel"><span>{copy.case}</span><i/>{copy.live}</div>
          <h3>{primary[0]?.[0]}</h3>
          <p>{primary[0]?.[1]}</p>
          <div className="caseTags">
            {copy.tags.map((tag) => <span key={tag}>{tag}</span>)}
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

      <div className="experienceList compactExperienceList">
        {primary.slice(1).map(([title, text], index) => (
          <article className="experienceRow" key={title}>
            <div className="experienceIndex">0{index + 2}</div>
            <div className="experienceTitle"><h3>{title}</h3></div>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="buildsHeader">
        <p className="overline">{copy.active}</p>
        <span>{builds.length.toString().padStart(2, '0')}</span>
      </div>
      <div className="buildGrid">
        {builds.map(([title, text], index) => (
          <article className="buildCard" key={title} tabIndex="0">
            <div className="buildTopLine"><span className="buildNumber">0{index + 1}</span><span className="buildPulse"/></div>
            <div className="buildVisualMark" aria-hidden="true"><i/><i/><i/></div>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="buildArrow"><ArrowUpRight size={17}/></div>
          </article>
        ))}
      </div>
    </section>
  )
}
