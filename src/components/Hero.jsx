import { ArrowDownRight, BriefcaseBusiness, Code2, MapPin, Workflow } from 'lucide-react'
import AISystemApp from './AISystemApp'

export default function Hero({ t, lang }) {
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

      <AISystemApp t={t} lang={lang} />
    </section>
  )
}
