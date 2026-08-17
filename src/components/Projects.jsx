function ProjectVisual({ project, copy, index }) {
  return (
    <div className={`projectVisual visual${index + 1}`} aria-label={copy.work.labels.visual}>
      <div className="visualTopline">
        <span>{copy.work.labels.visual}</span>
        <span>{project.status}</span>
      </div>
      <div className="proofStrip" aria-hidden="true">
        {project.proof.map((item, itemIndex) => (
          <span key={item}><b>0{itemIndex + 1}</b>{item}</span>
        ))}
      </div>
      <p>{copy.work.screenshotPending}</p>
    </div>
  )
}

function ProjectDetails({ project, copy }) {
  const labels = copy.work.labels
  return (
    <div className="projectDetails">
      <div><span>{labels.problem}</span><p>{project.problem}</p></div>
      <div><span>{labels.role}</span><p>{project.role}</p></div>
      <div><span>{labels.built}</span><p>{project.built}</p></div>
      <div className="projectTech"><span>{labels.tech}</span><p>{project.tech.join(' · ')}</p></div>
    </div>
  )
}

export default function Projects({ copy }) {
  return (
    <section className="section shell" id="work">
      <div className="sectionIntro">
        <p className="eyebrow">{copy.work.eyebrow}</p>
        <h2>{copy.work.title}</h2>
        <p>{copy.work.intro}</p>
      </div>

      <div className="projectList">
        {copy.work.projects.map((project, index) => (
          <article className={`project project${index + 1}`} key={project.title}>
            <div className="projectCopy">
              <div className="projectHeading">
                <div>
                  <p className="projectEyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                </div>
                <span className="statusBadge">{project.status}</span>
              </div>
              <ProjectDetails project={project} copy={copy} />
            </div>
            <ProjectVisual project={project} copy={copy} index={index} />
          </article>
        ))}
      </div>
    </section>
  )
}
