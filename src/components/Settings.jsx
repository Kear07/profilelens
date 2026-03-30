import { useState } from 'react'

const PROVIDERS = [
  {
    id: 'mock',
    name: 'Demo (sem API)',
    desc: 'Resultado de exemplo para testar a interface',
    fields: [],
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    desc: 'Gemini 2.5 Flash (grátis), 2.5 Pro, 2.0 Flash',
    fields: ['apiKey', 'model'],
    models: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'],
    defaultModel: 'gemini-2.5-flash',
  },
  {
    id: 'custom',
    name: 'Custom (OpenAI-compatible)',
    desc: 'Qualquer API compatível com formato OpenAI',
    fields: ['baseUrl', 'apiKey', 'model'],
    models: [],
    defaultModel: '',
  },
]

export default function Settings({ settings, onChange, onClose }) {
  const [local, setLocal] = useState({ ...settings })
  const provider = PROVIDERS.find((p) => p.id === local.provider) || PROVIDERS[0]

  const update = (key, val) => setLocal((s) => ({ ...s, [key]: val }))

  const handleProviderChange = (id) => {
    const p = PROVIDERS.find((x) => x.id === id)
    setLocal({
      provider: id,
      apiKey: '',
      model: p?.defaultModel || '',
      baseUrl: p?.defaultUrl || '',
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
          <h3>Configurar IA</h3>
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
            <span>API Key</span>
            <input
              type="password"
              value={local.apiKey}
              onChange={(e) => update('apiKey', e.target.value)}
              placeholder={
                local.provider === 'gemini'
                  ? 'Cole sua Gemini API key (grátis em aistudio.google.com)'
                  : `Cole sua ${provider.name} API key`
              }
            />
            <small className="field-hint">
              {local.provider === 'gemini'
                ? 'Grátis — pegue sua key em aistudio.google.com/apikey'
                : 'Sua key fica apenas no navegador, nunca é enviada a terceiros'}
            </small>
          </label>
        )}

        {provider.fields.includes('baseUrl') && (
          <label className="field">
            <span>URL Base</span>
            <input
              type="url"
              value={local.baseUrl}
              onChange={(e) => update('baseUrl', e.target.value)}
              placeholder={provider.defaultUrl || 'https://api.example.com/v1'}
            />
          </label>
        )}

        {provider.fields.includes('model') && (
          <label className="field">
            <span>Modelo</span>
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
                placeholder="Nome do modelo"
              />
            )}
          </label>
        )}

        <div className="settings-footer">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  )
}
