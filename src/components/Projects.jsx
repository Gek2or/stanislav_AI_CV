import { ArrowUpRight } from 'lucide-react'

const projectCopy = {
  en: {
    overline: 'SELECTED WORK',
    title: 'Real work first. Tools second.',
    intro: 'I build from problems I have actually had to understand: customer requests, pricing, planning, logistics and the small moments where a process starts wasting someone\'s time.',
    featuredLabel: 'LIVE PRODUCT',
    featuredTitle: 'Muuttobotti / Autochemix Oy',
    featuredText: 'A multilingual moving-service product with a deterministic calculator, booking flow and bounded AI inventory assistant. The price remains explainable and uncertain items stay visible for a human decision.',
    featuredLink: 'Open live service',
    cards: [
      ['ARKI', 'PRODUCT CONCEPT', 'A Nordic weekly-planning result hub connecting meals, shopping baskets, promotions, package sizes and the real cost of a trip.', 'https://github.com/Gek2or/ARKI'],
      ['ASCII//RAIN', 'GODOT / WEB', 'A Godot 4.7 action game with a readable ASCII city, combat, progression, sound and a published browser build.', 'https://gek2or.github.io/ascii-rain/'],
      ['Donetsk 2013', 'BLENDER / UNITY', 'A reference-driven 3D environment study combining historical research, Blender assets and Unity scene work.', 'https://github.com/Gek2or/donetsk-2013'],
    ],
    note: 'The common thread is simple: make the next decision clearer, then make the system behave the same way every time.',
  },
  fi: {
    overline: 'VALITUT TYÖT',
    title: 'Ensin todellinen työ. Sitten työkalut.',
    intro: 'Rakennan ongelmista, joita olen joutunut itse ymmärtämään: asiakaspyynnöistä, hinnoittelusta, suunnittelusta, logistiikasta ja niistä pienistä hetkistä, joissa prosessi alkaa tuhlata jonkun aikaa.',
    featuredLabel: 'LIVE-PALVELU',
    featuredTitle: 'Muuttobotti / Autochemix Oy',
    featuredText: 'Monikielinen muuttopalvelun tuote, jossa on selitettävä laskuri, varausprosessi ja rajattu AI-avusteinen inventaario. Hinta pysyy ymmärrettävänä ja epävarmat kohteet jäävät ihmisen tarkistettaviksi.',
    featuredLink: 'Avaa live-palvelu',
    cards: [
      ['ARKI', 'TUOTEKONSEPTI', 'Nordic-viikkosuunnittelun tulosnäkymä, joka yhdistää ateriat, ostoskorit, tarjoukset, pakkauskoot ja matkan todellisen hinnan.', 'https://github.com/Gek2or/ARKI'],
      ['ASCII//RAIN', 'GODOT / WEB', 'Godot 4.7 -toimintapeli, jossa on luettava ASCII-kaupunki, taistelu, eteneminen, äänet ja julkaistu selainversio.', 'https://gek2or.github.io/ascii-rain/'],
      ['Donetsk 2013', 'BLENDER / UNITY', 'Lähteisiin perustuva 3D-ympäristötutkimus, jossa yhdistyvät historiallinen aineisto, Blender-assetit ja Unity-kohtaus.', 'https://github.com/Gek2or/donetsk-2013'],
    ],
    note: 'Yhteinen ajatus on yksinkertainen: tee seuraavasta päätöksestä selkeämpi ja järjestelmästä joka kerta samanlainen.',
  },
}

export default function Projects({ t, lang = 'fi' }) {
  const copy = projectCopy[lang] || projectCopy.en

  return (
    <section className="humanWork sectionShell" id="work">
      <div className="humanSectionHeading">
        <div>
          <p className="humanSectionNumber">01</p>
          <p className="humanEyebrow">{copy.overline}</p>
          <h2>{copy.title}</h2>
        </div>
        <p>{copy.intro}</p>
      </div>

      <article className="humanFeaturedProject">
        <div className="humanFeaturedCopy">
          <span className="humanCardLabel">{copy.featuredLabel}</span>
          <h3>{copy.featuredTitle}</h3>
          <p>{copy.featuredText}</p>
          <div className="humanTagRow"><span>customer workflow</span><span>pricing logic</span><span>React / TypeScript</span></div>
          <a href="https://muuttobotti.fi/" target="_blank" rel="noreferrer" className="humanInlineLink">{copy.featuredLink}<ArrowUpRight size={16} /></a>
        </div>
        <div className="humanFeaturedAside">
          <span>01 / 04</span>
          <strong>Request → offer → price → delivery</strong>
          <p>Software follows the operation. The operation stays visible.</p>
        </div>
      </article>

      <div className="humanProjectGrid">
        {copy.cards.map(([title, label, text, href], index) => (
          <a className="humanProjectCard" key={title} href={href} target="_blank" rel="noreferrer">
            <div className="humanCardTop"><span>0{index + 2}</span><ArrowUpRight size={17} /></div>
            <span className="humanCardLabel">{label}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="humanCardLink">Open project</span>
          </a>
        ))}
      </div>

      <p className="humanWorkNote">{copy.note}</p>
    </section>
  )
}
