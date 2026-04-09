import { useState, useRef } from 'react'
import Hero from './components/Hero'
import ProfileInput from './components/ProfileInput'
import Settings from './components/Settings'
import Loading from './components/Loading'
import Results from './components/Results'
import { useAnalysis } from './hooks/useAnalysis'
import { t } from './i18n'

const DEFAULT_SETTINGS = {
  provider: 'mock',
  apiKey: '',
  model: '',
  baseUrl: '',
}

function loadSettings() {
  try {
    const saved = localStorage.getItem('profilelens-settings')
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
  } catch {}
  return DEFAULT_SETTINGS
}

function saveSettings(s) {
  try {
    localStorage.setItem('profilelens-settings', JSON.stringify(s))
  } catch {}
}

function loadLang() {
  try {
    return localStorage.getItem('profilelens-lang') || 'pt'
  } catch {}
  return 'pt'
}

export default function App() {
  const [screen, setScreen] = useState('hero')
  const [settings, setSettings] = useState(loadSettings)
  const [showSettings, setShowSettings] = useState(false)
  const [lang, setLang] = useState(loadLang)
  const [analysisDone, setAnalysisDone] = useState(false)
  const { analyze, result, error } = useAnalysis()

  const lastProfileText = useRef('')
  const langRef = useRef(loadLang())
  const analysisCounter = useRef(0)

  const handleLangChange = async (newLang) => {
    setLang(newLang)
    langRef.current = newLang
    try { localStorage.setItem('profilelens-lang', newLang) } catch {}
    if ((screen === 'results' || screen === 'loading') && lastProfileText.current) {
      const myId = ++analysisCounter.current
      setAnalysisDone(false)
      setScreen('loading')
      try {
        await analyze(lastProfileText.current, settings, newLang)
        if (analysisCounter.current === myId) {
          setAnalysisDone(true)
          await new Promise((r) => setTimeout(r, 600))
          if (analysisCounter.current === myId) setScreen('results')
        }
      } catch {
        if (analysisCounter.current === myId) {
          setScreen('results')
        }
      }
    }
  }

  const handleSettingsChange = (s) => {
    setSettings(s)
    saveSettings(s)
  }

  const handleAnalyze = async (profileText) => {
    lastProfileText.current = profileText
    const myId = ++analysisCounter.current
    const currentLang = langRef.current
    setAnalysisDone(false)
    setScreen('loading')
    try {
      await analyze(profileText, settings, currentLang)
      if (analysisCounter.current === myId) {
        setAnalysisDone(true)
        await new Promise((r) => setTimeout(r, 600))
        if (analysisCounter.current === myId) setScreen('results')
      }
    } catch {
      if (analysisCounter.current === myId) {
        setScreen('input')
      }
    }
  }

  const handleReset = () => {
    setScreen('input')
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="logo" onClick={() => setScreen('hero')}>
          <span className="logo-icon-wrap"><span>P</span></span>
          ProfileLens
        </button>
        <div className="nav-actions">
          <button
            className="settings-btn"
            onClick={() => setShowSettings(!showSettings)}
            title={t(lang, 'settings')}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            {t(lang, 'settings')}
          </button>
          {screen === 'hero' && (
            <button className="nav-cta" onClick={() => setScreen('input')}>
              {lang === 'pt' ? 'Analisar gratis' : 'Analyze free'}
            </button>
          )}
        </div>
      </header>

      {showSettings && (
        <Settings
          settings={settings}
          onChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
          lang={lang}
        />
      )}

      <main className="main">
        {screen === 'hero' && <Hero onStart={() => setScreen('input')} lang={lang} />}
        {screen === 'input' && (
          <ProfileInput
            onAnalyze={handleAnalyze}
            onBack={() => setScreen('hero')}
            error={error}
            provider={settings.provider}
            lang={lang}
          />
        )}
        {screen === 'loading' && <Loading lang={lang} done={analysisDone} />}
        {screen === 'results' && result && (
          <Results data={result} onReset={handleReset} lang={lang} />
        )}
      </main>

      <button
        className="lang-toggle"
        onClick={() => handleLangChange(lang === 'pt' ? 'en' : 'pt')}
        title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      >
        {lang === 'pt' ? (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <clipPath id="flagClip"><circle cx="12" cy="12" r="11"/></clipPath>
            <g clipPath="url(#flagClip)">
              <rect width="24" height="24" fill="#009739"/>
              <path d="M12 3L22 12L12 21L2 12Z" fill="#FEDD00"/>
              <circle cx="12" cy="12" r="4" fill="#012169"/>
            </g>
            <circle cx="12" cy="12" r="11" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <clipPath id="flagClip2"><circle cx="12" cy="12" r="11"/></clipPath>
            <g clipPath="url(#flagClip2)">
              <rect width="24" height="24" fill="#B22234"/>
              <rect y="1.8" width="24" height="1.8" fill="white"/><rect y="5.5" width="24" height="1.8" fill="white"/>
              <rect y="9.2" width="24" height="1.8" fill="white"/><rect y="12.9" width="24" height="1.8" fill="white"/>
              <rect y="16.5" width="24" height="1.8" fill="white"/><rect y="20.2" width="24" height="1.8" fill="white"/>
              <rect width="10" height="13" fill="#3C3B6E"/>
            </g>
            <circle cx="12" cy="12" r="11" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          </svg>
        )}
      </button>

      <footer className="footer">
        <p>
          {t(lang, 'madeBy')}{' '}
          <a href="https://www.linkedin.com/in/lukefrancischini" target="_blank" rel="noopener noreferrer" className="footer-link">
            <strong>Luke Francischini</strong>
          </a>
          {' · '}{t(lang, 'privacy')}
        </p>
      </footer>
    </div>
  )
}
