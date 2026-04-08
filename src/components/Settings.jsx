import { useState } from 'react'
import { t } from '../i18n'

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
      models: [
        { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', note: lang === 'pt' ? 'Recomendado, gratis' : 'Recommended, free' },
        { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', note: null },
        { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite', note: lang === 'pt' ? 'Mais rapido' : 'Fastest' },
        { id: 'gemini-3-flash', label: 'Gemini 3 Flash', note: 'Preview' },
        { id: 'gemini-3.1-pro', label: 'Gemini 3.1 Pro', note: 'Preview' },
        { id: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash-Lite', note: 'Preview' },
      ],
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
                  <span>{t(lang, 'baseUrl')}</span>
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
                  <span>{t(lang, 'model')}</span>
                  {provider.models.length > 0 ? (
                    <div className="model-list">
                      {provider.models.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          className={`model-item ${local.model === m.id ? 'active' : ''}`}
                          onClick={() => update('model', m.id)}
                        >
                          <span className="model-name">{m.label}</span>
                          {m.note && <span className="model-note">{m.note}</span>}
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
        </div>

        <div className="settings-footer">
          <button className="btn-ghost" onClick={onClose}>{t(lang, 'cancel')}</button>
          <button className="btn-primary" onClick={handleSave}>{t(lang, 'save')}</button>
        </div>
      </div>
    </div>
  )
}
