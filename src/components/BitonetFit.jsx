import { Building2, CheckCircle2 } from 'lucide-react'

export default function BitonetFit({ t }) {
  return (
    <section className="contentSection sectionShell" id="bitonet">
      <div className="bitonetHeader glassPanel">
        <div className="bitonetMark"><Building2 size={28}/><span>BITONET OY</span></div>
        <div>
          <p className="overline">{t.bitonetEyebrow}</p>
          <h2>{t.bitonetTitle}</h2>
          <p>{t.bitonetIntro}</p>
        </div>
      </div>
      <div className="fitGrid">
        {t.fit.map(([title, text]) => (
          <article className="fitCard" key={title}>
            <CheckCircle2 size={22}/>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
