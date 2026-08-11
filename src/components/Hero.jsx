import { ArrowDownRight, BriefcaseBusiness, Code2, MapPin, Workflow } from 'lucide-react'

export default function Hero({ t }) {
  const evidence = [
    [BriefcaseBusiness, t.projects[0][0], t.projects[0][1]],
    [Workflow, t.projects[1][0], t.projects[1][1]],
    [Code2, t.engineering[0][0], t.engineering[0][2]],
  ]

  return (
    <section className="hero sectionShell" id="top">
      <div className="heroCopy">
        <p className="overline">{t.target}</p>
        <h1>Stanislav<br/>Kosytskyy</h1>
        <div className="heroRole">{t.role}</div>
        <p className="heroLead">{t.hero}</p>
        <p className="heroSecondary">{t.heroSecondary}</p>
        <div className="heroActions">
          <a className="primaryButton" href="#work">{t.nav[2]}<ArrowDownRight size={18} /></a>
          <a className="secondaryButton" href="#contact">{t.nav[4]}</a>
        </div>
      </div>

      <aside className="candidateBrief" aria-label="Candidate summary">
        <div className="briefTop">
          <span className="briefIndex">01</span>
          <span className="briefLocation"><MapPin size={15}/> Finland</span>
        </div>
        <p className="briefKicker">PRACTICAL PROFILE</p>
        <div className="evidenceList">
          {evidence.map(([Icon, title, text], index) => (
            <article className="evidenceItem" key={title}>
              <div className="evidenceIcon"><Icon size={18}/></div>
              <div>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </section>
  )
}
