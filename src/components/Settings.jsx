import { useState } from 'react'
import { t } from '../i18n'

function getProviders(lang) {
  return [
    {
      id: 'mock',
      name: t(lang, 'providerMockName'),
      desc: t(lang, 'providerMockDesc'),
      icon: 'demo',
      fields: [],
    },
    {
      id: 'gemini',
      name: t(lang, 'providerGeminiName'),
      desc: t(lang, 'providerGeminiDesc'),
      icon: 'gemini',
      fields: ['apiKey', 'model'],
      models: [
        { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', tag: lang === 'pt' ? 'Gratis' : 'Free' },
        { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', tag: null },
        { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite', tag: lang === 'pt' ? 'Rapido' : 'Fast' },
        { id: 'gemini-3-flash', label: 'Gemini 3 Flash', tag: 'Preview' },
        { id: 'gemini-3.1-pro', label: 'Gemini 3.1 Pro', tag: 'Preview' },
        { id: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash-Lite', tag: 'Preview' },
      ],
      defaultModel: 'gemini-2.5-flash',
    },
    {
      id: 'custom',
      name: t(lang, 'providerCustomName'),
      desc: t(lang, 'providerCustomDesc'),
      icon: 'custom',
      fields: ['baseUrl', 'apiKey', 'model'],
      models: [],
      defaultModel: '',
    },
  ]
}

const ProviderIcon = ({ type }) => {
  if (type === 'demo') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    )
  }
  if (type === 'gemini') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C12 2 14.5 8 18 12C14.5 16 12 22 12 22C12 22 9.5 16 6 12C9.5 8 12 2 12 2Z" />
      </svg>
    )
  }
  // custom
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" />
    </svg>
  )
}

export default function Settings({ settings, onChange, onClose, lang }) {
  const [local, setLocal] = useState({ ...settings })
  const PROVIDERS = getProviders(lang)
  const provider = PROVIDERS.find((p) => p.id === local.provider) || PROVIDERS[0]

  const update = (key, val) => setLocal((s) => ({ ...s, [key]: val }))

  const handleProviderChange = (id) => {
    const p = PROVIDERS.find((x) => x.id === id)
    setLocal({
      provider: id,
      apiKey: '',
      model: p?.defaultModel || '',
      baseUrl: '',
    })
  }

  const handleSave = () => {
    onChange(local)
    onClose()
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <div className="settings-title-row">
            <svg className="settings-title-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <h3>{t(lang, 'settingsTitle')}</h3>
          </div>
          <button className="settings-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="settings-section-label">{t(lang, 'providerLabel')}</div>
        <div className="provider-grid">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              className={`provider-card ${local.provider === p.id ? 'active' : ''}`}
              onClick={() => handleProviderChange(p.id)}
            >
              <div className="provider-card-icon">
                <ProviderIcon type={p.icon} />
              </div>
              <div className="provider-card-text">
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
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', verticalAlign: '-2px' }}>
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                  {t(lang, 'apiKey')}
                </span>
                <input
                  type="password"
                  value={local.apiKey}
                  onChange={(e) => update('apiKey', e.target.value)}
                  placeholder={
                    local.provider === 'gemini'
                      ? 'AIzaSy...'
                      : `sk-...`
                  }
                />
                <small className="field-hint">
                  {local.provider === 'gemini'
                    ? t(lang, 'geminiHint')
                    : t(lang, 'keyPrivacy')}
                </small>
              </label>
            )}

            {provider.fields.includes('baseUrl') && (
              <label className="field">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', verticalAlign: '-2px' }}>
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  {t(lang, 'baseUrl')}
                </span>
                <input
                  type="url"
                  value={local.baseUrl}
                  onChange={(e) => update('baseUrl', e.target.value)}
                  placeholder="https://api.openai.com/v1"
                />
              </label>
            )}

            {provider.fields.includes('model') && (
              <label className="field">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', verticalAlign: '-2px' }}>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  {t(lang, 'model')}
                </span>
                {provider.models.length > 0 ? (
                  <div className="model-grid">
                    {provider.models.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        className={`model-option ${local.model === m.id ? 'active' : ''}`}
                        onClick={() => update('model', m.id)}
                      >
                        <span className="model-option-name">{m.label}</span>
                        {m.tag && <span className="model-option-tag">{m.tag}</span>}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={local.model}
                    onChange={(e) => update('model', e.target.value)}
                    placeholder="gpt-4.1-mini"
                  />
                )}
              </label>
            )}
          </div>
        )}

        <div className="settings-footer">
          <button className="btn-ghost" onClick={onClose}>{t(lang, 'cancel')}</button>
          <button className="btn-primary" onClick={handleSave}>{t(lang, 'save')}</button>
        </div>
      </div>
    </div>
  )
}
