import {
  Activity,
  Bot,
  Boxes,
  Braces,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers3,
  MonitorUp,
  Route,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  Workflow,
} from 'lucide-react'
import { useMemo, useRef, useState } from 'react'

const ui = {
  en: {
    tabs: ['Overview', 'Pipeline', 'Routing', 'Evaluation', 'Signals'],
    system: 'AI ENGINEERING CONSOLE', live: 'SYSTEM ONLINE', sound: 'Sound', mode: '3D WORKBENCH',
    overview: 'Interactive system architecture', overviewCopy: 'Inspect the engineering path from a real problem to a reviewed, reusable software or AI workflow.',
    activeStage: 'Active stage', runtime: 'Control mode', controlled: 'Human-controlled', reusable: 'Reusable output',
    pipelineTitle: 'Execution pipeline', pipelineCopy: 'A compact build loop: understand, structure, route, implement, evaluate and reuse.',
    routingTitle: 'Model and tool routing', routingCopy: 'Select the tool by task shape and constraints instead of forcing every job through one model.', selected: 'Selected route',
    evaluationTitle: 'Evaluation and guardrails', evaluationCopy: 'Important output is checked before it becomes a business action or reusable workflow.',
    quality: 'Task fit', grounding: 'Grounding', review: 'Human review', fallback: 'Fallback path',
    signalsTitle: 'Operational signals', signalsCopy: 'Principles that remain visible while the workflow moves through the system.',
    terminal: 'SYSTEM LOG', ready: 'ready', verified: 'review path active', stack: 'ENGINEERING STACK',
  },
  fi: {
    tabs: ['Yleiskuva', 'Putki', 'Reititys', 'Arviointi', 'Signaalit'],
    system: 'AI ENGINEERING CONSOLE', live: 'JÄRJESTELMÄ ONLINE', sound: 'Ääni', mode: '3D WORKBENCH',
    overview: 'Interaktiivinen järjestelmäarkkitehtuuri', overviewCopy: 'Tarkastele polkua todellisesta ongelmasta tarkistettuun ja uudelleenkäytettävään ohjelmisto- tai AI-työnkulkuun.',
    activeStage: 'Aktiivinen vaihe', runtime: 'Ohjaustapa', controlled: 'Ihmisen hallinnassa', reusable: 'Uudelleenkäytettävä tulos',
    pipelineTitle: 'Suoritusputki', pipelineCopy: 'Tiivis rakentamisen silmukka: ymmärrä, jäsennä, reititä, toteuta, arvioi ja käytä uudelleen.',
    routingTitle: 'Mallien ja työkalujen reititys', routingCopy: 'Työkalu valitaan tehtävän rakenteen ja rajojen perusteella yhden mallin pakottamisen sijaan.', selected: 'Valittu reitti',
    evaluationTitle: 'Arviointi ja suojaukset', evaluationCopy: 'Tärkeä tulos tarkistetaan ennen liiketoimintatoimea tai uudelleenkäytettävää työnkulkua.',
    quality: 'Tehtäväsopivuus', grounding: 'Lähteisiin sidonta', review: 'Ihmisen tarkistus', fallback: 'Varareitti',
    signalsTitle: 'Operatiiviset signaalit', signalsCopy: 'Periaatteet pysyvät näkyvissä koko työnkulun ajan.',
    terminal: 'JÄRJESTELMÄLOKI', ready: 'valmis', verified: 'tarkistuspolku aktiivinen', stack: 'ENGINEERING STACK',
  },
  ru: {
    tabs: ['Обзор', 'Pipeline', 'Routing', 'Проверка', 'Сигналы'],
    system: 'AI ENGINEERING CONSOLE', live: 'СИСТЕМА ONLINE', sound: 'Звук', mode: '3D WORKBENCH',
    overview: 'Интерактивная архитектура системы', overviewCopy: 'Посмотрите путь от реальной задачи до проверенного и повторно используемого software- или AI-процесса.',
    activeStage: 'Активный этап', runtime: 'Режим контроля', controlled: 'Под контролем человека', reusable: 'Повторно используемый результат',
    pipelineTitle: 'Исполняемый pipeline', pipelineCopy: 'Компактный цикл: понять, структурировать, выбрать маршрут, реализовать, проверить и переиспользовать.',
    routingTitle: 'Маршрутизация моделей и инструментов', routingCopy: 'Инструмент выбирается под задачу и ограничения, а не потому что всё нужно проводить через одну модель.', selected: 'Выбранный маршрут',
    evaluationTitle: 'Проверка и guardrails', evaluationCopy: 'Важный результат проверяется до того, как становится бизнес-действием или повторяемым workflow.',
    quality: 'Соответствие задаче', grounding: 'Grounding', review: 'Human review', fallback: 'Fallback path',
    signalsTitle: 'Операционные сигналы', signalsCopy: 'Рабочие принципы остаются видимыми на всём протяжении процесса.',
    terminal: 'SYSTEM LOG', ready: 'готово', verified: 'review path active', stack: 'ENGINEERING STACK',
  },
  uk: {
    tabs: ['Огляд', 'Pipeline', 'Routing', 'Перевірка', 'Сигнали'],
    system: 'AI ENGINEERING CONSOLE', live: 'СИСТЕМА ONLINE', sound: 'Звук', mode: '3D WORKBENCH',
    overview: 'Інтерактивна архітектура системи', overviewCopy: 'Подивіться шлях від реальної задачі до перевіреного й повторно використовуваного software- або AI-процесу.',
    activeStage: 'Активний етап', runtime: 'Режим контролю', controlled: 'Під контролем людини', reusable: 'Повторно використовуваний результат',
    pipelineTitle: 'Виконавчий pipeline', pipelineCopy: 'Компактний цикл: зрозуміти, структурувати, обрати маршрут, реалізувати, перевірити та повторно використати.',
    routingTitle: 'Маршрутизація моделей та інструментів', routingCopy: 'Інструмент обирається під задачу та обмеження, а не через прив’язку до однієї моделі.', selected: 'Обраний маршрут',
    evaluationTitle: 'Перевірка та guardrails', evaluationCopy: 'Важливий результат перевіряється до того, як стає бізнес-дією або повторюваним workflow.',
    quality: 'Відповідність задачі', grounding: 'Grounding', review: 'Human review', fallback: 'Fallback path',
    signalsTitle: 'Операційні сигнали', signalsCopy: 'Робочі принципи залишаються видимими протягом усього процесу.',
    terminal: 'SYSTEM LOG', ready: 'готово', verified: 'review path active', stack: 'ENGINEERING STACK',
  },
}

const tabIcons = [Layers3, Workflow, Route, ShieldCheck, Activity]
const stageIcons = [CircleGauge, Database, GitBranch, Code2, CheckCircle2]
const modelIcons = [Sparkles, Braces, MonitorUp, Activity, Bot, Layers3, Code2]
const buildStack = ['React', 'Vite', 'Python', 'REST API', 'GitHub', 'CI/CD']

function tone(audioRef, enabled, type = 'tap') {
  if (!enabled || typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = audioRef.current || new AudioCtx()
    audioRef.current = ctx
    if (ctx.state === 'suspended') ctx.resume()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const now = ctx.currentTime
    const freq = type === 'confirm' ? 610 : type === 'route' ? 430 : 520
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.12, now + 0.055)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(type === 'confirm' ? 0.034 : 0.022, now + 0.007)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.095)
  } catch {
    // Sound is optional. The engineering console remains fully functional without it.
  }
}

export default function AISystemApp({ t, lang = 'en' }) {
  const copy = ui[lang] || ui.en
  const [tab, setTab] = useState(0)
  const [stage, setStage] = useState(0)
  const [model, setModel] = useState(0)
  const [sound, setSound] = useState(false)
  const audioRef = useRef(null)
  const appRef = useRef(null)

  const stages = useMemo(() => t.pipeline.slice(0, 5), [t.pipeline])
  const models = useMemo(() => t.models.slice(0, 7), [t.models])
  const activeStage = stages[stage] || stages[0]
  const activeModel = models[model] || models[0]

  const switchTab = (index) => {
    setTab(index)
    tone(audioRef, sound, 'tap')
  }

  const selectStage = (index) => {
    setStage(index)
    tone(audioRef, sound, 'confirm')
  }

  const selectModel = (index) => {
    setModel(index)
    tone(audioRef, sound, 'route')
  }

  const move3d = (event) => {
    const target = appRef.current
    if (!target || event.pointerType === 'touch') return
    const rect = target.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const ry = (x - 0.5) * 7
    const rx = (0.5 - y) * 5
    target.style.setProperty('--app-rx', `${rx.toFixed(2)}deg`)
    target.style.setProperty('--app-ry', `${ry.toFixed(2)}deg`)
    target.style.setProperty('--app-x', `${(x * 100).toFixed(1)}%`)
    target.style.setProperty('--app-y', `${(y * 100).toFixed(1)}%`)
  }

  const reset3d = () => {
    const target = appRef.current
    if (!target) return
    target.style.setProperty('--app-rx', '0deg')
    target.style.setProperty('--app-ry', '0deg')
    target.style.setProperty('--app-x', '70%')
    target.style.setProperty('--app-y', '18%')
  }

  const panel = () => {
    if (tab === 1) {
      return (
        <div className="aiAppPanel aiPipelinePanel">
          <div className="aiPanelHeading"><div><span>02 / PIPELINE</span><h3>{copy.pipelineTitle}</h3></div><p>{copy.pipelineCopy}</p></div>
          <div className="aiPipelineTrack">
            {t.pipeline.map(([num, title, text], index) => (
              <button key={num} className={index === stage ? 'active' : ''} onClick={() => selectStage(Math.min(index, 4))}>
                <span className="aiPipeNum">{num}</span><span className="aiPipeDot"/><strong>{title}</strong><small>{text}</small>
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (tab === 2) {
      return (
        <div className="aiAppPanel aiRoutingPanel">
          <div className="aiPanelHeading"><div><span>03 / ROUTING</span><h3>{copy.routingTitle}</h3></div><p>{copy.routingCopy}</p></div>
          <div className="aiRoutingLayout">
            <div className="aiModelRail">
              {models.map(([name], index) => {
                const Icon = modelIcons[index] || Bot
                return <button key={name} className={index === model ? 'active' : ''} onClick={() => selectModel(index)}><Icon size={16}/><span>{name}</span><ChevronRight size={14}/></button>
              })}
            </div>
            <div className="aiRouteDetail">
              <span>{copy.selected}</span>
              <div className="aiRouteIcon">{(() => { const Icon = modelIcons[model] || Bot; return <Icon size={22}/> })()}</div>
              <h4>{activeModel?.[0]}</h4>
              <p>{activeModel?.[1]}</p>
              <div className="aiRouteMeta"><span><i/> task-fit</span><span><i/> comparable</span><span><i/> reviewable</span></div>
            </div>
          </div>
        </div>
      )
    }

    if (tab === 3) {
      const checks = [
        [copy.quality, 'PASS', 'Output is checked against task, context and constraints.'],
        [copy.grounding, 'ON', 'Source material or supplied context remains visible where needed.'],
        [copy.review, 'REQ', 'Important decisions and final business actions remain human-reviewed.'],
        [copy.fallback, 'READY', 'A second model, code path or manual verification can be used.'],
      ]
      return (
        <div className="aiAppPanel aiEvaluationPanel">
          <div className="aiPanelHeading"><div><span>04 / EVALUATION</span><h3>{copy.evaluationTitle}</h3></div><p>{copy.evaluationCopy}</p></div>
          <div className="aiEvalGrid">
            {checks.map(([label, value, text], index) => (
              <article key={label}>
                <div className="aiEvalTop"><span>0{index + 1}</span><strong>{value}</strong></div>
                <h4>{label}</h4><p>{text}</p><div className="aiEvalMeter"><i style={{ width: `${88 - index * 7}%` }}/></div>
              </article>
            ))}
          </div>
        </div>
      )
    }

    if (tab === 4) {
      return (
        <div className="aiAppPanel aiSignalsPanel">
          <div className="aiPanelHeading"><div><span>05 / SIGNALS</span><h3>{copy.signalsTitle}</h3></div><p>{copy.signalsCopy}</p></div>
          <div className="aiSignalGrid">
            {t.commandStatus.map((signal, index) => (
              <article key={signal}><div className="aiSignalPulse"><i/><span>0{index + 1}</span></div><strong>{signal}</strong><small>{index % 2 === 0 ? 'continuous' : 'checkpoint'}</small></article>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="aiAppPanel aiOverviewPanel">
        <div className="aiPanelHeading"><div><span>01 / OVERVIEW</span><h3>{copy.overview}</h3></div><p>{copy.overviewCopy}</p></div>
        <div className="aiArchitecture">
          <div className="aiArchitectureMap aiArchitecture3d">
            <div className="aiDepthPlane aiDepthBack" aria-hidden="true" />
            <div className="aiDepthPlane aiDepthMid" aria-hidden="true" />
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className={stage === 0 ? 'active' : ''} d="M50 50 L17 19"/><path className={stage === 1 ? 'active' : ''} d="M50 50 L82 18"/><path className={stage === 2 ? 'active' : ''} d="M50 50 L91 58"/><path className={stage === 3 ? 'active' : ''} d="M50 50 L64 87"/><path className={stage === 4 ? 'active' : ''} d="M50 50 L15 74"/>
            </svg>
            <div className="aiCore"><div className="aiCoreRing"/><Cpu size={20}/><strong>SK</strong><span>AI SYSTEM</span></div>
            {stages.map(([num, title], index) => {
              const Icon = stageIcons[index] || Activity
              return <button key={num} className={`aiStage aiStage${index + 1} ${stage === index ? 'active' : ''}`} onClick={() => selectStage(index)}><Icon size={15}/><span>{num}</span><strong>{title}</strong></button>
            })}
          </div>
          <div className="aiStageInspector">
            <div className="aiInspectorTop"><span>{copy.activeStage}</span><strong>{activeStage?.[0]}</strong></div>
            <div className="aiInspectorIcon"><Boxes size={20}/></div>
            <h4>{activeStage?.[1]}</h4><p>{activeStage?.[2]}</p>
            <div className="aiInspectorStats"><div><span>{copy.runtime}</span><strong>{copy.controlled}</strong></div><div><span>OUTPUT</span><strong>{copy.reusable}</strong></div></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="aiSystemPerspective">
      <aside
        className="aiSystemApp aiSystemApp3d"
        aria-label="Interactive AI engineering console"
        ref={appRef}
        onPointerMove={move3d}
        onPointerLeave={reset3d}
      >
        <div className="aiAppSpecular" aria-hidden="true" />
        <div className="aiAppTopbar">
          <div className="aiAppIdentity">
            <div className="aiAppLogo"><Sparkles size={17}/></div>
            <div><span>{copy.system}</span><strong>Stanislav / Engineering Workbench</strong></div>
          </div>
          <div className="aiAppControls">
            <span className="aiMode"><Boxes size={14}/>{copy.mode}</span>
            <span className="aiLive"><i/>{copy.live}</span>
            <button className={sound ? 'active' : ''} onClick={() => { setSound((v) => !v); if (!sound) setTimeout(() => tone(audioRef, true, 'confirm'), 0) }} aria-pressed={sound} title={`${copy.sound}: ${sound ? 'On' : 'Off'}`}>
              {sound ? <Volume2 size={16}/> : <VolumeX size={16}/>}<span>{copy.sound}</span>
            </button>
          </div>
        </div>

        <div className="aiAppTabs" role="tablist" aria-label="AI System sections">
          {copy.tabs.map((label, index) => {
            const Icon = tabIcons[index]
            return <button key={label} role="tab" aria-selected={tab === index} className={tab === index ? 'active' : ''} onClick={() => switchTab(index)}><Icon size={15}/><span>{label}</span></button>
          })}
        </div>

        <div className="aiAppViewport">{panel()}</div>

        <div className="aiStackRail" aria-label={copy.stack}>
          <span>{copy.stack}</span>
          <div>{buildStack.map((item) => <b key={item}>{item}</b>)}</div>
        </div>

        <div className="aiAppConsole">
          <div className="aiConsoleLabel"><span className="aiConsoleDot"/>{copy.terminal}</div>
          <div className="aiConsoleLines"><span><b>system</b> {copy.ready}</span><span><b>stage</b> {activeStage?.[1]}</span><span><b>route</b> {activeModel?.[0]}</span><span><b>review</b> {copy.verified}</span></div>
        </div>
      </aside>
    </div>
  )
}
