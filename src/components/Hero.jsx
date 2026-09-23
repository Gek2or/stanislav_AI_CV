import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react'

const details = {
  en: {
    intro: "I'm Stanislav.",
    kicker: 'PRODUCT / FRONTEND / AUTOMATION',
    downloadCV: 'Download CV',
    proof: [
      ['Real context', 'Moving operations', 'Customer requests, pricing, logistics and delivery'],
      ['Building now', 'React + TypeScript', 'Clear interfaces for work that cannot stay in a spreadsheet'],
      ['My advantage', 'Customer intuition', 'I notice friction because I have to deal with it too'],
    ],
    timeline: [['2020', 'Taitotalo', 'Software development studies'], ['2022', 'Projects', 'Web, automation and game projects'], ['NOW', 'Finland', 'Business work becoming software']],
  },
  fi: {
    intro: 'Olen Stanislav.',
    kicker: 'TUOTE / FRONTEND / AUTOMAATIO',
    downloadCV: 'Lataa CV',
    proof: [
      ['Todellinen konteksti', 'Muuttopalvelu', 'Asiakaspyynnöt, hinnat, logistiikka ja toimitus'],
      ['Rakennan nyt', 'React + TypeScript', 'Selkeitä käyttöliittymiä työhön, joka ei voi jäädä taulukkoon'],
      ['Vahvuuteni', 'Asiakasvaisto', 'Huomaan kitkan, koska joudun käsittelemään sitä itsekin'],
    ],
    timeline: [['2020', 'Taitotalo', 'Ohjelmistokehityksen opinnot'], ['2022', 'Projektit', 'Web-, automaatio- ja peliprojektit'], ['NYT', 'Suomi', 'Liiketoiminta muuttuu ohjelmistoksi']],
  },
}

export default function Hero({ t, lang = 'fi' }) {
  const text = details[lang] || details.en
  const cvUrl = `${import.meta.env.BASE_URL}Stanislav_Kosytskyy_CV_Bitonet.pdf`

  return (
    <section className="humanHero sectionShell" id="top">
      <div className="humanHeroMeta">
        <span>{t.target}</span>
        <span>Available in Finland</span>
      </div>

      <div className="humanHeroGrid">
        <div className="humanHeroCopy">
          <p className="humanEyebrow">{text.kicker}</p>
          <p className="humanIntro">{text.intro}</p>
          <h1>{t.hero}</h1>
          <p className="humanHeroLead">{t.heroSecondary}</p>
          <div className="humanActions">
            <a href="#work" className="humanPrimaryButton">{t.ctaPrimary}<ArrowDownRight size={17} /></a>
            <a href="#contact" className="humanTextLink">{t.ctaSecondary}<ArrowUpRight size={16} /></a>
            <a href={cvUrl} download="Stanislav_Kosytskyy_CV.pdf" className="humanTextLink">{text.downloadCV}<Download size={15} /></a>
          </div>
        </div>

        <aside className="humanProof" aria-label="What Stanislav brings">
          <p className="humanProofLabel">What I bring from practice</p>
          {text.proof.map(([label, title, detail]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </article>
          ))}
        </aside>
      </div>

      <div className="humanTimeline" aria-label="Professional direction">
        {text.timeline.map(([year, title, detail], index) => (
          <article key={`${year}-${title}`}>
            <span>0{index + 1}</span>
            <strong>{year}</strong>
            <div><b>{title}</b><small>{detail}</small></div>
          </article>
        ))}
      </div>
    </section>
  )
}
