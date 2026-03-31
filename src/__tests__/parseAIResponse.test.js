import { describe, it, expect } from 'vitest'

/**
 * Tests for parsing AI provider responses.
 * These validate that the app correctly extracts analysis data
 * from the different JSON structures returned by Gemini and OpenAI-compatible APIs.
 */

function parseGeminiResponse(apiResponse) {
  const content = apiResponse.candidates?.[0]?.content?.parts?.[0]?.text
  if (!content) return null
  return JSON.parse(content)
}

function parseOpenAIResponse(apiResponse) {
  const content = apiResponse.choices?.[0]?.message?.content
  if (!content) return null
  return JSON.parse(content)
}

function validateAnalysisSchema(data) {
  const errors = []
  if (typeof data.overallScore !== 'number') errors.push('overallScore must be a number')
  if (typeof data.summary !== 'string' || !data.summary) errors.push('summary must be a non-empty string')
  if (!Array.isArray(data.sections)) errors.push('sections must be an array')
  if (!Array.isArray(data.tips)) errors.push('tips must be an array')

  for (const [i, s] of (Array.isArray(data.sections) ? data.sections : []).entries()) {
    if (typeof s.title !== 'string') errors.push(`sections[${i}].title must be a string`)
    if (typeof s.score !== 'number' || s.score < 0 || s.score > 100) {
      errors.push(`sections[${i}].score must be 0-100`)
    }
    if (typeof s.feedback !== 'string') errors.push(`sections[${i}].feedback must be a string`)
  }
  return errors
}

const VALID_ANALYSIS = {
  overallScore: 62,
  summary: 'Strong technical background but lacks personal branding.',
  sections: [
    { title: '🎯 Headline', score: 55, status: 'Needs work', feedback: 'Too generic.', suggestion: 'Try: "Senior Engineer | React & Node.js | Building scalable platforms"' },
    { title: '📝 About', score: 70, status: 'Good foundation', feedback: 'Solid but missing metrics.', suggestion: null },
    { title: '💼 Experience', score: 80, status: 'Strong', feedback: 'Good progression, quantified.', suggestion: null },
    { title: '🛠 Skills & Endorsements', score: 45, status: 'Weak', feedback: 'Only 12 endorsements.', suggestion: 'Ask colleagues for endorsements on top 3 skills.' },
    { title: '🎓 Education & Certifications', score: 50, status: 'Average', feedback: 'No certifications listed.', suggestion: 'Add AWS/GCP certs if you have them.' },
    { title: '🧭 Strategic Positioning', score: 65, status: 'Unclear', feedback: 'No clear target audience.', suggestion: 'Define whether you target startups or enterprises.' },
  ],
  tips: [
    'Add a professional headshot',
    'Request 3 recommendations from managers',
    'Enable creator mode',
    'Add your GitHub portfolio link',
    'Write 1 article per month',
    'Engage with 5 posts daily',
  ],
}

describe('parseGeminiResponse', () => {
  it('extracts analysis from valid Gemini response', () => {
    const geminiResponse = {
      candidates: [{
        content: {
          parts: [{ text: JSON.stringify(VALID_ANALYSIS) }],
          role: 'model'
        },
        finishReason: 'STOP',
      }],
    }
    const result = parseGeminiResponse(geminiResponse)
    expect(result.overallScore).toBe(62)
    expect(result.sections).toHaveLength(6)
    expect(result.tips).toHaveLength(6)
  })

  it('returns null for empty candidates', () => {
    expect(parseGeminiResponse({ candidates: [] })).toBeNull()
    expect(parseGeminiResponse({})).toBeNull()
    expect(parseGeminiResponse({ candidates: [{ content: { parts: [] } }] })).toBeNull()
  })

  it('throws on malformed JSON in response text', () => {
    const bad = {
      candidates: [{ content: { parts: [{ text: '{invalid json' }] } }],
    }
    expect(() => parseGeminiResponse(bad)).toThrow()
  })
})

describe('parseOpenAIResponse', () => {
  it('extracts analysis from valid OpenAI-compatible response', () => {
    const openaiResponse = {
      id: 'chatcmpl-123',
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: JSON.stringify(VALID_ANALYSIS),
        },
        finish_reason: 'stop',
      }],
    }
    const result = parseOpenAIResponse(openaiResponse)
    expect(result.overallScore).toBe(62)
    expect(result.sections).toHaveLength(6)
    expect(result.summary).toContain('technical background')
  })

  it('returns null for empty choices', () => {
    expect(parseOpenAIResponse({ choices: [] })).toBeNull()
    expect(parseOpenAIResponse({})).toBeNull()
  })

  it('throws on malformed JSON content', () => {
    const bad = {
      choices: [{ message: { content: 'not json at all' } }],
    }
    expect(() => parseOpenAIResponse(bad)).toThrow()
  })
})

describe('validateAnalysisSchema', () => {
  it('returns no errors for valid analysis', () => {
    expect(validateAnalysisSchema(VALID_ANALYSIS)).toEqual([])
  })

  it('catches missing overallScore', () => {
    const bad = { ...VALID_ANALYSIS, overallScore: 'not a number' }
    const errors = validateAnalysisSchema(bad)
    expect(errors).toContain('overallScore must be a number')
  })

  it('catches empty summary', () => {
    const bad = { ...VALID_ANALYSIS, summary: '' }
    const errors = validateAnalysisSchema(bad)
    expect(errors.some(e => e.includes('summary'))).toBe(true)
  })

  it('catches section score out of range', () => {
    const bad = {
      ...VALID_ANALYSIS,
      sections: [{ title: 'Test', score: 150, feedback: 'ok' }],
    }
    const errors = validateAnalysisSchema(bad)
    expect(errors.some(e => e.includes('score must be 0-100'))).toBe(true)
  })

  it('catches missing sections array', () => {
    const bad = { ...VALID_ANALYSIS, sections: 'not an array' }
    const errors = validateAnalysisSchema(bad)
    expect(errors).toContain('sections must be an array')
  })

  it('catches missing tips array', () => {
    const bad = { ...VALID_ANALYSIS, tips: null }
    const errors = validateAnalysisSchema(bad)
    expect(errors).toContain('tips must be an array')
  })
})
