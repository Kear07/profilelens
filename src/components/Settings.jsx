import { useState, useEffect, useRef } from 'react'
import { t } from '../i18n'
import { fetchGeminiModels, validateGeminiModel, FALLBACK_MODELS } from '../services/geminiModels'

// Allowlist of trusted domains for custom API providers.
// CSP connect-src must also include any domain listed here.
const TRUSTED_API_DOMAINS = [
  'api.openai.com',
  'generativelanguage.googleapis.com',
  'api.anthropic.com',
  'api.groq.com',
  'openrouter.ai',
  'api.together.xyz',
  'api.fireworks.ai',
  'api.mistral.ai',
  'api.perplexity.ai',
  'api.deepseek.com',
]

function isBaseUrlTrusted(url) {
  if (!url) return true
  try {
    const hostname = new URL(url).hostname
    return TRUSTED_API_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d))
  } catch {
    return false
  }
}

function getProviders(lang) {
  return [
    {
      id: 'mock',
      name: t(lang, 'providerMockName'),
      desc: t(lang, 'providerMockDesc'),
      fields: [],
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      desc: t(lang, 'providerGeminiDesc'),
      fields: ['apiKey', 'model'],
      models: [],
      defaultModel: 'gemini-2.5-flash',
    },
    {
      id: 'custom',
      name: t(lang, 'providerCustomName'),
      desc: t(lang, 'providerCustomDesc'),
      fields: ['baseUrl', 'apiKey', 'model'],
      models: [],
      defaultModel: '',
    },
  ]
}

export default function Settings({ settings, onChange, onClose, lang }) {
  const [local, setLocal] = useState({ ...settings })
  const [geminiModels, setGeminiModels] = useState(FALLBACK_MODELS)
  const [loadingModels, setLoadingModels] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const [validating, setValidating] = useState(false)
  const [modelError, setModelError] = useState('')
  const fetchedKey = useRef('')

  const PROVIDERS = getProviders(lang)
  const provider = PROVIDERS.find((p) => p.id === local.provider) || PROVIDERS[0]

  const update = (key, val) => {
    setLocal((s) => {
      const next = { ...s, [key]: val }
      // Clear apiKey when baseUrl changes to prevent accidental exfiltration
      if (key === 'baseUrl' && s.provider === 'custom' && val !== s.baseUrl) {
        next.apiKey = ''
      }
      return next
    })
  }

  // Fetch models when Gemini is selected and key looks valid
  useEffect(() => {
    if (local.provider !== 'gemini') return
    const key = local.apiKey?.trim()
    if (!key || key.length < 10 || key === fetchedKey.current) return

    fetchedKey.current = key
    let cancelled = false
    ;(async () => {
      setLoadingModels(true)
      try {
        const models = await fetchGeminiModels(key)
        if (!cancelled) setGeminiModels(models)
      } catch {
        if (!cancelled) setGeminiModels(FALLBACK_MODELS)
      } finally {
        if (!cancelled) setLoadingModels(false)
      }
    })()
    return () => { cancelled = true }
  }, [local.provider, local.apiKey])

  const handleProviderChange = (id) => {
    const p = PROVIDERS.find((x) => x.id === id)
    setLocal({
      provider: id,
      apiKey: '',
      model: p?.defaultModel || '',
      baseUrl: '',
    })
    setCustomInput('')
    setModelError('')
    if (id !== 'gemini') {
      setGeminiModels(FALLBACK_MODELS)
      fetchedKey.current = ''
    }
  }

  const isCustomModel = local.provider === 'gemini' && customInput.trim() !== ''

  const handleSave = async () => {
    setModelError('')

    // Block untrusted base URLs
    if (local.provider === 'custom' && local.baseUrl && !isBaseUrlTrusted(local.baseUrl)) {
      return // UI already shows the blocked message
    }

    // If user typed a custom Gemini model, validate it first
    if (isCustomModel) {
      const modelId = customInput.trim()
      const key = local.apiKey?.trim()
      if (!key || key.length < 10) {
        setModelError(t(lang, 'customModelNetwork'))
        return
      }

      setValidating(true)
      const result = await validateGeminiModel(key, modelId)
      setValidating(false)

      if (!result.valid) {
        setModelError(
          result.reason === 'network'
            ? t(lang, 'customModelNetwork')
            : t(lang, 'customModelInvalid')
        )
        return
      }
      onChange({ ...local, model: modelId })
    } else {
      onChange(local)
    }
    onClose()
  }

  const displayModels = local.provider === 'gemini' ? geminiModels : provider.models

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>

        <div className="settings-header">
          <h3>{t(lang, 'settingsTitle')}</h3>
          <button className="settings-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="settings-body">
          <div className="provider-list">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                className={`provider-option ${local.provider === p.id ? 'active' : ''}`}
                onClick={() => handleProviderChange(p.id)}
              >
                <div className="provider-radio">
                  <div className="provider-radio-dot" />
                </div>
                <div className="provider-info">
                  <strong>{p.name}</strong>
                  <span>{p.desc}</span>
                </div>
              </button>
            ))}
          </div>

          {provider.fields.length > 0 && (
            <div className="settings-fields">
              {provider.fields.includes('apiKey') && (
                <label className="field">
                  <span>{t(lang, 'apiKey')}</span>
                  <input
                    type="password"
                    value={local.apiKey}
                    onChange={(e) => update('apiKey', e.target.value)}
                    placeholder={local.provider === 'gemini' ? 'AIzaSy...' : 'sk-...'}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <small className="field-hint">
                    {local.provider === 'gemini'
                      ? t(lang, 'geminiHint')
                      : t(lang, 'keyPrivacy')}
                  </small>
                  <small className="field-hint">{t(lang, 'apiKeySessionNote')}</small>
                </label>
              )}

              {provider.fields.includes('baseUrl') && (
                <label className="field">
                  <span>{t(lang, 'baseUrl')}</span>
                  <input
                    type="url"
                    value={local.baseUrl}
                    onChange={(e) => update('baseUrl', e.target.value)}
                    placeholder="https://api.openai.com/v1"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    inputMode="url"
                  />
                  {local.baseUrl && !isBaseUrlTrusted(local.baseUrl) && (
                    <small className="field-error">{t(lang, 'baseUrlBlocked')}</small>
                  )}
                  {local.baseUrl && isBaseUrlTrusted(local.baseUrl) && !local.baseUrl.includes('openai.com') && !local.baseUrl.includes('googleapis.com') && (
                    <small className="field-hint">{t(lang, 'baseUrlWarning')}</small>
                  )}
                </label>
              )}

              {provider.fields.includes('model') && (
                <label className="field">
                  <span>{t(lang, 'model')}{loadingModels ? '...' : ''}</span>
                  {displayModels.length > 0 ? (
                    <>
                    <div className="model-list">
                      {displayModels.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          className={`model-item ${local.model === m.id && !customInput ? 'active' : ''}`}
                          onClick={() => { update('model', m.id); setCustomInput(''); setModelError('') }}
                        >
                          <span className="model-name">{m.label}</span>
                          {m.note && <span className="model-note">{m.note}</span>}
                        </button>
                      ))}
                    </div>
                    {local.provider === 'gemini' && (
                      <input
                        type="text"
                        className="custom-model-input"
                        value={customInput}
                        onChange={(e) => { setCustomInput(e.target.value); setModelError('') }}
                        placeholder={t(lang, 'customModelPlaceholder')}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                      />
                    )}
                    {modelError && <small className="field-error">{modelError}</small>}
                    <small className="field-hint">{t(lang, 'modelHint')}</small>
                    </>
                  ) : (
                    <input
                      type="text"
                      value={local.model}
                      onChange={(e) => update('model', e.target.value)}
                      placeholder="gpt-4.1-mini"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  )}
                </label>
              )}
            </div>
          )}
        </div>

        <div className="settings-footer">
          <button className="btn-primary" onClick={handleSave} disabled={validating}>
            {validating ? t(lang, 'validatingModel') : t(lang, 'save')}
          </button>
        </div>
      </div>
    </div>
  )
}
