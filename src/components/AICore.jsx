import { BrainCircuit, Bot, CheckCircle2, Code2, GitBranch, Layers3, ScanSearch } from 'lucide-react'

const icons = [ScanSearch, BrainCircuit, GitBranch, Code2, CheckCircle2, Layers3]

export default function AICore({ t }) {
  return (
    <section className="contentSection sectionShell" id="ai-core">
      <div className="sectionHeading">
        <p className="overline">AI SYSTEM THINKING</p>
        <h2>{t.aiTitle}</h2>
        <p>{t.aiIntro}</p>
      </div>

      <div className="pipelineGrid">
        {t.pipeline.map(([num, title, text], index) => {
          const Icon = icons[index]
          return (
            <article className="pipelineCard" key={num}>
              <div className="pipelineTop"><span>{num}</span><Icon size={20}/></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          )
        })}
      </div>

      <div className="modelSection">
        <div className="modelIntro">
          <Bot size={26}/>
          <div>
            <p className="overline">TOOL STRATEGY</p>
            <h3>{t.modelsTitle}</h3>
            <p>{t.modelsIntro}</p>
          </div>
        </div>
        <div className="modelRows">
          {t.models.map(([name, purpose]) => (
            <div className="modelRow" key={name}>
              <strong>{name}</strong>
              <span>{purpose}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="engineeringSection">
        <div className="sectionHeading compactHeading">
          <p className="overline">ENGINEERING FOCUS</p>
          <h3>{t.engineeringTitle}</h3>
          <p>{t.engineeringIntro}</p>
        </div>
        <div className="engineeringGrid">
          {t.engineering.map(([name, status, text]) => (
            <article className="engineeringCard" key={name}>
              <div className="engineeringStatus"><span />{status}</div>
              <h4>{name}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
