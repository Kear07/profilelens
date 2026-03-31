import { describe, it, expect } from 'vitest'

// Extracted from useAnalysis.js for testability
const SECTION_WEIGHTS = {
  'headline': 0.20,
  'sobre': 0.20,
  'about': 0.20,
  'experiência': 0.25,
  'experiencia': 0.25,
  'experience': 0.25,
  'habilidades': 0.10,
  'skills': 0.10,
  'endorsements': 0.10,
  'recomendações': 0.10,
  'formação': 0.10,
  'education': 0.10,
  'certif': 0.10,
  'posicionamento': 0.15,
  'positioning': 0.15,
  'strategic': 0.15,
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

describe('calcOverallScore', () => {
  it('returns 50 for null/undefined/empty sections', () => {
    expect(calcOverallScore(null)).toBe(50)
    expect(calcOverallScore(undefined)).toBe(50)
    expect(calcOverallScore([])).toBe(50)
  })

  it('calculates weighted average for PT-BR sections', () => {
    const sections = [
      { title: '🎯 Headline', score: 80 },
      { title: '📝 Sobre', score: 60 },
      { title: '💼 Experiência', score: 70 },
      { title: '🛠 Habilidades e Recomendações', score: 50 },
      { title: '🎓 Formação e Certificações', score: 40 },
      { title: '🧭 Posicionamento Estratégico', score: 90 },
    ]
    const score = calcOverallScore(sections)
    // Manual: (80*0.20 + 60*0.20 + 70*0.25 + 50*0.10 + 40*0.10 + 90*0.15) / (0.20+0.20+0.25+0.10+0.10+0.15)
    // = (16 + 12 + 17.5 + 5 + 4 + 13.5) / 1.0 = 68
    expect(score).toBe(68)
  })

  it('calculates weighted average for EN sections', () => {
    const sections = [
      { title: '🎯 Headline', score: 80 },
      { title: '📝 About', score: 60 },
      { title: '💼 Experience', score: 70 },
      { title: '🛠 Skills & Endorsements', score: 50 },
      { title: '🎓 Education & Certifications', score: 40 },
      { title: '🧭 Strategic Positioning', score: 90 },
    ]
    const score = calcOverallScore(sections)
    expect(score).toBe(68)
  })

  it('produces same score regardless of language (PT vs EN)', () => {
    const ptSections = [
      { title: '🎯 Headline', score: 75 },
      { title: '📝 Sobre', score: 65 },
      { title: '💼 Experiência', score: 80 },
      { title: '🛠 Habilidades', score: 55 },
      { title: '🎓 Formação', score: 60 },
      { title: '🧭 Posicionamento', score: 70 },
    ]
    const enSections = [
      { title: '🎯 Headline', score: 75 },
      { title: '📝 About', score: 65 },
      { title: '💼 Experience', score: 80 },
      { title: '🛠 Skills & Endorsements', score: 55 },
      { title: '🎓 Education & Certifications', score: 60 },
      { title: '🧭 Strategic Positioning', score: 70 },
    ]
    expect(calcOverallScore(ptSections)).toBe(calcOverallScore(enSections))
  })

  it('falls back to 0.10 weight for unknown section titles', () => {
    const sections = [
      { title: 'Unknown Section', score: 100 },
    ]
    // weight 0.10, so 100*0.10/0.10 = 100
    expect(calcOverallScore(sections)).toBe(100)
  })

  it('handles sections with missing score (defaults to 0)', () => {
    const sections = [
      { title: 'Headline', score: undefined },
      { title: 'Experience', score: 80 },
    ]
    const score = calcOverallScore(sections)
    // (0*0.20 + 80*0.25) / (0.20+0.25) = 20/0.45 = 44.44 -> 44
    expect(score).toBe(44)
  })

  it('handles sections with missing title', () => {
    const sections = [
      { score: 70 },
      { title: null, score: 80 },
    ]
    // Both fall back to 0.10 weight: (70*0.10 + 80*0.10) / (0.10+0.10) = 15/0.20 = 75
    expect(calcOverallScore(sections)).toBe(75)
  })

  it('returns all-100 profile as 100', () => {
    const sections = [
      { title: 'Headline', score: 100 },
      { title: 'About', score: 100 },
      { title: 'Experience', score: 100 },
      { title: 'Skills', score: 100 },
      { title: 'Education', score: 100 },
      { title: 'Strategic Positioning', score: 100 },
    ]
    expect(calcOverallScore(sections)).toBe(100)
  })

  it('returns all-0 profile as 0', () => {
    const sections = [
      { title: 'Headline', score: 0 },
      { title: 'About', score: 0 },
      { title: 'Experience', score: 0 },
      { title: 'Skills', score: 0 },
      { title: 'Education', score: 0 },
      { title: 'Strategic Positioning', score: 0 },
    ]
    expect(calcOverallScore(sections)).toBe(0)
  })
})
