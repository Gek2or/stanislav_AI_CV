import { ArrowUpRight, BarChart3, ChevronDown, FileText, Truck, Users } from 'lucide-react'
import { useState } from 'react'

const labels = {
  en: ['Lead', 'Offer', 'Price', 'Delivery'],
  fi: ['Liidi', 'Tarjous', 'Hinta', 'Toimitus'],
  ru: ['Лид', 'Предложение', 'Цена', 'Выполнение'],
  uk: ['Лід', 'Пропозиція', 'Ціна', 'Виконання'],
}

const flowIcons = [Users, FileText, BarChart3, Truck]

export default function Projects({ t, lang }) {
  const primary = t.projects.slice(0, 4)
  const builds = t.projects.slice(4)
  const [activeFlow, setActiveFlow] = useState(0)
  const [expanded, setExpanded] = useState(null)
  const flow = labels[lang] || labels.en

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
          <div className="caseLabel"><span>CASE 01</span><i/> LIVE BUSINESS</div>
          <h3>{primary[0][0]}</h3>
          <p>{primary[0][1]}</p>
          <div className="caseTags">
            <span>customer workflow</span>
            <span>pricing</span>
            <span>logistics</span>
            <span>AI-assisted docs</span>
          </div>
        </div>

        <div className="caseVisual" aria-label="Interactive operating flow">
          <div className="caseVisualTop"><span>OPERATING FLOW</span><span>01 → 04</span></div>
          <div className="flowTrack">
            {flow.map((label, index) => {
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
          <div className="caseSignal">
            <div>
              <span>{t.pipeline[activeFlow]?.[1] || t.aiTitle}</span>
              <strong>{t.pipeline[activeFlow]?.[2] || t.aiIntro}</strong>
            </div>
            <div className="signalBar" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((item) => <i key={item} className={item <= activeFlow + 1 ? 'active' : ''}/>) }
            </div>
          </div>
        </div>
      </article>

      <div className="experienceList compactExperienceList">
        {primary.slice(1).map(([title, text], index) => (
          <article className={`experienceRow ${expanded === index ? 'expanded' : ''}`} key={title}>
            <div className="experienceIndex">0{index + 2}</div>
            <div className="experienceTitle"><h3>{title}</h3></div>
            <p>{text}</p>
            <button
              type="button"
              className="expandButton"
              onClick={() => setExpanded(expanded === index ? null : index)}
              aria-expanded={expanded === index}
              aria-label={title}
            >
              <ChevronDown size={18}/>
            </button>
          </article>
        ))}
      </div>

      <div className="buildsHeader">
        <p className="overline">{t.engineeringTitle}</p>
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
