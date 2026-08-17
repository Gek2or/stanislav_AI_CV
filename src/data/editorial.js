export const editorialCopy = {
  fi: {
    nav: { work: 'Projektit', operations: 'Tausta', capabilities: 'Osaaminen', about: 'Minusta', contact: 'Yhteys' },
    intro: {
      eyebrow: 'Stanislav Kosytskyy · Finland',
      role: 'Software development · AI automation',
      title: 'Rakennan käytännön ohjelmistoratkaisuja oikeisiin liiketoimintaongelmiin.',
      text: 'Yhdistän ohjelmistokehityksen, AI-avusteisen automaation ja käytännön kokemuksen yrittäjyydestä, logistiikasta ja asiakastyöstä Suomessa.',
      availability: 'Avoin AI Software Engineer -rooleille ja käytännön ohjelmistoprojekteille.',
      work: 'Katso projektit',
      contact: 'Ota yhteyttä',
      cv: 'Lataa CV · PDF',
      principle: 'AI as a tool, not a replacement.'
    },
    work: {
      eyebrow: 'Selected work',
      title: 'Projektit syntyvät oikeista tarpeista, eivät portfolioharjoituksista.',
      intro: 'Alla ovat työt, jotka kuvaavat parhaiten tapaani ajatella: ymmärrä prosessi, rakenna pienin hyödyllinen ratkaisu ja kehitä sitä käytön perusteella.',
      labels: { problem: 'Ongelma', role: 'Rooli', built: 'Mitä rakensin', tech: 'Tekniikat / työkalut', status: 'Tila', visual: 'Projektinäkymä' },
      screenshotPending: 'Varsinainen projektikuva lisätään, kun julkaistava materiaali on valmis.',
      projects: [
        {
          title: 'Autochemix OS',
          eyebrow: 'Sisäinen operatiivinen työkalu · työn alla',
          problem: 'Tarjoukset, asiakastiedot, talouden seuranta ja tulevat integraatiot eivät kuulu hajalleen eri tiedostoihin ja viesteihin.',
          role: 'Perustaja · tuoteajattelu · toteutus',
          built: 'Rakennan sisäistä työkalukokonaisuutta, joka kokoaa tarjousluonnit, asiakas- ja talousseurannan sekä myöhemmät API-integraatiot yhteen selkeämpään työnkulkuun.',
          tech: ['Python', 'REST APIs', 'Structured data', 'AI-assisted documents'],
          status: 'Kehityksessä',
          proof: ['Quotes', 'Customers', 'Finance', 'Integrations']
        },
        {
          title: 'Muuttobotti',
          eyebrow: 'Muuttopalvelun operatiivinen työnkulku',
          problem: 'Asiakaspyyntö pitää muuttaa nopeasti selkeäksi tarjoukseksi, realistiseksi hinnaksi ja toteutettavaksi logistiikaksi.',
          role: 'Operatiivinen vastuu · myynti · prosessisuunnittelu',
          built: 'Rakensin ja ylläpidän käytännön prosessia pyynnöstä tarjoukseen, hinnoitteluun, ajoneuvo- ja tiimilogistiikkaan, asiakasviestintään ja toimitukseen. Työhön kuuluu myös verkkosivun tuki.',
          tech: ['Web', 'Pricing logic', 'Customer communication', 'Logistics'],
          status: 'Käytössä liiketoiminnassa',
          proof: ['Request', 'Offer', 'Price', 'Delivery']
        },
        {
          title: 'Python business automation',
          eyebrow: 'Pienet työkalut toistuvan työn vähentämiseen',
          problem: 'Tarjousten, asiakas- ja taloustietojen käsittely sisältää paljon toistuvia vaiheita, jotka kannattaa tehdä johdonmukaisemmin.',
          role: 'Suunnittelu · toteutus · testaus',
          built: 'Kehitän Python-skriptejä tarjousluontiin, asiakas- ja talousseurantaan, tiedon järjestämiseen ja myöhempiin API-pohjaisiin integraatioihin.',
          tech: ['Python', 'Data handling', 'Automation', 'APIs'],
          status: 'Rakenteilla',
          proof: ['Input', 'Rules', 'Output', 'Review']
        },
        {
          title: 'Psychological horror prototype',
          eyebrow: 'Interaktiivinen peliprototyyppi',
          problem: 'Miten epäluotettava havainto, eri näkökulmat ja todistusaineisto voidaan rakentaa ymmärrettäväksi pelilogiikaksi?',
          role: 'Konsepti · pelilogiikka · iterointi',
          built: 'Monikielinen prototyyppi, jossa on muuttuvia sijainteja, ääntä, todistusaineiston mekaniikkaa ja eri hahmojen näkökulmia.',
          tech: ['Godot', 'Game logic', 'Localization', 'Audio'],
          status: 'Prototyyppi',
          proof: ['State', 'Evidence', 'Audio', 'Perspective']
        }
      ]
    },
    operations: {
      eyebrow: 'From operations to software',
      title: 'Opin ohjelmistotarpeet ensin käytännön työstä.',
      text: 'Autochemix Oy:n arjessa ongelma ei ole “tarvitsemme AI:ta”. Ongelma on yleensä tarjous, joka pitää tehdä nopeasti, tieto joka on hajallaan, hinnoittelu joka pitää perustella tai logistiikka joka ei saa pettää. Siksi lähestyn ohjelmistoa prosessin kautta.',
      steps: [
        ['01', 'Todellinen ongelma', 'Asiakas, tarjous, hinnoittelu, dokumentti tai logistinen rajoite.'],
        ['02', 'Prosessin ymmärtäminen', 'Mitä tietoa tarvitaan, kuka tekee päätöksen ja missä virhe oikeasti maksaa aikaa tai rahaa.'],
        ['03', 'Digitaalinen ratkaisu', 'Pieni käyttökelpoinen työkalu, automaatio, käyttöliittymä tai integraatio ilman turhaa teknologiaa.'],
        ['04', 'Käyttö ja tarkistus', 'Ratkaisu testataan oikeaa työtä vasten ja sitä parannetaan havaittujen tarpeiden perusteella.']
      ]
    },
    capabilities: {
      eyebrow: 'Capabilities',
      title: 'Neljä aluetta, joita yhdistän samassa työssä.',
      groups: [
        ['Product & business thinking', ['Vaatimusten jäsentäminen', 'Hinnoittelu- ja prosessilogiikka', 'Asiakasviestintä', 'Dokumentit ja operatiivinen seuranta']],
        ['Web application development', ['React + Vite', 'JavaScript / JSX', 'Git + GitHub', 'GitHub Actions / CI', 'REST API -suunta']],
        ['AI and automation', ['ChatGPT, Claude, Gemini, Grok', 'Python automation', 'AI coding tools', 'LLM apps ja RAG · oppiminen', 'Human review ja tarkistus']],
        ['Logistics and operational systems', ['Muuttopalvelun operointi', 'Ajoneuvo- ja tiimikoordinointi', 'Tarjoukset ja aikataulut', 'Suomalainen yrityshallinto', 'Taloudellinen ja operatiivinen seuranta']]
      ]
    },
    about: {
      eyebrow: 'About',
      title: 'Teknologia kiinnostaa minua eniten silloin, kun sillä on selvä käyttötarkoitus.',
      paragraphs: [
        'Olen Ukrainasta ja asun Suomessa. Opiskelin Taitotalossa ohjelmistokehitystä vuosina 2020–2022 ja olen sen jälkeen rakentanut osaamistani käytännön projektien, yrittäjyyden ja jatkuvan teknisen oppimisen kautta.',
        'Autochemix Oy:n pyörittäminen on opettanut minulle paljon vaatimuksista, käyttäjistä ja prosesseista: ohjelmisto on hyödyllinen vasta silloin, kun se tekee oikeasta työstä selkeämpää. Nyt syvennän osaamistani Pythonissa, API-rajapinnoissa, Git/CI-työskentelyssä ja AI-avusteisissa sovelluksissa.'
      ]
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let’s build something useful.',
      text: 'Jos etsit tekijää, joka ymmärtää sekä ohjelmiston että sen ympärillä olevan käytännön työn, keskustelen mielelläni.',
      cv: 'Lataa CV',
      github: 'GitHub',
      location: 'Finland'
    }
  },
  en: {
    nav: { work: 'Work', operations: 'Background', capabilities: 'Capabilities', about: 'About', contact: 'Contact' },
    intro: {
      eyebrow: 'Stanislav Kosytskyy · Finland',
      role: 'Software development · AI automation',
      title: 'I build practical software for real business problems.',
      text: 'I combine software development, AI-assisted automation and hands-on experience from entrepreneurship, logistics and customer work in Finland.',
      availability: 'Open to AI Software Engineer roles and practical software projects.',
      work: 'View projects',
      contact: 'Contact me',
      cv: 'Download CV · PDF',
      principle: 'AI as a tool, not a replacement.'
    },
    work: {
      eyebrow: 'Selected work',
      title: 'Projects shaped by real needs, not portfolio exercises.',
      intro: 'These are the projects that best show how I work: understand the process, build the smallest useful solution, then improve it through use.',
      labels: { problem: 'Problem', role: 'My role', built: 'What I built', tech: 'Technology / tools', status: 'Status', visual: 'Project view' },
      screenshotPending: 'A real project screenshot will be added when publishable material is available.',
      projects: [
        { title: 'Autochemix OS', eyebrow: 'Internal operations tool · in development', problem: 'Quotes, customer information, financial tracking and future integrations should not be scattered across separate files and messages.', role: 'Founder · product thinking · implementation', built: 'I am building an internal toolset to bring quote generation, customer and financial tracking, and later API integrations into a clearer workflow.', tech: ['Python', 'REST APIs', 'Structured data', 'AI-assisted documents'], status: 'In development', proof: ['Quotes', 'Customers', 'Finance', 'Integrations'] },
        { title: 'Muuttobotti', eyebrow: 'Live moving-service workflow', problem: 'A customer request has to become a clear offer, a realistic price and workable logistics quickly.', role: 'Operations · sales · process design', built: 'I built and run the practical flow from request to offer, pricing, vehicle and team logistics, customer communication and delivery, including website support.', tech: ['Web', 'Pricing logic', 'Customer communication', 'Logistics'], status: 'Live business', proof: ['Request', 'Offer', 'Price', 'Delivery'] },
        { title: 'Python business automation', eyebrow: 'Small tools for reducing repeated work', problem: 'Quotes, customer data and financial tracking contain repeated steps that should be handled more consistently.', role: 'Design · implementation · testing', built: 'I am developing Python scripts for quote generation, customer and financial tracking, data organization and later API-based integrations.', tech: ['Python', 'Data handling', 'Automation', 'APIs'], status: 'Building', proof: ['Input', 'Rules', 'Output', 'Review'] },
        { title: 'Psychological horror prototype', eyebrow: 'Interactive game prototype', problem: 'How can unreliable perception, changing perspectives and evidence be translated into understandable game logic?', role: 'Concept · game logic · iteration', built: 'A multilingual prototype with changing locations, audio, evidence mechanics and different character perspectives.', tech: ['Godot', 'Game logic', 'Localization', 'Audio'], status: 'Prototype', proof: ['State', 'Evidence', 'Audio', 'Perspective'] }
      ]
    },
    operations: {
      eyebrow: 'From operations to software',
      title: 'I learned software problems through practical work first.',
      text: 'In day-to-day work at Autochemix Oy, the problem is rarely “we need AI”. It is usually a quote that must be prepared quickly, information spread across places, pricing that has to make sense, or logistics that cannot fail. That is why I start with the process.',
      steps: [['01','Real problem','A customer request, quote, price, document or operational constraint.'],['02','Understand the process','What information is needed, who makes the decision and where mistakes actually cost time or money.'],['03','Digital solution','A small useful tool, automation, interface or integration without unnecessary technology.'],['04','Use and verify','Test it against real work and improve it from what actually happens.']]
    },
    capabilities: {
      eyebrow: 'Capabilities',
      title: 'Four areas I bring together in the same work.',
      groups: [
        ['Product & business thinking', ['Requirements', 'Pricing and process logic', 'Customer communication', 'Documents and operational tracking']],
        ['Web application development', ['React + Vite', 'JavaScript / JSX', 'Git + GitHub', 'GitHub Actions / CI', 'REST API direction']],
        ['AI and automation', ['ChatGPT, Claude, Gemini, Grok', 'Python automation', 'AI coding tools', 'LLM apps and RAG · learning', 'Human review and verification']],
        ['Logistics and operational systems', ['Moving-service operations', 'Vehicle and team coordination', 'Quotes and schedules', 'Finnish company administration', 'Financial and operational tracking']]
      ]
    },
    about: {
      eyebrow: 'About',
      title: 'Technology interests me most when it has a clear job to do.',
      paragraphs: ['I am from Ukraine and based in Finland. I studied software development at Taitotalo from 2020 to 2022, then continued building my skills through practical projects, entrepreneurship and focused technical learning.', 'Running Autochemix Oy has taught me a lot about requirements, users and processes: software is useful only when it makes real work clearer. I am now deepening my skills in Python, APIs, Git/CI and AI-assisted applications.']
    },
    contact: { eyebrow: 'Contact', title: 'Let’s build something useful.', text: 'If you are looking for someone who understands both software and the practical work around it, I would be glad to talk.', cv: 'Download CV', github: 'GitHub', location: 'Finland' }
  },
  ru: {
    nav: { work: 'Проекты', operations: 'Опыт', capabilities: 'Навыки', about: 'Обо мне', contact: 'Контакты' },
    intro: { eyebrow: 'Stanislav Kosytskyy · Finland', role: 'Разработка · AI-автоматизация', title: 'Я создаю практичные программы для реальных бизнес-задач.', text: 'Соединяю разработку, AI-автоматизацию и практический опыт предпринимательства, логистики и работы с клиентами в Финляндии.', availability: 'Открыт к ролям AI Software Engineer и практическим software-проектам.', work: 'Смотреть проекты', contact: 'Связаться', cv: 'Скачать CV · PDF', principle: 'AI as a tool, not a replacement.' },
    work: { eyebrow: 'Selected work', title: 'Проекты, выросшие из реальных задач, а не из упражнений для портфолио.', intro: 'Они лучше всего показывают мой подход: понять процесс, сделать минимально полезное решение и улучшать его по результатам использования.', labels: { problem: 'Проблема', role: 'Моя роль', built: 'Что сделано', tech: 'Технологии / инструменты', status: 'Статус', visual: 'Вид проекта' }, screenshotPending: 'Реальный скриншот будет добавлен, когда появится материал, который можно публиковать.', projects: [
      { title: 'Autochemix OS', eyebrow: 'Внутренний операционный инструмент · в разработке', problem: 'Предложения, данные клиентов, финансовый учёт и будущие интеграции не должны быть разбросаны по разным файлам и сообщениям.', role: 'Основатель · продуктовая логика · реализация', built: 'Я собираю внутренний набор инструментов для генерации предложений, клиентского и финансового учёта и будущих API-интеграций в одном более понятном процессе.', tech: ['Python','REST APIs','Structured data','AI-assisted documents'], status: 'В разработке', proof: ['Quotes','Customers','Finance','Integrations'] },
      { title: 'Muuttobotti', eyebrow: 'Рабочий процесс мувингового сервиса', problem: 'Запрос клиента нужно быстро превратить в понятное предложение, реалистичную цену и выполнимую логистику.', role: 'Операционка · продажи · проектирование процесса', built: 'Я выстроил и веду процесс от запроса до предложения, цены, логистики машины и команды, коммуникации и выполнения, включая поддержку сайта.', tech: ['Web','Pricing logic','Customer communication','Logistics'], status: 'Работает в бизнесе', proof: ['Request','Offer','Price','Delivery'] },
      { title: 'Python business automation', eyebrow: 'Небольшие инструменты для сокращения рутины', problem: 'В предложениях, клиентских данных и финансовом учёте много повторяющихся шагов, которые стоит выполнять более последовательно.', role: 'Проектирование · реализация · тестирование', built: 'Разрабатываю Python-скрипты для генерации предложений, клиентского и финансового учёта, организации данных и будущих API-интеграций.', tech: ['Python','Data handling','Automation','APIs'], status: 'Разрабатывается', proof: ['Input','Rules','Output','Review'] },
      { title: 'Psychological horror prototype', eyebrow: 'Интерактивный игровой прототип', problem: 'Как превратить ненадёжное восприятие, разные точки зрения и улики в понятную игровую логику?', role: 'Концепт · игровая логика · итерации', built: 'Мультиязычный прототип с меняющимися локациями, звуком, механикой улик и разными перспективами персонажей.', tech: ['Godot','Game logic','Localization','Audio'], status: 'Прототип', proof: ['State','Evidence','Audio','Perspective'] }
    ] },
    operations: { eyebrow: 'From operations to software', title: 'Сначала я увидел программные задачи в реальной работе.', text: 'В ежедневной работе Autochemix Oy проблема редко звучит как «нам нужен AI». Обычно это предложение, которое надо быстро подготовить, информация в разных местах, цена, которую нужно обосновать, или логистика, где нельзя ошибиться. Поэтому я начинаю с процесса.', steps: [['01','Реальная проблема','Запрос клиента, предложение, цена, документ или операционное ограничение.'],['02','Разбор процесса','Какие данные нужны, кто принимает решение и где ошибка реально стоит времени или денег.'],['03','Цифровое решение','Небольшой полезный инструмент, автоматизация, интерфейс или интеграция без лишней технологии.'],['04','Использование и проверка','Проверить решение на реальной работе и улучшать по фактическим потребностям.']] },
    capabilities: { eyebrow: 'Capabilities', title: 'Четыре области, которые я соединяю в одной работе.', groups: [['Product & business thinking',['Требования','Логика цены и процессов','Коммуникация с клиентами','Документы и операционный учёт']],['Web application development',['React + Vite','JavaScript / JSX','Git + GitHub','GitHub Actions / CI','Направление REST API']],['AI and automation',['ChatGPT, Claude, Gemini, Grok','Python automation','AI coding tools','LLM apps и RAG · изучаю','Human review и проверка']],['Logistics and operational systems',['Операции мувингового сервиса','Координация машины и команды','Предложения и расписания','Администрирование компании в Финляндии','Финансовый и операционный учёт']]] },
    about: { eyebrow: 'About', title: 'Технологии интересуют меня больше всего, когда у них есть конкретная работа.', paragraphs: ['Я из Украины и живу в Финляндии. В 2020–2022 годах учился software development в Taitotalo, а затем продолжил развивать навыки через практические проекты, предпринимательство и целенаправленное техническое обучение.', 'Управление Autochemix Oy многому научило меня в требованиях, пользователях и процессах: программа полезна только тогда, когда делает реальную работу понятнее. Сейчас я углубляюсь в Python, API, Git/CI и AI-assisted applications.'] },
    contact: { eyebrow: 'Contact', title: 'Let’s build something useful.', text: 'Если нужен человек, который понимает и программу, и реальную работу вокруг неё — буду рад поговорить.', cv: 'Скачать CV', github: 'GitHub', location: 'Finland' }
  },
  uk: {
    nav: { work: 'Проєкти', operations: 'Досвід', capabilities: 'Навички', about: 'Про мене', contact: 'Контакти' },
    intro: { eyebrow: 'Stanislav Kosytskyy · Finland', role: 'Розробка · AI-автоматизація', title: 'Я створюю практичні програми для реальних бізнес-задач.', text: 'Поєдную розробку, AI-автоматизацію та практичний досвід підприємництва, логістики й роботи з клієнтами у Фінляндії.', availability: 'Відкритий до ролей AI Software Engineer і практичних software-проєктів.', work: 'Дивитися проєкти', contact: 'Зв’язатися', cv: 'Завантажити CV · PDF', principle: 'AI as a tool, not a replacement.' },
    work: { eyebrow: 'Selected work', title: 'Проєкти, що виросли з реальних задач, а не з вправ для портфоліо.', intro: 'Вони найкраще показують мій підхід: зрозуміти процес, зробити найменше корисне рішення і вдосконалювати його за результатами використання.', labels: { problem: 'Проблема', role: 'Моя роль', built: 'Що зроблено', tech: 'Технології / інструменти', status: 'Статус', visual: 'Вигляд проєкту' }, screenshotPending: 'Реальний скриншот буде додано, коли буде матеріал, який можна публікувати.', projects: [
      { title: 'Autochemix OS', eyebrow: 'Внутрішній операційний інструмент · у розробці', problem: 'Пропозиції, дані клієнтів, фінансовий облік і майбутні інтеграції не мають бути розкидані по різних файлах і повідомленнях.', role: 'Засновник · продуктова логіка · реалізація', built: 'Я збираю внутрішній набір інструментів для генерації пропозицій, клієнтського й фінансового обліку та майбутніх API-інтеграцій в одному зрозумілішому процесі.', tech: ['Python','REST APIs','Structured data','AI-assisted documents'], status: 'У розробці', proof: ['Quotes','Customers','Finance','Integrations'] },
      { title: 'Muuttobotti', eyebrow: 'Робочий процес сервісу переїздів', problem: 'Запит клієнта треба швидко перетворити на зрозумілу пропозицію, реалістичну ціну й здійсненну логістику.', role: 'Операції · продажі · проєктування процесу', built: 'Я вибудував і веду процес від запиту до пропозиції, ціни, логістики авто й команди, комунікації та виконання, включно з підтримкою сайту.', tech: ['Web','Pricing logic','Customer communication','Logistics'], status: 'Працює в бізнесі', proof: ['Request','Offer','Price','Delivery'] },
      { title: 'Python business automation', eyebrow: 'Невеликі інструменти для скорочення рутини', problem: 'У пропозиціях, клієнтських даних і фінансовому обліку багато повторюваних кроків, які варто виконувати послідовніше.', role: 'Проєктування · реалізація · тестування', built: 'Розробляю Python-скрипти для генерації пропозицій, клієнтського й фінансового обліку, організації даних і майбутніх API-інтеграцій.', tech: ['Python','Data handling','Automation','APIs'], status: 'Розробляється', proof: ['Input','Rules','Output','Review'] },
      { title: 'Psychological horror prototype', eyebrow: 'Інтерактивний ігровий прототип', problem: 'Як перетворити ненадійне сприйняття, різні точки зору та докази на зрозумілу ігрову логіку?', role: 'Концепт · ігрова логіка · ітерації', built: 'Багатомовний прототип зі змінними локаціями, звуком, механікою доказів і різними перспективами персонажів.', tech: ['Godot','Game logic','Localization','Audio'], status: 'Прототип', proof: ['State','Evidence','Audio','Perspective'] }
    ] },
    operations: { eyebrow: 'From operations to software', title: 'Спершу я побачив програмні задачі в реальній роботі.', text: 'У щоденній роботі Autochemix Oy проблема рідко звучить як «нам потрібен AI». Зазвичай це пропозиція, яку треба швидко підготувати, інформація в різних місцях, ціна, яку треба обґрунтувати, або логістика, де не можна помилитися. Тому я починаю з процесу.', steps: [['01','Реальна проблема','Запит клієнта, пропозиція, ціна, документ або операційне обмеження.'],['02','Розбір процесу','Які дані потрібні, хто приймає рішення і де помилка реально коштує часу або грошей.'],['03','Цифрове рішення','Невеликий корисний інструмент, автоматизація, інтерфейс або інтеграція без зайвої технології.'],['04','Використання і перевірка','Перевірити рішення на реальній роботі й покращувати за фактичними потребами.']] },
    capabilities: { eyebrow: 'Capabilities', title: 'Чотири сфери, які я поєдную в одній роботі.', groups: [['Product & business thinking',['Вимоги','Логіка ціни та процесів','Комунікація з клієнтами','Документи й операційний облік']],['Web application development',['React + Vite','JavaScript / JSX','Git + GitHub','GitHub Actions / CI','Напрям REST API']],['AI and automation',['ChatGPT, Claude, Gemini, Grok','Python automation','AI coding tools','LLM apps і RAG · вивчаю','Human review і перевірка']],['Logistics and operational systems',['Операції сервісу переїздів','Координація авто й команди','Пропозиції та розклади','Адміністрування компанії у Фінляндії','Фінансовий і операційний облік']]] },
    about: { eyebrow: 'About', title: 'Технології найбільше цікавлять мене тоді, коли мають конкретну роботу.', paragraphs: ['Я з України й живу у Фінляндії. У 2020–2022 роках навчався software development у Taitotalo, а далі розвивав навички через практичні проєкти, підприємництво та цілеспрямоване технічне навчання.', 'Керування Autochemix Oy багато чого навчило мене про вимоги, користувачів і процеси: програма корисна лише тоді, коли робить реальну роботу зрозумілішою. Зараз я поглиблюю знання Python, API, Git/CI та AI-assisted applications.'] },
    contact: { eyebrow: 'Contact', title: 'Let’s build something useful.', text: 'Якщо потрібна людина, яка розуміє і програму, і реальну роботу навколо неї — буду радий поговорити.', cv: 'Завантажити CV', github: 'GitHub', location: 'Finland' }
  }
}

export const languages = [
  { id: 'fi', label: 'FI' },
  { id: 'en', label: 'EN' },
  { id: 'uk', label: 'UA' },
  { id: 'ru', label: 'RU' },
]
