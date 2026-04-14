const API = 'https://api.counterapi.dev/v1/profilelens-kear07/analyses'
const CACHE_KEY = 'profilelens-user-count'
const CACHE_TTL = 60_000 // 1 min
const INCREMENT_KEY = 'profilelens-last-increment'
const INCREMENT_COOLDOWN = 30_000 // 30s between increments

export async function getCount() {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { count, ts } = JSON.parse(cached)
      if (Date.now() - ts < CACHE_TTL) return count
    }
  } catch { /* storage unavailable */ }

  try {
    const res = await fetch(`${API}/`, { signal: AbortSignal.timeout(5000) })
    if (!res.ok) return null
    const data = await res.json()
    const count = data.count || 0
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ count, ts: Date.now() })) } catch { /* storage quota */ }
    return count
  } catch {
    return null
  }
}

export async function incrementCount() {
  // Rate limit: prevent spamming the /up endpoint
  try {
    const lastIncrement = Number(localStorage.getItem(INCREMENT_KEY) || 0)
    if (Date.now() - lastIncrement < INCREMENT_COOLDOWN) {
      // Too soon — return cached count without hitting API
      return getCount()
    }
  } catch { /* storage unavailable */ }

  try {
    const res = await fetch(`${API}/up`, { signal: AbortSignal.timeout(5000) })
    if (!res.ok) return null
    const data = await res.json()
    const count = data.count || 0
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ count, ts: Date.now() }))
      localStorage.setItem(INCREMENT_KEY, String(Date.now()))
    } catch { /* storage quota */ }
    return count
  } catch {
    return null
  }
}
