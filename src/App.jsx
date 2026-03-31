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

  const handleLangChange = async (newLang) => {
    setLang(newLang)
    try { localStorage.setItem('profilelens-lang', newLang) } catch {}
    // Se ta na tela de resultados, re-analisa no novo idioma
    if (screen === 'results' && lastProfileText.current) {
      setScreen('loading')
      try {
        await analyze(lastProfileText.current, settings, newLang)
        setScreen('results')
      } catch {
        setScreen('results')
      }
    }
  }

  const handleSettingsChange = (s) => {
    setSettings(s)
    saveSettings(s)
  }

  const handleAnalyze = async (profileText) => {
    lastProfileText.current = profileText
    setScreen('loading')
    try {
      await analyze(profileText, settings, lang)
      setScreen('results')
    } catch {
      setScreen('input')
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
          <span style={{ fontSize: '1.3rem' }}>⚙</span> {t(lang, 'settings')}
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
        {lang === 'pt' ? '🇧🇷' : '🇺🇸'}
      </button>

      <footer className="footer">
        <p>
          {t(lang, 'madeBy')} <strong>Luke Pereira</strong> · {t(lang, 'privacy')}
        </p>
      </footer>
    </div>
  )
}
