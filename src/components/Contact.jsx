import { Mail, MapPin, Phone } from 'lucide-react'

export default function Contact({ t }) {
  return (
    <section className="contactSection sectionShell" id="contact">
      <div className="contactIntro">
        <p className="sectionNumber">06</p>
        <p className="overline">{t.nav[4]}</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
      </div>
      <div className="contactCards">
        <a href="tel:+3584578767567"><Phone size={19}/><span>+358 45 78767567</span></a>
        <a href="mailto:stanislavkosytskyy@gmail.com"><Mail size={19}/><span>stanislavkosytskyy@gmail.com</span></a>
        <div><MapPin size={19}/><span>Finland</span></div>
      </div>
    </section>
  )
}
