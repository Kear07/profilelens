import { useState, useRef } from 'react'
import Hero from './components/Hero'
import ProfileInput from './components/ProfileInput'
import Settings from './components/Settings'
import Loading from './components/Loading'
import Results from './components/Results'
import { useAnalysis } from './hooks/useAnalysis'
import { t } from './i18n'
import logoImg from './assets/logo.png'

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
  const { analyze, result, error, loading } = useAnalysis()

  const lastProfileText = useRef('')
  const langRef = useRef(loadLang())
  const analysisCounter = useRef(0)

  const handleLangChange = async (newLang) => {
    setLang(newLang)
    langRef.current = newLang
    try { localStorage.setItem('profilelens-lang', newLang) } catch {}
    // Se ta na tela de resultados ou loading com texto, re-analisa no novo idioma
    if ((screen === 'results' || screen === 'loading') && lastProfileText.current) {
      const myId = ++analysisCounter.current
      setScreen('loading')
      try {
        await analyze(lastProfileText.current, settings, newLang)
        if (analysisCounter.current === myId) {
          setScreen('results')
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
    setScreen('loading')
    try {
      await analyze(profileText, settings, currentLang)
      if (analysisCounter.current === myId) {
        setScreen('results')
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
          <img src={logoImg} alt="ProfileLens" className="logo-icon-img" /> ProfileLens
        </button>
        <button
          className="settings-btn"
          onClick={() => setShowSettings(!showSettings)}
          title={t(lang, 'settings')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> {t(lang, 'settings')}
        </button>
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
        {screen === 'loading' && <Loading lang={lang} />}
        {screen === 'results' && result && (
          <Results data={result} onReset={handleReset} lang={lang} />
        )}
      </main>

      <button
        className="lang-toggle"
        onClick={() => handleLangChange(lang === 'pt' ? 'en' : 'pt')}
        title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      >
        {lang === 'pt' ? 'PT' : 'EN'}
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
