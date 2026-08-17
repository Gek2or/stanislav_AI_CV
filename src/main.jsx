import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './editorial.css'

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
        <main style={{ minHeight: '100vh', background: '#111315', color: '#f3f4f1', padding: '40px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ color: '#98ad9a', fontWeight: 700, letterSpacing: '.08em' }}>STANISLAV KOSYTSKYY</p>
            <h1 style={{ fontSize: 'clamp(2.4rem, 9vw, 4.8rem)', lineHeight: 1, margin: '18px 0' }}>Practical software for real work.</h1>
            <p style={{ color: '#a6aaa7', lineHeight: 1.7 }}>The portfolio could not start correctly in this browser. Please reopen the page in Chrome, Safari or another full browser.</p>
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
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
