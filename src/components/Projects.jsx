import { Activity, ArrowUpRight } from 'lucide-react'

export default function Projects({ t }) {
  return (
    <section className="contentSection sectionShell" id="projects">
      <div className="sectionHeading splitHeading">
        <div>
          <p className="overline">PROJECTS & ACTIVE AREAS</p>
          <h2>{t.projectsTitle}</h2>
        </div>
        <p>{t.projectsIntro}</p>
      </div>

      <div className="projectGrid">
        {t.projects.map(([title, text], index) => (
          <article className="projectCard" key={title}>
            <div className="projectMeta">
              <span><Activity size={15}/> {index < 4 ? 'ACTIVE' : index < 6 ? 'BUILDING' : 'EXPERIMENTING'}</span>
              <ArrowUpRight size={18}/>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
