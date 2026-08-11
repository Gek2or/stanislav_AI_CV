import { ArrowUpRight, BarChart3, FileText, Truck, Users } from 'lucide-react'

const flow = [
  [Users, 'Lead'],
  [FileText, 'Offer'],
  [BarChart3, 'Price'],
  [Truck, 'Delivery'],
]

export default function Projects({ t }) {
  const primary = t.projects.slice(0, 4)
  const builds = t.projects.slice(4)

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
          <div className="caseLabel"><span>CASE 01</span><i/> REAL OPERATIONS</div>
          <h3>{primary[0][0]}</h3>
          <p>{primary[0][1]}</p>
          <div className="caseTags">
            <span>customer workflow</span>
            <span>pricing</span>
            <span>logistics</span>
            <span>AI-assisted docs</span>
          </div>
        </div>

        <div className="caseVisual" aria-label="Operational workflow visualization">
          <div className="caseVisualTop"><span>OPERATING FLOW</span><span>01 → 04</span></div>
          <div className="flowTrack">
            {flow.map(([Icon, label], index) => (
              <div className="flowStage" key={label}>
                <div className="flowIcon"><Icon size={19}/></div>
                <span>0{index + 1}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
          <div className="caseSignal">
            <span>AI layer</span>
            <div className="signalBar"><i/><i/><i/><i/><i/><i/></div>
            <strong>structured communication + repeatable review</strong>
          </div>
        </div>
      </article>

      <div className="experienceList compactExperienceList">
        {primary.slice(1).map(([title, text], index) => (
          <article className="experienceRow" key={title}>
            <div className="experienceIndex">0{index + 2}</div>
            <div className="experienceTitle"><h3>{title}</h3></div>
            <p>{text}</p>
            <ArrowUpRight size={18}/>
          </article>
        ))}
      </div>

      <div className="buildsHeader">
        <p className="overline">{t.engineeringTitle}</p>
        <span>{builds.length.toString().padStart(2, '0')} active areas</span>
      </div>
      <div className="buildGrid">
        {builds.map(([title, text], index) => (
          <article className="buildCard" key={title}>
            <div className="buildTopLine"><span className="buildNumber">0{index + 1}</span><span className="buildPulse"/></div>
            <div className="buildVisualMark" aria-hidden="true"><i/><i/><i/></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
