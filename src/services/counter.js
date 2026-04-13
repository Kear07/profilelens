const API = 'https://api.counterapi.dev/v1/profilelens-kear07/analyses'
const CACHE_KEY = 'profilelens-user-count'
const CACHE_TTL = 60_000 // 1 min

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
  try {
    const res = await fetch(`${API}/up`, { signal: AbortSignal.timeout(5000) })
    if (!res.ok) return null
    const data = await res.json()
    const count = data.count || 0
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ count, ts: Date.now() })) } catch { /* storage quota */ }
    return count
  } catch {
    return null
  }
}
