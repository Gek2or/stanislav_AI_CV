import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SoundProvider } from './sound/SoundProviderV2.jsx'
import './styles.css'
import './ai-system.css'
import './pro-polish.css'
import './three-d.css'
import './three-d-runtime.css'
import './reference-flow.css'
import './reference-deck.css'
import './reference-hero.css'
import './role-targeting.css'
import './engineering-artifacts.css'
import './sound.css'
import './ai-map-fixes.css'
import './conviction-polish.css'

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', background: '#071018', color: '#f4f8fb', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ color: '#65e6a6', fontWeight: 800, letterSpacing: '.08em' }}>STANISLAV KOSYTSKYY</p>
            <h1 style={{ fontSize: 'clamp(2.6rem, 10vw, 5.5rem)', lineHeight: .95, margin: '18px 0' }}>AI Software Engineer</h1>
            <p style={{ color: '#9db2c1', lineHeight: 1.7 }}>The interactive portfolio could not start correctly in this browser. Please reopen the page in Chrome, Safari or another full browser.</p>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <SoundProvider>
        <App />
      </SoundProvider>
    </AppErrorBoundary>
  </StrictMode>,
)
