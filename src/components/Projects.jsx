import { ArrowUpRight } from 'lucide-react'

export default function Projects({ t }) {
  const primary = t.projects.slice(0, 4)
  const builds = t.projects.slice(4)

  return (
    <section className="contentSection sectionShell" id="work">
      <div className="sectionIntroGrid">
        <div>
          <p className="sectionNumber">02</p>
          <p className="overline">EXPERIENCE & SELECTED WORK</p>
          <h2>{t.projectsTitle}</h2>
        </div>
        <p className="sectionLead">{t.projectsIntro}</p>
      </div>

      <div className="experienceList">
        {primary.map(([title, text], index) => (
          <article className={`experienceRow ${index === 0 ? 'featured' : ''}`} key={title}>
            <div className="experienceIndex">0{index + 1}</div>
            <div className="experienceTitle">
              <h3>{title}</h3>
              <span>{index === 0 ? 'REAL OPERATIONS' : 'PRACTICAL RESPONSIBILITY'}</span>
            </div>
            <p>{text}</p>
            <ArrowUpRight size={18}/>
          </article>
        ))}
      </div>

      <div className="buildsHeader">
        <p className="overline">ACTIVE BUILDS & EXPERIMENTS</p>
        <span>{builds.length.toString().padStart(2, '0')} selected areas</span>
      </div>
      <div className="buildGrid">
        {builds.map(([title, text], index) => (
          <article className="buildCard" key={title}>
            <div className="buildNumber">0{index + 1}</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
