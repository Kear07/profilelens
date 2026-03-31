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
      name: t(lang, 'providerGeminiName'),
      desc: t(lang, 'providerGeminiDesc'),
      fields: ['apiKey', 'model'],
      models: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'],
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
          <button className="btn-ghost" onClick={onClose}>✕</button>
        </div>

        <div className="provider-grid">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              className={`provider-card ${local.provider === p.id ? 'active' : ''}`}
              onClick={() => handleProviderChange(p.id)}
            >
              <strong>{p.name}</strong>
              <span>{p.desc}</span>
            </button>
          ))}
        </div>

        {provider.fields.includes('apiKey') && (
          <label className="field">
            <span>{t(lang, 'apiKey')}</span>
            <input
              type="password"
              value={local.apiKey}
              onChange={(e) => update('apiKey', e.target.value)}
              placeholder={
                local.provider === 'gemini'
                  ? t(lang, 'geminiHint')
                  : `${t(lang, 'apiKey')} ${provider.name}`
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
            <span>{t(lang, 'baseUrl')}</span>
            <input
              type="url"
              value={local.baseUrl}
              onChange={(e) => update('baseUrl', e.target.value)}
              placeholder="https://api.example.com/v1"
            />
          </label>
        )}

        {provider.fields.includes('model') && (
          <label className="field">
            <span>{t(lang, 'model')}</span>
            {provider.models.length > 0 ? (
              <select
                value={local.model}
                onChange={(e) => update('model', e.target.value)}
              >
                {provider.models.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={local.model}
                onChange={(e) => update('model', e.target.value)}
                placeholder={t(lang, 'model')}
              />
            )}
          </label>
        )}

        <div className="settings-footer">
          <button className="btn-ghost" onClick={onClose}>{t(lang, 'cancel')}</button>
          <button className="btn-primary" onClick={handleSave}>{t(lang, 'save')}</button>
        </div>
      </div>
    </div>
  )
}
