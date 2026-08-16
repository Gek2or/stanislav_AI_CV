import { useEffect, useRef } from 'react'

const nodes = [
  ['API', 'nodeApi'],
  ['LLM', 'nodeLlm'],
  ['RAG', 'nodeRag'],
  ['PY', 'nodePy'],
  ['GIT', 'nodeGit'],
  ['CI', 'nodeCi'],
]

export default function TechBackdrop3D() {
  const sceneRef = useRef(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || typeof window === 'undefined') return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduced) return

    let frame = 0
    const updatePointer = (event) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2
        const y = (event.clientY / window.innerHeight - 0.5) * 2
        scene.style.setProperty('--scene-x', x.toFixed(3))
        scene.style.setProperty('--scene-y', y.toFixed(3))
      })
    }

    const updateScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      scene.style.setProperty('--scene-scroll', Math.min(window.scrollY / max, 1).toFixed(3))
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])

  return (
    <div className="tech3dScene" ref={sceneRef} aria-hidden="true">
      <div className="tech3dWorld">
        <div className="tech3dGridPlane" />
        <div className="tech3dGlow tech3dGlowA" />
        <div className="tech3dGlow tech3dGlowB" />

        <div className="tech3dRack rackOne">
          <span>RUNTIME</span>
          <i/><i/><i/><i/><i/>
        </div>
        <div className="tech3dRack rackTwo">
          <span>DATA</span>
          <i/><i/><i/><i/>
        </div>

        <div className="tech3dPlane planeCode">
          <div className="planeHeader"><span>BUILD</span><b>01</b></div>
          <div className="codeRows"><i/><i/><i/><i/><i/></div>
          <small>software → API → AI</small>
        </div>

        <div className="tech3dPlane planeDeploy">
          <div className="planeHeader"><span>DELIVERY</span><b>02</b></div>
          <div className="deployPulse"><i/><i/><i/></div>
          <small>git / CI / deploy</small>
        </div>

        <div className="tech3dPlane planeReview">
          <div className="planeHeader"><span>VERIFY</span><b>03</b></div>
          <div className="reviewBars"><i/><i/><i/></div>
          <small>human review</small>
        </div>

        <svg className="tech3dLinks" viewBox="0 0 1000 650" preserveAspectRatio="none">
          <path d="M140 165 C360 60 610 180 825 108"/>
          <path d="M195 465 C380 330 570 410 840 330"/>
          <path d="M370 90 C445 220 530 235 650 505"/>
          <path d="M88 355 C300 390 565 258 932 475"/>
        </svg>

        <div className="tech3dNodeCore"><span>SK</span><small>ENGINEERING</small></div>
        {nodes.map(([label, className], index) => (
          <div className={`tech3dNode ${className}`} key={label}>
            <i/>
            <span>{label}</span>
            <small>0{index + 1}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
