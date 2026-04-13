const CACHE_KEY = 'profilelens-gemini-models'
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
  } catch {}
}

export const FALLBACK_MODELS = [
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', note: null },
  { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', note: null },
  { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite', note: null },
]

const MODEL_FILTER = /^gemini-/
const BLOCKED = /^gemini-1\.|embedding|aqa|vision-only|imagen|veo|learnlm|medlm/i

export async function fetchGeminiModels(apiKey) {
  const cached = loadCache()
  if (cached) return cached

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}&pageSize=100`
  )
  if (!res.ok) return FALLBACK_MODELS

  const data = await res.json()
  const raw = (data.models || [])
    .filter(m => {
      const id = m.name?.replace('models/', '') || ''
      if (!MODEL_FILTER.test(id)) return false
      if (BLOCKED.test(id)) return false
      const methods = m.supportedGenerationMethods || []
      return methods.includes('generateContent')
    })
    .map(m => {
      const id = m.name.replace('models/', '')
      const label = m.displayName || id
      return { id, label, note: null }
    })
    .sort((a, b) => a.id.localeCompare(b.id))

  if (raw.length === 0) return FALLBACK_MODELS

  saveCache(raw)
  return raw
}
