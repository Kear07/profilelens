import { getMockAnalysis } from '../data/mockAnalysis'
import { t } from '../i18n'

const analysisCache = new Map()

async function hashText(text) {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function getSystemPrompt(lang) {
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

  if (lang === 'en') {
    return `You are ProfileLens, a LinkedIn profile optimization expert.
Today's date is ${today}. Use this to evaluate experience dates. Future dates relative to today are NOT errors, they mean current position.

Analyze the provided profile and return a JSON with EXACTLY this structure:
{
  "overallScore": 0,
  "summary": "<overall summary in 2-3 sentences>",
  "sections": [
    {
      "title": "<emoji + section name>",
      "score": <number 0-100>,
      "status": "<short status>",
      "feedback": "<detailed analysis>",
      "suggestion": "<rewrite suggestion or null>"
    }
  ],
  "tips": ["<tip 1>", "<tip 2>", ...]
}

Required sections: Headline, About, Experience, Skills.

SCORING CRITERIA (follow strictly):
- 90-100: Exceptional profile, professionally optimized
- 70-89: Good profile with minor adjustments
- 50-69: Average profile, needs clear improvements
- 30-49: Weak profile, missing important sections or generic content
- 0-29: Very incomplete profile

Evaluate based on: specificity (numbers > generic), differentiation (unique > cliche), completeness (all sections > partial), impact (results > responsibilities).

MANDATORY RULE: NEVER use the em dash character in any text. Use commas, periods, colons, or semicolons instead.

All text in the JSON MUST be in English.

Be direct, specific, and actionable. Give rewrite suggestions when relevant.
Respond ONLY with the JSON, no markdown, no explanation.`
  }

  return `Você é o ProfileLens, um especialista em otimização de perfis LinkedIn.
A data de hoje é ${today}. Use isso para avaliar datas de experiências. Datas futuras relativas a hoje NÃO são erro, significam posição atual.

Analise o perfil fornecido e retorne um JSON com EXATAMENTE esta estrutura:
{
  "overallScore": 0,
  "summary": "<resumo geral em 2-3 frases>",
  "sections": [
    {
      "title": "<emoji + nome da seção>",
      "score": <número 0-100>,
      "status": "<status curto>",
      "feedback": "<análise detalhada>",
      "suggestion": "<sugestão de reescrita ou null>"
    }
  ],
  "tips": ["<dica 1>", "<dica 2>", ...]
}

Seções obrigatórias: Headline, Sobre (About), Experiência, Habilidades.

CRITÉRIOS DE PONTUAÇÃO (siga rigorosamente):
- 90-100: Perfil excepcional, otimizado profissionalmente
- 70-89: Bom perfil com ajustes pontuais
- 50-69: Perfil mediano, precisa de melhorias claras
- 30-49: Perfil fraco, faltam seções importantes ou conteúdo genérico
- 0-29: Perfil muito incompleto

Avalie com base em: especificidade (números > genérico), diferenciação (único > clichê), completude (todas seções > parcial), impacto (resultados > responsabilidades).

REGRA OBRIGATÓRIA: NUNCA use o caractere travessão (—) em nenhum texto. Use vírgula, ponto, dois-pontos ou ponto e vírgula no lugar.

Seja direto, específico e acionável. Dê sugestões de reescrita quando relevante.
Responda APENAS com o JSON, sem markdown, sem explicação.`
}

function getUserMessage(profileText, lang) {
  return lang === 'en'
    ? `Analyze this LinkedIn profile:\n\n${profileText}`
    : `Analise este perfil LinkedIn:\n\n${profileText}`
}

function getUserMessageWithScores(profileText, lang, targetScores) {
  const scoreList = targetScores.map(s => `- ${s.title}: ${s.score}/100`).join('\n')
  if (lang === 'en') {
    return `Analyze this LinkedIn profile. IMPORTANT: The scores for each section have already been determined. Use EXACTLY these scores (do not change them):\n\n${scoreList}\n\nGenerate the feedback text and suggestions based on these scores.\n\nProfile:\n${profileText}`
  }
  return `Analise este perfil LinkedIn. IMPORTANTE: As notas de cada seção já foram determinadas. Use EXATAMENTE estas notas (não mude):\n\n${scoreList}\n\nGere o texto de feedback e sugestões baseado nessas notas.\n\nPerfil:\n${profileText}`
}

async function analyzeWithFixedScores(profileText, settings, lang, targetScores) {
  const { provider, apiKey, model, baseUrl } = settings
  const cleanText = profileText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ').trim()

  if (provider === 'gemini') {
    const modelId = model || 'gemini-2.5-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`
    const payload = {
      system_instruction: { parts: [{ text: getSystemPrompt(lang) }] },
      contents: [{ role: 'user', parts: [{ text: getUserMessageWithScores(cleanText, lang, targetScores) }] }],
      generationConfig: { temperature: 0, topP: 1, topK: 1, responseMimeType: 'application/json' },
    }
    const res = await fetch(`${url}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error?.message || `Error ${res.status}: ${res.statusText}`)
    }
    const data = await res.json()
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text
    const result = JSON.parse(content)
    // Force exact scores even if AI changed them
    if (result.sections && targetScores.length) {
      for (let i = 0; i < Math.min(result.sections.length, targetScores.length); i++) {
        result.sections[i].score = targetScores[i].score
      }
    }
    return result
  }

  // Custom (OpenAI-compatible)
  const url = baseUrl ? `${baseUrl.replace(/\/$/, '')}/chat/completions` : 'https://api.openai.com/v1/chat/completions'
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: model || 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: getSystemPrompt(lang) },
        { role: 'user', content: getUserMessageWithScores(cleanText, lang, targetScores) },
      ],
      temperature: 0, top_p: 1, seed: 42,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Error ${res.status}: ${res.statusText}`)
  }
  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  const result = JSON.parse(content)
  if (result.sections && targetScores.length) {
    for (let i = 0; i < Math.min(result.sections.length, targetScores.length); i++) {
      result.sections[i].score = targetScores[i].score
    }
  }
  return result
}

async function callOpenAI(profileText, apiKey, model, baseUrl, lang) {
  const url = baseUrl
    ? `${baseUrl.replace(/\/$/, '')}/chat/completions`
    : 'https://api.openai.com/v1/chat/completions'

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: getSystemPrompt(lang) },
        { role: 'user', content: getUserMessage(profileText, lang) },
      ],
      temperature: 0,
      top_p: 1,
      seed: 42,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Error ${res.status}: ${res.statusText}`)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  return JSON.parse(content)
}

async function callGemini(profileText, apiKey, model, lang) {
  const modelId = model || 'gemini-2.5-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`

  const cleanText = profileText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ').trim()

  const payload = {
    system_instruction: {
      parts: [{ text: getSystemPrompt(lang) }]
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: getUserMessage(cleanText, lang) }]
      }
    ],
    generationConfig: {
      temperature: 0,
      topP: 1,
      topK: 1,
      responseMimeType: 'application/json',
    },
  }

  const res = await fetch(`${url}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg = err.error?.message || `Error ${res.status}: ${res.statusText}`
    throw new Error(msg)
  }

  const data = await res.json()
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text
  return JSON.parse(content)
}

export async function analyzeProfile(profileText, settings, lang = 'pt') {
  const { provider, apiKey, model, baseUrl } = settings

  if (provider !== 'mock') {
    const textHash = await hashText(`${provider}:${model}:${profileText.trim()}`)
    const cacheKey = `${textHash}:${lang}`
    const cached = analysisCache.get(cacheKey)
    if (cached) return JSON.parse(JSON.stringify(cached))

    // Check if we have result in the OTHER language - reuse scores
    const otherLang = lang === 'pt' ? 'en' : 'pt'
    const otherCacheKey = `${textHash}:${otherLang}`
    const otherCached = analysisCache.get(otherCacheKey)

    let result
    if (otherCached) {
      // We already analyzed this text - re-analyze in new lang but force same scores
      const targetScores = otherCached.sections.map(s => ({ title: s.title, score: s.score }))
      result = await analyzeWithFixedScores(profileText, settings, lang, targetScores)
    } else {
      switch (provider) {
        case 'gemini':
          if (!apiKey) throw new Error(t(lang, 'geminiKeyError'))
          result = await callGemini(profileText, apiKey, model, lang)
          break
        case 'custom':
          if (!baseUrl) throw new Error(t(lang, 'customUrlError'))
          result = await callOpenAI(profileText, apiKey, model, baseUrl, lang)
          break
        default:
          throw new Error('Unknown provider')
      }
    }

    analysisCache.set(cacheKey, JSON.parse(JSON.stringify(result)))
    return result
  }

  await new Promise((r) => setTimeout(r, 2000 + Math.random() * 1500))
  return getMockAnalysis(lang)
}
