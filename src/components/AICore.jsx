const approachCopy = {
  en: {
    overline: 'HOW I WORK',
    steps: [
      ['01', 'Start with the situation', 'What is the customer trying to do? Where does the team lose time or confidence?'],
      ['02', 'Make the rules visible', 'Write down the inputs, assumptions and edge cases before hiding them in a component.'],
      ['03', 'Build the smallest useful path', 'A clear form, calculation, integration or prototype is better than a dashboard nobody trusts.'],
      ['04', 'Check the real route', 'I test the happy path, the awkward path and the moment when a person needs to take over.'],
    ],
    skillsTitle: 'Technical toolbox in practice',
    skills: [['React + TypeScript', 'Interfaces, responsive flows and customer-facing products'], ['Python + APIs', 'Business automation, structured data and integrations'], ['Git + delivery', 'Small changes, checks, deploys and readable handover'], ['AI when useful', 'Bounded extraction and assistance with human review around decisions']],
  },
  fi: {
    overline: 'NÄIN TYÖSKENTELEN',
    steps: [
      ['01', 'Aloitan tilanteesta', 'Mitä asiakas yrittää tehdä? Missä tiimi menettää aikaa tai varmuutta?'],
      ['02', 'Teen säännöt näkyviksi', 'Kirjaan syötteet, oletukset ja reunatapaukset ennen kuin piilotan ne komponenttiin.'],
      ['03', 'Rakennan pienimmän hyödyllisen polun', 'Selkeä lomake, laskenta, integraatio tai prototyyppi on parempi kuin epäluotettava dashboard.'],
      ['04', 'Tarkistan todellisen polun', 'Testaan normaalin, hankalan ja sen hetken, jolloin ihmisen pitää ottaa ohjat.'],
    ],
    skillsTitle: 'Tekninen työkalupakki käytännössä',
    skills: [['React + TypeScript', 'Käyttöliittymät, responsiiviset työnkulut ja asiakastuotteet'], ['Python + API:t', 'Liiketoiminnan automaatio, rakenteinen data ja integraatiot'], ['Git + toimitus', 'Pienet muutokset, tarkistukset, julkaisut ja selkeä luovutus'], ['AI tarvittaessa', 'Rajattu tiedon poiminta ja avustus, ihmisen tarkistus päätösten ympärillä']],
  },
}

export default function AICore({ t, lang = 'fi' }) {
  const copy = approachCopy[lang] || approachCopy.en

  return (
    <section className="humanApproach sectionShell" id="engineering">
      <div className="humanSectionHeading">
        <div>
          <p className="humanSectionNumber">02</p>
          <p className="humanEyebrow">{copy.overline}</p>
          <h2>{t.aiTitle}</h2>
        </div>
        <p>{t.aiIntro}</p>
      </div>

      <div className="humanSteps">
        {copy.steps.map(([number, title, text]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="humanSkills">
        <div>
          <p className="humanEyebrow">TOOLS I USE</p>
          <h3>{copy.skillsTitle}</h3>
        </div>
        <div className="humanSkillsGrid">
          {copy.skills.map(([title, text]) => (
            <article key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
