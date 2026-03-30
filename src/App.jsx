import { useState } from 'react'
import Hero from './components/Hero'
import ProfileInput from './components/ProfileInput'
import Settings from './components/Settings'
import Loading from './components/Loading'
import Results from './components/Results'
import { useAnalysis } from './hooks/useAnalysis'
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

export default function App() {
  const [screen, setScreen] = useState('hero') // hero | input | loading | results
  const [settings, setSettings] = useState(loadSettings)
  const [showSettings, setShowSettings] = useState(false)
  const { analyze, result, error, loading } = useAnalysis()

  const handleSettingsChange = (s) => {
    setSettings(s)
    saveSettings(s)
  }

  const handleAnalyze = async (profileText) => {
    setScreen('loading')
    try {
      await analyze(profileText, settings)
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
          title="Configurar IA"
        >
          ⚙
        </button>
      </header>

      {showSettings && (
        <Settings
          settings={settings}
          onChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      <main className="main">
        {screen === 'hero' && <Hero onStart={() => setScreen('input')} />}
        {screen === 'input' && (
          <ProfileInput
            onAnalyze={handleAnalyze}
            onBack={() => setScreen('hero')}
            error={error}
            provider={settings.provider}
          />
        )}
        {screen === 'loading' && <Loading />}
        {screen === 'results' && result && (
          <Results data={result} onReset={handleReset} />
        )}
      </main>

      <footer className="footer">
        <p>
          Feito por <strong>Luke Santos</strong> · Seus dados não saem do navegador
        </p>
      </footer>
    </div>
  )
}
