import { Bot, Check, CheckCircle2, ChevronRight, Code2, Database, GitBranch, Network, ShieldCheck, Target } from 'lucide-react'
import { useState } from 'react'

const visualCopy = {
  en: {
    artifact: 'ENGINEERING ARTIFACT',
    problem: ['USER NEED', 'BUSINESS OUTCOME', 'ACCEPTANCE'],
    context: ['DATA', 'CONSTRAINTS', 'RISK'],
    route: ['CODE', 'API', 'RAG', 'LLM'],
    build: ['input = normalize(request)', 'result = service.run(input)', 'return verify(result)'],
    verify: ['behavior', 'edge cases', 'human review'],
    deliver: ['COMMIT', 'BUILD', 'CHECK', 'DEPLOY'],
  },
  fi: {
    artifact: 'ENGINEERING-ARTEFAKTI',
    problem: ['KÄYTTÄJÄTARVE', 'LIIKETOIMINTATULOS', 'HYVÄKSYNTÄ'],
    context: ['DATA', 'RAJAT', 'RISKI'],
    route: ['KOODI', 'API', 'RAG', 'LLM'],
    build: ['input = normalize(request)', 'result = service.run(input)', 'return verify(result)'],
    verify: ['toiminta', 'reunatapaukset', 'ihmisen tarkistus'],
    deliver: ['COMMIT', 'BUILD', 'CHECK', 'DEPLOY'],
  },
  ru: {
    artifact: 'ENGINEERING ARTIFACT',
    problem: ['ПОТРЕБНОСТЬ', 'БИЗНЕС-РЕЗУЛЬТАТ', 'КРИТЕРИЙ'],
    context: ['ДАННЫЕ', 'ОГРАНИЧЕНИЯ', 'РИСК'],
    route: ['CODE', 'API', 'RAG', 'LLM'],
    build: ['input = normalize(request)', 'result = service.run(input)', 'return verify(result)'],
    verify: ['поведение', 'edge cases', 'human review'],
    deliver: ['COMMIT', 'BUILD', 'CHECK', 'DEPLOY'],
  },
  uk: {
    artifact: 'ENGINEERING ARTIFACT',
    problem: ['ПОТРЕБА', 'БІЗНЕС-РЕЗУЛЬТАТ', 'КРИТЕРІЙ'],
    context: ['ДАНІ', 'ОБМЕЖЕННЯ', 'РИЗИК'],
    route: ['CODE', 'API', 'RAG', 'LLM'],
    build: ['input = normalize(request)', 'result = service.run(input)', 'return verify(result)'],
    verify: ['поведінка', 'edge cases', 'human review'],
    deliver: ['COMMIT', 'BUILD', 'CHECK', 'DEPLOY'],
  },
}

function StageArtifact({ step, copy }) {
  if (step === 0) {
    return (
      <div className="stageArtifact problemArtifact" aria-hidden="true">
        <div className="artifactTarget"><Target size={30}/><span/></div>
        <div className="artifactChip chipA">{copy.problem[0]}</div>
        <div className="artifactChip chipB">{copy.problem[1]}</div>
        <div className="artifactChip chipC">{copy.problem[2]}</div>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="stageArtifact contextArtifact" aria-hidden="true">
        <div className="contextCore"><Database size={22}/><strong>CTX</strong></div>
        {copy.context.map((label, index) => <span className={`contextNode contextNode${index + 1}`} key={label}>{label}</span>)}
        <i className="contextLine line1"/><i className="contextLine line2"/><i className="contextLine line3"/>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="stageArtifact routeArtifact" aria-hidden="true">
        <div className="routeSource"><Network size={21}/><span>TASK</span></div>
        <div className="routeRail"/>
        {copy.route.map((label, index) => <span className={`routeNode routeNode${index + 1}`} key={label}>{label}</span>)}
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="stageArtifact buildArtifact" aria-hidden="true">
        <div className="buildWindowTop"><i/><i/><i/><span>workflow.py</span></div>
        <div className="buildCode">
          {copy.build.map((line, index) => <p key={line}><span>{index + 1}</span><code>{line}</code></p>)}
        </div>
        <Code2 className="buildWatermark" size={62}/>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="stageArtifact verifyArtifact" aria-hidden="true">
        <div className="verifyShield"><ShieldCheck size={34}/></div>
        <div className="verifyRows">
          {copy.verify.map((label) => <div key={label}><Check size={14}/><span>{label}</span><i/></div>)}
        </div>
      </div>
    )
  }

  return (
    <div className="stageArtifact deliverArtifact" aria-hidden="true">
      <div className="deliveryBranch"><GitBranch size={21}/><span>main</span></div>
      <div className="deliveryPipeline">
        {copy.deliver.map((label, index) => <div key={label} className={index === copy.deliver.length - 1 ? 'last' : ''}><i>{index + 1}</i><span>{label}</span><b><Check size={11}/></b></div>)}
      </div>
    </div>
  )
}

export default function AICore({ t, lang = 'en' }) {
  const [activeStep, setActiveStep] = useState(0)
  const active = t.pipeline[activeStep]
  const copy = visualCopy[lang] || visualCopy.en

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

      <div className="processExperience">
        <div className="processList" role="list" aria-label={t.aiTitle}>
          {t.pipeline.map(([num, title], index) => (
            <button
              type="button"
              className={`processStep ${activeStep === index ? 'active' : ''}`}
              key={num}
              onMouseEnter={() => setActiveStep(index)}
              onFocus={() => setActiveStep(index)}
              onClick={() => setActiveStep(index)}
              aria-pressed={activeStep === index}
            >
              <span>{num}</span>
              <h3>{title}</h3>
              <ChevronRight size={16}/>
            </button>
          ))}
        </div>
        <div className="processDetail" aria-live="polite">
          <div className="artifactHeader"><span>{copy.artifact}</span><b>0{activeStep + 1} / 06</b></div>
          <StageArtifact step={activeStep} copy={copy}/>
          <div className="processDetailCopy">
            <span>{active?.[0]}</span>
            <h3>{active?.[1]}</h3>
            <p>{active?.[2]}</p>
          </div>
          <div className="detailLine"><i/><i/><i/><i/><i/><i/></div>
        </div>
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
            <div className="toolRow" key={name} tabIndex="0">
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
