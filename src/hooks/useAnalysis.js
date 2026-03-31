import { useState, useCallback } from 'react'
import { analyzeProfile } from '../services/analyzer'

const SECTION_WEIGHTS = {
  'headline': 0.20,
  'sobre': 0.25,
  'about': 0.25,
  'experiência': 0.30,
  'experiencia': 0.30,
  'habilidades': 0.15,
  'presença': 0.10,
  'presenca': 0.10,
  'visual': 0.10,
}

function calcOverallScore(sections) {
  if (!sections?.length) return 50

  let weightedSum = 0
  let totalWeight = 0

  for (const s of sections) {
    const titleLower = s.title?.toLowerCase() || ''
    const matchedKey = Object.keys(SECTION_WEIGHTS).find((k) => titleLower.includes(k))
    const weight = matchedKey ? SECTION_WEIGHTS[matchedKey] : 0.10
    weightedSum += (s.score || 0) * weight
    totalWeight += weight
  }

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 50
}

export function useAnalysis() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = useCallback(async (profileText, settings) => {
    setLoading(true)
    setError(null)
    try {
      const data = await analyzeProfile(profileText, settings)
      // Recalcula overallScore no client, não confia no da IA
      data.overallScore = calcOverallScore(data.sections)
      setResult(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { analyze, result, error, loading }
}
