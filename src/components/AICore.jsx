import { Bot, CheckCircle2, ChevronRight, Code2, GitBranch, TerminalSquare, WandSparkles, Workflow } from 'lucide-react'
import { useState } from 'react'

const devCopy = {
  en: {
    eyebrow: 'DEVELOPER TOOLCHAIN',
    title: 'Modern coding environments and engineering agents',
    intro: 'Tools I use or actively explore for implementation, debugging, repository work and agent-assisted development. They support the workflow; they do not replace review, testing or engineering judgment.',
    status: 'USE / EXPLORE',
  },
  fi: {
    eyebrow: 'KEHITTÄJÄTYÖKALUT',
    title: 'Nykyaikaiset koodiympäristöt ja engineering-agentit',
    intro: 'Työkalut, joita käytän tai tutkin aktiivisesti toteutukseen, virheiden selvitykseen, repositoriotyöhön ja agenttiavusteiseen kehitykseen. Ne tukevat prosessia, mutta eivät korvaa tarkistusta, testausta tai insinöörin harkintaa.',
    status: 'KÄYTÄN / TUTKIN',
  },
  ru: {
    eyebrow: 'DEVELOPER TOOLCHAIN',
    title: 'Современные coding environments и engineering agents',
    intro: 'Инструменты, которые я использую или активно изучаю для реализации, debugging, работы с репозиториями и agent-assisted development. Они усиливают процесс, но не заменяют review, тестирование и инженерное решение.',
    status: 'ИСПОЛЬЗУЮ / ИЗУЧАЮ',
  },
  uk: {
    eyebrow: 'DEVELOPER TOOLCHAIN',
    title: 'Сучасні coding environments та engineering agents',
    intro: 'Інструменти, які я використовую або активно досліджую для реалізації, debugging, роботи з репозиторіями та agent-assisted development. Вони підсилюють процес, але не замінюють review, тестування та інженерне рішення.',
    status: 'ВИКОРИСТОВУЮ / ВИВЧАЮ',
  },
}

const devTools = [
  ['Visual Studio Code + GitHub Copilot', 'Editor + inline assistance, agent mode, code navigation and repository-aware implementation.', Code2],
  ['Cursor', 'AI-first code editor for codebase-aware edits, natural-language changes and fast iteration.', WandSparkles],
  ['OpenAI Codex', 'Coding agent for repository changes, implementation tasks, refactors, tests and command execution.', TerminalSquare],
  ['Claude Code', 'Terminal-based coding agent for understanding projects, editing files and multi-step engineering work.', TerminalSquare],
  ['JetBrains AI / Junie', 'IDE-integrated AI assistance and autonomous coding-agent workflows across JetBrains environments.', Code2],
  ['Zed', 'Fast collaborative editor with built-in agentic workflows and parallel AI-assisted development.', Code2],
  ['GitHub + Actions', 'Version control, reviewable changes, CI/CD workflows and deployment automation.', GitBranch],
  ['Vite + React workflow', 'Fast frontend development, component-driven implementation and production builds.', Workflow],
]

export default function AICore({ t, lang = 'en' }) {
  const [activeStep, setActiveStep] = useState(0)
  const active = t.pipeline[activeStep]
  const copy = devCopy[lang] || devCopy.en

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
          <span>{active?.[0]}</span>
          <h3>{active?.[1]}</h3>
          <p>{active?.[2]}</p>
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

      <div className="developerStackBlock">
        <div className="developerStackIntro">
          <p className="overline">{copy.eyebrow}</p>
          <h3>{copy.title}</h3>
          <p>{copy.intro}</p>
        </div>
        <div className="developerToolGrid">
          {devTools.map(([name, description, Icon], index) => (
            <article className="developerToolCard" key={name} tabIndex="0">
              <div className="developerToolTop">
                <span className="developerToolIndex">0{index + 1}</span>
                <Icon size={18}/>
              </div>
              <h4>{name}</h4>
              <p>{description}</p>
              <span className="developerToolStatus"><i/>{copy.status}</span>
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
