import { ArrowDownRight, Braces, ShieldCheck, Workflow } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero({ t }) {
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((value) => (value + 1) % t.commandStatus.length)
    }, 2300)
    return () => clearInterval(timer)
  }, [t.commandStatus])

  return (
    <section className="hero sectionShell" id="top">
      <div className="heroCopy">
        <div className="rolePill"><span className="pulseDot" />{t.target}</div>
        <p className="overline">STANISLAV KOSYTSKYY</p>
        <h1>{t.role}</h1>
        <p className="heroLead">{t.hero}</p>
        <p className="heroSecondary">{t.heroSecondary}</p>
        <div className="heroActions">
          <a className="primaryButton" href="#ai-core">{t.ctaPrimary}<ArrowDownRight size={18} /></a>
          <a className="secondaryButton" href="#bitonet">{t.ctaSecondary}</a>
        </div>
      </div>

      <div className="commandPanel glassPanel">
        <div className="windowBar">
          <div className="windowDots"><i/><i/><i/></div>
          <span>{t.commandTitle}</span>
          <span className="liveTag"><span />LIVE</span>
        </div>
        <div className="commandBody">
          <div className="terminalLine"><span>&gt; active_task:</span> <strong>{t.commandStatus[statusIndex]}</strong></div>
          <div className="metricGrid">
            <div><Braces size={18}/><span>MODE</span><strong>multi-model</strong></div>
            <div><ShieldCheck size={18}/><span>REVIEW</span><strong>human-in-loop</strong></div>
            <div><Workflow size={18}/><span>OUTPUT</span><strong>reusable workflow</strong></div>
          </div>
          <div className="signalBlock">
            <span>problem</span><b>→</b><span>context</span><b>→</b><span>model</span><b>→</b><span>code</span><b>→</b><span>eval</span>
          </div>
          <div className="codeSnippet">
            <span className="codeMuted">// my default mindset</span>
            <br/><span className="codeKey">if</span> (task.is_repetitive) {'{'}
            <br/> &nbsp;&nbsp;question(process);
            <br/> &nbsp;&nbsp;prototype(solution);
            <br/> &nbsp;&nbsp;verify(output);
            <br/>{'}'}
          </div>
        </div>
      </div>
    </section>
  )
}
