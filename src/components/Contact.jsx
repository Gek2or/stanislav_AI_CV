import { Mail, MapPin, Phone } from 'lucide-react'

export default function Contact({ t }) {
  return (
    <section className="humanContact sectionShell" id="contact">
      <div className="humanContactCopy">
        <p className="humanSectionNumber">03</p>
        <p className="humanEyebrow">{t.nav[4]}</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
      </div>
      <div className="humanContactLinks">
        <a href="mailto:stanislavkosytskyy@gmail.com"><Mail size={18} /><span>stanislavkosytskyy@gmail.com</span></a>
        <a href="tel:+3584578767567"><Phone size={18} /><span>+358 45 78767567</span></a>
        <div><MapPin size={18} /><span>{t.location}</span></div>
      </div>
    </section>
  )
}
