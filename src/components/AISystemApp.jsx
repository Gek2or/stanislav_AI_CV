import {
  Activity,
  Bot,
  Braces,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Code2,
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
    system: 'AI SYSTEM APP', live: 'SYSTEM ONLINE', sound: 'Sound',
    overview: 'Interactive architecture', overviewCopy: 'Select a stage to inspect how a real task moves from problem definition to a reviewed, reusable result.',
    activeStage: 'Active stage', runtime: 'Runtime', controlled: 'Human-controlled', reusable: 'Reusable',
    pipelineTitle: 'Execution pipeline', pipelineCopy: 'A compact software-engineering loop for practical AI work.',
    routingTitle: 'Model routing', routingCopy: 'Choose the tool by task shape, not by brand loyalty.', selected: 'Selected route',
    evaluationTitle: 'Evaluation layer', evaluationCopy: 'Important output is checked before it becomes a business action.',
    quality: 'Quality gate', grounding: 'Grounding', review: 'Human review', fallback: 'Fallback path',
    signalsTitle: 'Live system signals', signalsCopy: 'Operating principles that stay visible throughout the workflow.',
    terminal: 'SYSTEM LOG', ready: 'ready', inspect: 'inspect', verified: 'verified',
  },
  fi: {
    tabs: ['Yleiskuva', 'Putki', 'Reititys', 'Arviointi', 'Signaalit'],
    system: 'AI SYSTEM APP', live: 'JÄRJESTELMÄ ONLINE', sound: 'Ääni',
    overview: 'Interaktiivinen arkkitehtuuri', overviewCopy: 'Valitse vaihe ja tarkastele, miten oikea tehtävä etenee ongelman määrittelystä tarkistettuun ja uudelleenkäytettävään tulokseen.',
    activeStage: 'Aktiivinen vaihe', runtime: 'Ajotapa', controlled: 'Ihmisen hallinnassa', reusable: 'Uudelleenkäytettävä',
    pipelineTitle: 'Suoritusputki', pipelineCopy: 'Tiivis ohjelmistokehityksen silmukka käytännön AI-työhön.',
    routingTitle: 'Mallien reititys', routingCopy: 'Valitse työkalu tehtävän rakenteen, ei brändiuskollisuuden perusteella.', selected: 'Valittu reitti',
    evaluationTitle: 'Arviointikerros', evaluationCopy: 'Tärkeä tulos tarkistetaan ennen kuin siitä tulee liiketoimintatoimi.',
    quality: 'Laatuportti', grounding: 'Lähteisiin sidonta', review: 'Ihmisen tarkistus', fallback: 'Varareitti',
    signalsTitle: 'Järjestelmän signaalit', signalsCopy: 'Toimintaperiaatteet pysyvät näkyvissä koko työnkulun ajan.',
    terminal: 'JÄRJESTELMÄLOKI', ready: 'valmis', inspect: 'tarkista', verified: 'varmistettu',
  },
  ru: {
    tabs: ['Обзор', 'Pipeline', 'Routing', 'Проверка', 'Сигналы'],
    system: 'AI SYSTEM APP', live: 'СИСТЕМА ONLINE', sound: 'Звук',
    overview: 'Интерактивная архитектура', overviewCopy: 'Выберите этап и посмотрите, как реальная задача проходит от постановки проблемы до проверенного и повторно используемого результата.',
    activeStage: 'Активный этап', runtime: 'Режим', controlled: 'Под контролем человека', reusable: 'Повторяемый',
    pipelineTitle: 'Исполняемый pipeline', pipelineCopy: 'Компактный software-engineering цикл для практической работы с AI.',
    routingTitle: 'Маршрутизация моделей', routingCopy: 'Инструмент выбирается под форму задачи, а не по привязанности к бренду.', selected: 'Выбранный маршрут',
    evaluationTitle: 'Слой проверки', evaluationCopy: 'Важный результат проверяется до того, как превращается в бизнес-действие.',
    quality: 'Quality gate', grounding: 'Grounding', review: 'Human review', fallback: 'Fallback path',
    signalsTitle: 'Системные сигналы', signalsCopy: 'Рабочие принципы остаются видимыми на всём протяжении процесса.',
    terminal: 'SYSTEM LOG', ready: 'готово', inspect: 'проверка', verified: 'подтверждено',
  },
  uk: {
    tabs: ['Огляд', 'Pipeline', 'Routing', 'Перевірка', 'Сигнали'],
    system: 'AI SYSTEM APP', live: 'СИСТЕМА ONLINE', sound: 'Звук',
    overview: 'Інтерактивна архітектура', overviewCopy: 'Оберіть етап і подивіться, як реальна задача проходить від визначення проблеми до перевіреного й повторно використовуваного результату.',
    activeStage: 'Активний етап', runtime: 'Режим', controlled: 'Під контролем людини', reusable: 'Повторюваний',
    pipelineTitle: 'Виконавчий pipeline', pipelineCopy: 'Компактний software-engineering цикл для практичної роботи з AI.',
    routingTitle: 'Маршрутизація моделей', routingCopy: 'Інструмент обирається під форму задачі, а не через прив’язаність до бренду.', selected: 'Обраний маршрут',
    evaluationTitle: 'Шар перевірки', evaluationCopy: 'Важливий результат перевіряється до того, як стає бізнес-дією.',
    quality: 'Quality gate', grounding: 'Grounding', review: 'Human review', fallback: 'Fallback path',
    signalsTitle: 'Системні сигнали', signalsCopy: 'Робочі принципи залишаються видимими протягом усього процесу.',
    terminal: 'SYSTEM LOG', ready: 'готово', inspect: 'перевірка', verified: 'підтверджено',
  },
}

const tabIcons = [Layers3, Workflow, Route, ShieldCheck, Activity]
const stageIcons = [CircleGauge, Database, GitBranch, Code2, CheckCircle2]
const modelIcons = [Sparkles, Braces, MonitorUp, Activity, Bot, Layers3, Code2]

function tone(audioRef, enabled, type = 'tap') {
  if (!enabled || typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = audioRef.current || new AudioCtx()
    audioRef.current = ctx
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const now = ctx.currentTime
    const freq = type === 'confirm' ? 610 : type === 'route' ? 430 : 520
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.12, now + 0.06)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(type === 'confirm' ? 0.045 : 0.028, now + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.1)
  } catch {
    // Audio is an optional enhancement; the interface remains fully functional without it.
  }
}

export default function AISystemApp({ t, lang = 'en' }) {
  const copy = ui[lang] || ui.en
  const [tab, setTab] = useState(0)
  const [stage, setStage] = useState(0)
  const [model, setModel] = useState(0)
  const [sound, setSound] = useState(false)
  const audioRef = useRef(null)

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
              <div className="aiRouteMeta"><span><i/> task-fit</span><span><i/> compareable</span><span><i/> reviewable</span></div>
            </div>
          </div>
        </div>
      )
    }

    if (tab === 3) {
      const checks = [
        [copy.quality, '92%', 'Output matches task + constraints'],
        [copy.grounding, 'ON', 'Sources / context remain visible'],
        [copy.review, 'REQ', 'Important decisions stay human-reviewed'],
        [copy.fallback, 'READY', 'Second model or manual verification'],
      ]
      return (
        <div className="aiAppPanel aiEvaluationPanel">
          <div className="aiPanelHeading"><div><span>04 / EVALUATION</span><h3>{copy.evaluationTitle}</h3></div><p>{copy.evaluationCopy}</p></div>
          <div className="aiEvalGrid">
            {checks.map(([label, value, text], index) => <article key={label}><div className="aiEvalTop"><span>0{index + 1}</span><strong>{value}</strong></div><h4>{label}</h4><p>{text}</p><div className="aiEvalMeter"><i style={{ width: `${88 - index * 8}%` }}/></div></article>)}
          </div>
        </div>
      )
    }

    if (tab === 4) {
      return (
        <div className="aiAppPanel aiSignalsPanel">
          <div className="aiPanelHeading"><div><span>05 / SIGNALS</span><h3>{copy.signalsTitle}</h3></div><p>{copy.signalsCopy}</p></div>
          <div className="aiSignalGrid">
            {t.commandStatus.map((signal, index) => <article key={signal}><div className="aiSignalPulse"><i/><span>0{index + 1}</span></div><strong>{signal}</strong><small>{index % 2 === 0 ? 'continuous' : 'checkpoint'}</small></article>)}
          </div>
        </div>
      )
    }

    return (
      <div className="aiAppPanel aiOverviewPanel">
        <div className="aiPanelHeading"><div><span>01 / OVERVIEW</span><h3>{copy.overview}</h3></div><p>{copy.overviewCopy}</p></div>
        <div className="aiArchitecture">
          <div className="aiArchitectureMap">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className={stage === 0 ? 'active' : ''} d="M50 50 L17 19"/><path className={stage === 1 ? 'active' : ''} d="M50 50 L82 18"/><path className={stage === 2 ? 'active' : ''} d="M50 50 L91 58"/><path className={stage === 3 ? 'active' : ''} d="M50 50 L64 87"/><path className={stage === 4 ? 'active' : ''} d="M50 50 L15 74"/>
            </svg>
            <div className="aiCore"><div className="aiCoreRing"/><Sparkles size={20}/><strong>SK</strong><span>AI SYSTEM</span></div>
            {stages.map(([num, title], index) => { const Icon = stageIcons[index] || Activity; return <button key={num} className={`aiStage aiStage${index + 1} ${stage === index ? 'active' : ''}`} onClick={() => selectStage(index)}><Icon size={15}/><span>{num}</span><strong>{title}</strong></button> })}
          </div>
          <div className="aiStageInspector">
            <div className="aiInspectorTop"><span>{copy.activeStage}</span><strong>{activeStage?.[0]}</strong></div>
            <h4>{activeStage?.[1]}</h4><p>{activeStage?.[2]}</p>
            <div className="aiInspectorStats"><div><span>{copy.runtime}</span><strong>{copy.controlled}</strong></div><div><span>OUTPUT</span><strong>{copy.reusable}</strong></div></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <aside className="aiSystemApp" aria-label="Interactive AI System App">
      <div className="aiAppTopbar">
        <div className="aiAppIdentity"><div className="aiAppLogo"><Sparkles size={17}/></div><div><span>{copy.system}</span><strong>Stanislav / Engineering Workbench</strong></div></div>
        <div className="aiAppControls"><span className="aiLive"><i/>{copy.live}</span><button className={sound ? 'active' : ''} onClick={() => { setSound((v) => !v); if (!sound) setTimeout(() => tone(audioRef, true, 'confirm'), 0) }} aria-pressed={sound} title={`${copy.sound}: ${sound ? 'On' : 'Off'}`}>{sound ? <Volume2 size={16}/> : <VolumeX size={16}/>}<span>{copy.sound}</span></button></div>
      </div>

      <div className="aiAppTabs" role="tablist" aria-label="AI System sections">
        {copy.tabs.map((label, index) => { const Icon = tabIcons[index]; return <button key={label} role="tab" aria-selected={tab === index} className={tab === index ? 'active' : ''} onClick={() => switchTab(index)}><Icon size={15}/><span>{label}</span></button> })}
      </div>

      <div className="aiAppViewport">{panel()}</div>

      <div className="aiAppConsole">
        <div className="aiConsoleLabel"><span className="aiConsoleDot"/>{copy.terminal}</div>
        <div className="aiConsoleLines"><span><b>system</b> {copy.ready}</span><span><b>stage</b> {activeStage?.[1]}</span><span><b>route</b> {activeModel?.[0]}</span><span><b>review</b> {copy.verified}</span></div>
      </div>
    </aside>
  )
}
