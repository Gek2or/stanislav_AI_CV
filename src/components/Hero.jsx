import { ArrowDownRight, Download, MapPin } from 'lucide-react'

export default function Hero({ copy }) {
  const cvHref = `${import.meta.env.BASE_URL}Stanislav_Kosytskyy_CV_Bitonet.pdf`

  return (
    <section className="hero shell" id="top">
      <div className="heroMeta">
        <span>{copy.intro.eyebrow}</span>
        <span className="availability"><i aria-hidden="true" />{copy.intro.availability}</span>
      </div>

      <div className="heroGrid">
        <div className="heroIdentity">
          <p className="eyebrow">{copy.intro.role}</p>
          <h1>Stanislav<br/>Kosytskyy</h1>
        </div>

        <div className="heroStatement">
          <h2>{copy.intro.title}</h2>
          <p>{copy.intro.text}</p>
          <div className="heroActions">
            <a className="button primary" href="#work">{copy.intro.work}<ArrowDownRight size={16}/></a>
            <a className="button secondary" href="#contact">{copy.intro.contact}</a>
            <a className="textAction" href={cvHref} download="Stanislav_Kosytskyy_CV_Bitonet.pdf"><Download size={15}/>{copy.intro.cv}</a>
          </div>
        </div>
      </div>

      <div className="heroFoot">
        <span><MapPin size={14}/> Finland</span>
        <span>{copy.intro.principle}</span>
      </div>
    </section>
  )
}
