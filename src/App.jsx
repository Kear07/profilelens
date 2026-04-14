import { useState, useRef, useEffect } from 'react'
import Hero from './components/Hero'
import ProfileInput from './components/ProfileInput'
import Settings from './components/Settings'
import Loading from './components/Loading'
import Results from './components/Results'
import { useAnalysis } from './hooks/useAnalysis'
import { t } from './i18n'
import { getCount, incrementCount } from './services/counter'

const DEFAULT_SETTINGS = {
  provider: 'mock',
  apiKey: '',
  model: '',
  baseUrl: '',
}

function loadSettings() {
  try {
    const saved = sessionStorage.getItem('profilelens-settings')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Never restore apiKey from storage — require re-entry each session
      return { ...DEFAULT_SETTINGS, ...parsed, apiKey: '' }
    }
  } catch { /* storage unavailable */ }
  return DEFAULT_SETTINGS
}

function saveSettings(s) {
  try {
    // Persist provider/model/baseUrl but NEVER the apiKey
    const { apiKey: _apiKey, ...safe } = s
    sessionStorage.setItem('profilelens-settings', JSON.stringify(safe))
  } catch { /* storage quota */ }
}

function loadLang() {
  try {
    return localStorage.getItem('profilelens-lang') || 'pt'
  } catch { /* storage unavailable */ }
  return 'pt'
}

// Cleanup sensitive data from sessionStorage when user leaves the page
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    try {
      const keysToRemove = []
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key && (key.startsWith('profilelens-result-') || key === 'profilelens-gemini-models-v2')) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach(k => sessionStorage.removeItem(k))
    } catch { /* ignore */ }
  })
}

export default function App() {
  const [screen, setScreen] = useState('hero')
  const [settings, setSettings] = useState(loadSettings)
  const [showSettings, setShowSettings] = useState(false)
  const [lang, setLang] = useState(loadLang)
  const [analysisDone, setAnalysisDone] = useState(false)
  const [userCount, setUserCount] = useState(null)
  const { analyze, result, error } = useAnalysis()

  const lastProfileText = useRef('')
  const langRef = useRef(loadLang())
  const analysisCounter = useRef(0)

  useEffect(() => { getCount().then(c => { if (c) setUserCount(c) }).catch(() => {}) }, [])

  const handleLangChange = async (newLang) => {
    setLang(newLang)
    langRef.current = newLang
    try { localStorage.setItem('profilelens-lang', newLang) } catch { /* storage quota */ }
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
        // error state is set by useAnalysis hook, stay on results to show it
        if (analysisCounter.current === myId) {
          setScreen('input')
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
        incrementCount().then(c => { if (c) setUserCount(c) }).catch(() => {})
        await new Promise((r) => setTimeout(r, 600))
        if (analysisCounter.current === myId) setScreen('results')
      }
    } catch {
      if (analysisCounter.current === myId) {
        // Small delay so error state from useAnalysis propagates before screen change
        await new Promise((r) => setTimeout(r, 100))
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
        <button className={`logo${screen === 'hero' ? ' logo-static' : ''}`} onClick={() => setScreen('hero')} disabled={screen === 'hero'}>
          <span className="logo-icon-wrap"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.5" stroke="#fff" strokeWidth="2"/><line x1="12.5" y1="12.5" x2="17.5" y2="17.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg></span>
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
        {screen === 'hero' && <Hero onStart={() => setScreen('input')} lang={lang} userCount={userCount} />}
        {screen === 'input' && (
          <ProfileInput
            onAnalyze={handleAnalyze}
            onBack={() => setScreen('hero')}
            error={error}
            provider={settings.provider}
            lang={lang}
          />
        )}
        {screen === 'loading' && <Loading lang={lang} done={analysisDone} onTimeout={() => setScreen('input')} />}
        {screen === 'results' && result && (
          <Results data={result} onReset={handleReset} lang={lang} />
        )}
      </main>

      <button
        className="lang-toggle"
        onClick={() => handleLangChange(lang === 'pt' ? 'en' : 'pt')}
        title={t(lang, 'switchLang')}
      >
        {lang === 'pt' ? (
          <svg width="32" height="32" viewBox="0 0 24 24">
            <defs><clipPath id="fc"><circle cx="12" cy="12" r="11"/></clipPath></defs>
            <g clipPath="url(#fc)">
              <rect width="24" height="24" fill="#009c3b"/>
              <path d="M12 3.5L22.5 12 12 20.5 1.5 12Z" fill="#ffdf00"/>
              <circle cx="12" cy="12" r="4.2" fill="#002776"/>
              <path d="M8.2 13.2c0 0 1.5-2.2 3.8-2.2s3.8 2.2 3.8 2.2" fill="none" stroke="#fff" strokeWidth="0.5"/>
              <rect x="8" y="11.6" width="8" height="0.6" rx="0.3" fill="#fff" opacity="0.9"/>
            </g>
            <circle cx="12" cy="12" r="11" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24">
            <defs><clipPath id="fc2"><circle cx="12" cy="12" r="11"/></clipPath></defs>
            <g clipPath="url(#fc2)">
              <rect width="24" height="24" fill="#b22234"/>
              <rect y="1.85" width="24" height="1.85" fill="#fff"/><rect y="5.54" width="24" height="1.85" fill="#fff"/>
              <rect y="9.23" width="24" height="1.85" fill="#fff"/><rect y="12.92" width="24" height="1.85" fill="#fff"/>
              <rect y="16.62" width="24" height="1.85" fill="#fff"/><rect y="20.31" width="24" height="1.85" fill="#fff"/>
              <rect width="9.6" height="12.92" fill="#3c3b6e"/>
              <g fill="#fff" opacity="0.9">
                <circle cx="2.4" cy="2" r="0.55"/><circle cx="4.8" cy="2" r="0.55"/><circle cx="7.2" cy="2" r="0.55"/>
                <circle cx="1.6" cy="3.7" r="0.55"/><circle cx="3.6" cy="3.7" r="0.55"/><circle cx="5.6" cy="3.7" r="0.55"/><circle cx="7.6" cy="3.7" r="0.55"/>
                <circle cx="2.4" cy="5.4" r="0.55"/><circle cx="4.8" cy="5.4" r="0.55"/><circle cx="7.2" cy="5.4" r="0.55"/>
                <circle cx="1.6" cy="7.1" r="0.55"/><circle cx="3.6" cy="7.1" r="0.55"/><circle cx="5.6" cy="7.1" r="0.55"/><circle cx="7.6" cy="7.1" r="0.55"/>
                <circle cx="2.4" cy="8.8" r="0.55"/><circle cx="4.8" cy="8.8" r="0.55"/><circle cx="7.2" cy="8.8" r="0.55"/>
                <circle cx="1.6" cy="10.5" r="0.55"/><circle cx="3.6" cy="10.5" r="0.55"/><circle cx="5.6" cy="10.5" r="0.55"/><circle cx="7.6" cy="10.5" r="0.55"/>
              </g>
            </g>
            <circle cx="12" cy="12" r="11" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
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
