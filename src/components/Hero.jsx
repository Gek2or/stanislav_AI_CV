import { ArrowDownRight, BriefcaseBusiness, Code2, MapPin, Sparkles, Workflow } from 'lucide-react'
import { useState } from 'react'

const nodePositions = ['nodeProblem', 'nodeContext', 'nodeModel', 'nodeBuild', 'nodeEval']

export default function Hero({ t }) {
  const [activeNode, setActiveNode] = useState(0)
  const visualNodes = t.pipeline.slice(0, 5)
  const active = visualNodes[activeNode] || visualNodes[0]

  const moveGlow = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    event.currentTarget.style.setProperty('--pointer-x', `${x}%`)
    event.currentTarget.style.setProperty('--pointer-y', `${y}%`)
  }

  const resetGlow = (event) => {
    event.currentTarget.style.setProperty('--pointer-x', '50%')
    event.currentTarget.style.setProperty('--pointer-y', '45%')
  }

  const proofItems = [
    [BriefcaseBusiness, t.commandStatus[0]],
    [Workflow, t.commandStatus[3]],
    [Code2, t.commandStatus[4]],
  ]

  return (
    <section className="hero sectionShell" id="top">
      <div className="heroCopy">
        <div className="heroMetaLine">
          <span className="availabilityDot" />
          <span>{t.target}</span>
          <span className="metaSeparator">/</span>
          <span><MapPin size={13}/> Finland</span>
        </div>

        <h1 className="heroName" aria-label="Stanislav Kosytskyy">
          <span>Stanislav</span>
          <span>Kosytskyy</span>
        </h1>

        <div className="heroRole">{t.role}</div>
        <p className="heroLead">{t.hero}</p>
        <p className="heroSecondary">{t.heroSecondary}</p>

        <div className="heroActions">
          <a className="primaryButton" href="#work">{t.ctaPrimary}<ArrowDownRight size={18} /></a>
          <a className="secondaryButton" href="#contact">{t.ctaSecondary}</a>
        </div>

        <div className="heroProofStrip" aria-label="Working principles">
          {proofItems.map(([Icon, label]) => (
            <div key={label}><Icon size={16}/><span>{label}</span></div>
          ))}
        </div>
      </div>

      <aside
        className="heroVisual"
        aria-label="Interactive AI engineering system map"
        onPointerMove={moveGlow}
        onPointerLeave={resetGlow}
      >
        <div className="visualChrome">
          <div>
            <span className="visualEyebrow">AI SYSTEM MAP</span>
            <strong>{t.aiTitle}</strong>
          </div>
          <span className="visualStatus"><i/> ACTIVE</span>
        </div>

        <div className="systemCanvas">
          <div className="cursorGlow" aria-hidden="true" />
          <div className="canvasGlow" aria-hidden="true" />
          <div className="orbit orbitOne" aria-hidden="true" />
          <div className="orbit orbitTwo" aria-hidden="true" />
          <div className="orbit orbitThree" aria-hidden="true" />
          <svg className="connectionMap" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className={activeNode === 0 ? 'active' : ''} d="M50 50 L18 22" />
            <path className={activeNode === 1 ? 'active' : ''} d="M50 50 L82 18" />
            <path className={activeNode === 2 ? 'active' : ''} d="M50 50 L90 60" />
            <path className={activeNode === 3 ? 'active' : ''} d="M50 50 L62 86" />
            <path className={activeNode === 4 ? 'active' : ''} d="M50 50 L16 72" />
          </svg>

          <div className="coreNode">
            <div className="corePulse"><Sparkles size={20}/></div>
            <strong>SK</strong>
            <span>AI SOFTWARE</span>
          </div>

          {visualNodes.map(([num, label], index) => (
            <button
              type="button"
              className={`visualNode ${nodePositions[index]} ${activeNode === index ? 'active' : ''}`}
              key={`${num}-${label}`}
              onMouseEnter={() => setActiveNode(index)}
              onFocus={() => setActiveNode(index)}
              onClick={() => setActiveNode(index)}
              aria-pressed={activeNode === index}
            >
              <span>{num}</span>
              <strong>{label}</strong>
            </button>
          ))}

          <div className="signalChip signalOne">human review</div>
          <div className="signalChip signalTwo">reusable</div>
          <div className="signalChip signalThree">business-first</div>

          <div className="nodeInsight" aria-live="polite">
            <span>{active?.[0]}</span>
            <strong>{active?.[1]}</strong>
            <p>{active?.[2]}</p>
          </div>
        </div>

        <div className="visualFooter">
          <div><span>INPUT</span><strong>{t.pipeline[0]?.[1]}</strong></div>
          <div><span>ROUTE</span><strong>{t.pipeline[2]?.[1]}</strong></div>
          <div><span>OUTPUT</span><strong>{t.pipeline[4]?.[1]}</strong></div>
        </div>
      </aside>
    </section>
  )
}
