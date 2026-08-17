import { Download, Github, Mail, MapPin, Phone } from 'lucide-react'

export function Operations({ copy }) {
  return (
    <section className="section shell operationsSection" id="operations">
      <div className="sectionIntro splitIntro">
        <div>
          <p className="eyebrow">{copy.operations.eyebrow}</p>
          <h2>{copy.operations.title}</h2>
        </div>
        <p>{copy.operations.text}</p>
      </div>
      <div className="processList">
        {copy.operations.steps.map(([number, title, text]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Capabilities({ copy }) {
  return (
    <section className="section shell capabilitiesSection" id="engineering">
      <span id="bitonet" className="anchorAlias" aria-hidden="true" />
      <div className="sectionIntro">
        <p className="eyebrow">{copy.capabilities.eyebrow}</p>
        <h2>{copy.capabilities.title}</h2>
      </div>
      <div className="capabilityGrid">
        {copy.capabilities.groups.map(([title, items], index) => (
          <article key={title}>
            <span className="capNumber">0{index + 1}</span>
            <h3>{title}</h3>
            <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export function About({ copy }) {
  return (
    <section className="section shell aboutSection" id="about">
      <div className="sectionIntro splitIntro">
        <div>
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <h2>{copy.about.title}</h2>
        </div>
        <div className="aboutCopy">
          {copy.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  )
}

export function Contact({ copy }) {
  const cvHref = `${import.meta.env.BASE_URL}Stanislav_Kosytskyy_CV_Bitonet.pdf`
  return (
    <section className="section shell contactSection" id="contact">
      <p className="eyebrow">{copy.contact.eyebrow}</p>
      <div className="contactGrid">
        <div>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.text}</p>
        </div>
        <div className="contactLinks">
          <a href="mailto:stanislavkosytskyy@gmail.com"><Mail size={17}/><span>stanislavkosytskyy@gmail.com</span></a>
          <a href="tel:+3584578767567"><Phone size={17}/><span>+358 45 78767567</span></a>
          <a href="https://github.com/Gek2or" target="_blank" rel="noreferrer"><Github size={17}/><span>{copy.contact.github}</span></a>
          <a href={cvHref} download="Stanislav_Kosytskyy_CV_Bitonet.pdf"><Download size={17}/><span>{copy.contact.cv}</span></a>
          <div><MapPin size={17}/><span>{copy.contact.location}</span></div>
        </div>
      </div>
    </section>
  )
}
