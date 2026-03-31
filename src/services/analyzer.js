import { MOCK_ANALYSIS } from '../data/mockAnalysis'

function getSystemPrompt() {
  const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
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

Seções obrigatórias: Headline, Sobre (About), Experiência, Habilidades, Presença Visual.

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

async function callOpenAI(profileText, apiKey, model, baseUrl) {
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
        { role: 'system', content: getSystemPrompt() },
        { role: 'user', content: `Analise este perfil LinkedIn:\n\n${profileText}` },
      ],
      temperature: 0,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Erro ${res.status}: ${res.statusText}`)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  return JSON.parse(content)
}

async function callGemini(profileText, apiKey, model) {
  const modelId = model || 'gemini-2.5-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`

  const cleanText = profileText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ').trim()

  const payload = {
    system_instruction: {
      parts: [{ text: getSystemPrompt() }]
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: `Analise este perfil LinkedIn:\n\n${cleanText}` }]
      }
    ],
    generationConfig: {
      temperature: 0,
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
    const msg = err.error?.message || `Erro ${res.status}: ${res.statusText}`
    throw new Error(msg)
  }

  const data = await res.json()
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text
  return JSON.parse(content)
}

export async function analyzeProfile(profileText, settings) {
  const { provider, apiKey, model, baseUrl } = settings

  switch (provider) {
    case 'gemini':
      if (!apiKey) throw new Error('Configure sua Gemini API Key em ⚙ (grátis em aistudio.google.com)')
      return callGemini(profileText, apiKey, model)

    case 'custom':
      if (!baseUrl) throw new Error('Configure a URL base da API em ⚙')
      return callOpenAI(profileText, apiKey, model, baseUrl)

    case 'mock':
    default:
      await new Promise((r) => setTimeout(r, 2000 + Math.random() * 1500))
      return { ...MOCK_ANALYSIS }
  }
}
