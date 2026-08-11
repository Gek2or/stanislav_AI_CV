import { ArrowDownRight, BriefcaseBusiness, Code2, MapPin, Sparkles, Workflow } from 'lucide-react'

const visualNodes = [
  ['01', 'Problem', 'nodeProblem'],
  ['02', 'Context', 'nodeContext'],
  ['03', 'Model', 'nodeModel'],
  ['04', 'Build', 'nodeBuild'],
  ['05', 'Evaluate', 'nodeEval'],
]

export default function Hero({ t }) {
  return (
    <section className="hero sectionShell" id="top">
      <div className="heroCopy">
        <div className="heroMetaLine">
          <span className="availabilityDot" />
          <span>{t.target}</span>
          <span className="metaSeparator">/</span>
          <span><MapPin size={13}/> Finland</span>
        </div>
        <h1>Stanislav<br/>Kosytskyy</h1>
        <div className="heroRole">{t.role}</div>
        <p className="heroLead">{t.hero}</p>
        <p className="heroSecondary">{t.heroSecondary}</p>
        <div className="heroActions">
          <a className="primaryButton" href="#work">{t.nav[2]}<ArrowDownRight size={18} /></a>
          <a className="secondaryButton" href="#contact">{t.nav[4]}</a>
        </div>
        <div className="heroProofStrip">
          <div><BriefcaseBusiness size={16}/><span>Real business operations</span></div>
          <div><Workflow size={16}/><span>AI workflow design</span></div>
          <div><Code2 size={16}/><span>Software engineering path</span></div>
        </div>
      </div>

      <aside className="heroVisual" aria-label="AI engineering system map">
        <div className="visualChrome">
          <div>
            <span className="visualEyebrow">AI SYSTEM MAP</span>
            <strong>From problem to verified output</strong>
          </div>
          <span className="visualStatus"><i/> ACTIVE</span>
        </div>

        <div className="systemCanvas">
          <div className="canvasGlow" />
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />
          <div className="orbit orbitThree" />
          <svg className="connectionMap" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 50 L18 22" />
            <path d="M50 50 L82 18" />
            <path d="M50 50 L90 60" />
            <path d="M50 50 L62 86" />
            <path d="M50 50 L16 72" />
          </svg>

          <div className="coreNode">
            <div className="corePulse"><Sparkles size={20}/></div>
            <strong>SK</strong>
            <span>AI SOFTWARE</span>
          </div>

          {visualNodes.map(([num, label, className]) => (
            <div className={`visualNode ${className}`} key={label}>
              <span>{num}</span>
              <strong>{label}</strong>
            </div>
          ))}

          <div className="signalChip signalOne">human review</div>
          <div className="signalChip signalTwo">reusable</div>
          <div className="signalChip signalThree">business-first</div>
        </div>

        <div className="visualFooter">
          <div><span>INPUT</span><strong>real workflow</strong></div>
          <div><span>ROUTE</span><strong>right model</strong></div>
          <div><span>OUTPUT</span><strong>verified system</strong></div>
        </div>
      </aside>
    </section>
  )
}
