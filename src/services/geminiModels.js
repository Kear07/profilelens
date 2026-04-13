const CACHE_KEY = 'profilelens-gemini-models-v2'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24h

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { models, ts } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return models
  } catch { return null }
}

function saveCache(models) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ models, ts: Date.now() }))
  } catch { /* storage quota */ }
}

export const FALLBACK_MODELS = [
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', note: null },
  { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', note: null },
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', note: null },
  { id: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash-Lite', note: null },
]

// Only show the main production models
const ALLOWED_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
]

export async function fetchGeminiModels(apiKey) {
  const cached = loadCache()
  if (cached) return cached

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}&pageSize=100`
    )
    if (!res.ok) return FALLBACK_MODELS

    const data = await res.json()
    const available = new Map(
      (data.models || []).map(m => [m.name?.replace('models/', ''), m])
    )

    const raw = ALLOWED_MODELS
      .filter(id => {
        const m = available.get(id)
        if (!m) return false
        const methods = m.supportedGenerationMethods || []
        return methods.includes('generateContent')
      })
      .map(id => {
        const m = available.get(id)
        const label = m.displayName || id
        return { id, label, note: null }
      })

    if (raw.length === 0) return FALLBACK_MODELS

    saveCache(raw)
    return raw
  } catch {
    return FALLBACK_MODELS
  }
}

/**
 * Validates a custom model ID against the Gemini API.
 * Returns { valid: true, label } or { valid: false, reason }.
 */
export async function validateGeminiModel(apiKey, modelId) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}?key=${encodeURIComponent(apiKey)}`
    )
    if (!res.ok) return { valid: false, reason: 'not_found' }

    const data = await res.json()
    const methods = data.supportedGenerationMethods || []
    if (!methods.includes('generateContent')) {
      return { valid: false, reason: 'no_generate' }
    }
    return { valid: true, label: data.displayName || modelId }
  } catch {
    return { valid: false, reason: 'network' }
  }
}
