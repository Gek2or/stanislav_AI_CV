import { Building2, CheckCircle2 } from 'lucide-react'

export default function BitonetFit({ t }) {
  return (
    <section className="contentSection sectionShell" id="bitonet">
      <div className="sectionIntroGrid bitonetIntroGrid">
        <div>
          <p className="sectionNumber">04</p>
          <p className="overline">{t.bitonetEyebrow}</p>
          <h2>{t.bitonetTitle}</h2>
        </div>
        <div className="bitonetStatement">
          <Building2 size={26}/>
          <p>{t.bitonetIntro}</p>
        </div>
      </div>

      <div className="fitList">
        {t.fit.map(([title, text], index) => (
          <article className="fitRow" key={title}>
            <span className="fitIndex">0{index + 1}</span>
            <CheckCircle2 size={18}/>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
