import { Bot, CheckCircle2 } from 'lucide-react'

export default function AICore({ t }) {
  return (
    <section className="contentSection sectionShell" id="engineering">
      <div className="sectionIntroGrid">
        <div>
          <p className="sectionNumber">03</p>
          <p className="overline">{t.nav[0]}</p>
          <h2>{t.aiTitle}</h2>
        </div>
        <p className="sectionLead">{t.aiIntro}</p>
      </div>

      <div className="processList">
        {t.pipeline.map(([num, title, text]) => (
          <article className="processStep" key={num}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="engineeringBlock">
        <div className="engineeringIntro">
          <p className="overline">{t.engineeringTitle}</p>
          <h3>{t.engineeringTitle}</h3>
          <p>{t.engineeringIntro}</p>
        </div>
        <div className="engineeringList">
          {t.engineering.map(([name, status, text]) => (
            <article className="engineeringRow" key={name}>
              <div>
                <span className="statusDot" />
                <strong>{status}</strong>
              </div>
              <h4>{name}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="toolBlock">
        <div className="toolHeading">
          <Bot size={22}/>
          <div>
            <p className="overline">{t.modelsTitle}</p>
            <h3>{t.modelsTitle}</h3>
            <p>{t.modelsIntro}</p>
          </div>
        </div>
        <div className="toolList">
          {t.models.map(([name, purpose]) => (
            <div className="toolRow" key={name}>
              <CheckCircle2 size={16}/>
              <strong>{name}</strong>
              <span>{purpose}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
