import { ArrowDownRight, ArrowUpRight, Download, MapPin } from 'lucide-react'

const copy = {
  en: {
    iam: 'I am',
    kicker: 'SOFTWARE / AUTOMATION / APPLIED AI',
    application: 'Target role · AI Software Engineer · Bitonet Oy',
    headline: 'I build practical software and automation for real business problems.',
    subhead: 'I combine software development and AI tools with hands-on experience in entrepreneurship, logistics and customer operations in Finland. I start from the workflow, then decide what should become software.',
    downloadCV: 'Download CV · PDF',
    proof: [
      ['Current context', 'Autochemix Oy', 'Live business operations in Finland'],
      ['Building now', 'Python + APIs', 'Automation for quotes, tracking and integrations'],
      ['What makes it different', 'Operations → software', 'Requirements come from work I actually do'],
    ],
    timeline: [
      ['2020', 'Taitotalo', 'Software-development studies'],
      ['2022', 'Building', 'Software and game-development projects'],
      ['NOW', 'Finland', 'Business operations → software and automation'],
    ],
  },
  fi: {
    iam: 'Olen',
    kicker: 'OHJELMISTOT / AUTOMAATIO / SOVELTAVA AI',
    application: 'Tavoiterooli · AI Software Engineer · Bitonet Oy',
    headline: 'Rakennan käytännön ohjelmistoja ja automaatioita todellisiin liiketoimintaongelmiin.',
    subhead: 'Yhdistän ohjelmistokehityksen ja AI-työkalut käytännön kokemukseen yrittäjyydestä, logistiikasta ja asiakastyöstä Suomessa. Aloitan työnkulusta ja päätän vasta sen jälkeen, mikä kannattaa muuttaa ohjelmistoksi.',
    downloadCV: 'Lataa CV · PDF',
    proof: [
      ['Nykyinen ympäristö', 'Autochemix Oy', 'Päivittäistä liiketoimintaa Suomessa'],
      ['Rakennan nyt', 'Python + API:t', 'Automaatioita tarjouksiin, seurantaan ja integraatioihin'],
      ['Oma näkökulmani', 'Operatiivinen työ → ohjelmisto', 'Vaatimukset syntyvät työstä, jota teen itse'],
    ],
    timeline: [
      ['2020', 'Taitotalo', 'Ohjelmistokehityksen opinnot'],
      ['2022', 'Projektit', 'Ohjelmisto- ja pelinkehitysprojekteja'],
      ['NYT', 'Suomi', 'Liiketoiminnan prosessit → ohjelmistot ja automaatio'],
    ],
  },
  ru: {
    iam: 'Я —',
    kicker: 'ПРОГРАММЫ / АВТОМАТИЗАЦИЯ / ПРИКЛАДНОЙ ИИ',
    application: 'Целевая роль · AI Software Engineer · Bitonet Oy',
    headline: 'Я создаю практичные программы и автоматизации для реальных бизнес-задач.',
    subhead: 'Я соединяю разработку и инструменты ИИ с практическим опытом предпринимательства, логистики и работы с клиентами в Финляндии. Сначала разбираюсь в процессе и только потом решаю, что действительно стоит автоматизировать.',
    downloadCV: 'Скачать CV · PDF',
    proof: [
      ['Сейчас', 'Autochemix Oy', 'Ежедневная работа реального бизнеса в Финляндии'],
      ['Строю', 'Python + API', 'Автоматизации для предложений, учёта и интеграций'],
      ['Мой подход', 'Процессы → программы', 'Требования приходят из задач, которые я сам выполняю'],
    ],
    timeline: [
      ['2020', 'Taitotalo', 'Обучение разработке программного обеспечения'],
      ['2022', 'Проекты', 'Проекты в разработке программ и игр'],
      ['СЕЙЧАС', 'Финляндия', 'Бизнес-процессы → программы и автоматизация'],
    ],
  },
  uk: {
    iam: 'Я —',
    kicker: 'ПРОГРАМИ / АВТОМАТИЗАЦІЯ / ПРИКЛАДНИЙ ШІ',
    application: 'Цільова роль · AI Software Engineer · Bitonet Oy',
    headline: 'Я створюю практичні програми й автоматизації для реальних бізнес-задач.',
    subhead: 'Я поєдную розробку та інструменти ШІ з практичним досвідом підприємництва, логістики й роботи з клієнтами у Фінляндії. Спочатку розбираюся в процесі й лише потім вирішую, що справді варто автоматизувати.',
    downloadCV: 'Завантажити CV · PDF',
    proof: [
      ['Зараз', 'Autochemix Oy', 'Щоденна робота реального бізнесу у Фінляндії'],
      ['Будую', 'Python + API', 'Автоматизації для пропозицій, обліку та інтеграцій'],
      ['Мій підхід', 'Процеси → програми', 'Вимоги походять із задач, які я виконую сам'],
    ],
    timeline: [
      ['2020', 'Taitotalo', 'Навчання розробці програмного забезпечення'],
      ['2022', 'Проєкти', 'Проєкти з розробки програм та ігор'],
      ['ЗАРАЗ', 'Фінляндія', 'Бізнес-процеси → програми й автоматизація'],
    ],
  },
}

export default function Hero({ t, lang = 'fi' }) {
  const text = copy[lang] || copy.fi
  const cvUrl = `${import.meta.env.BASE_URL}Stanislav_Kosytskyy_CV_Bitonet.pdf`

  return (
    <section className="referenceHero sectionShell" id="top">
      <div className="referenceHeroTopline">
        <div><span className="availabilityDot"/><strong>{text.application}</strong></div>
        <div><MapPin size={13}/><span>Finland</span></div>
      </div>

      <div className="referenceHeroIdentity">
        <p>{text.iam}</p>
        <h1 aria-label="Stanislav Kosytskyy">
          <span>Stanislav</span>
          <span>Kosytskyy</span>
        </h1>
      </div>

      <div className="referenceHeroSplit convictionHeroSplit">
        <div className="referenceHeroStatement">
          <span className="referenceHeroKicker">{text.kicker}</span>
          <h2>{text.headline}</h2>
          <p>{text.subhead}</p>
          <div className="referenceHeroActions">
            <a href="#work" className="primaryButton">{t.ctaPrimary}<ArrowDownRight size={17}/></a>
            <a href="#contact" className="referenceTextLink">{t.ctaSecondary}<ArrowUpRight size={16}/></a>
            <a href={cvUrl} download="Stanislav_Kosytskyy_CV_Bitonet.pdf" className="referenceTextLink" aria-label={text.downloadCV}>{text.downloadCV}<Download size={16}/></a>
          </div>
        </div>

        <aside className="heroProof" aria-label="Practical background">
          {text.proof.map(([label, title, detail]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </article>
          ))}
        </aside>
      </div>

      <div className="referenceHeroTimeline" aria-label="Professional direction timeline">
        {text.timeline.map(([year, title, detail], index) => (
          <article key={`${year}-${title}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{year}</strong>
            <div><b>{title}</b><small>{detail}</small></div>
          </article>
        ))}
        <div className="referenceTimelineRail" aria-hidden="true"><i/><i/><i/></div>
      </div>

    </section>
  )
}
