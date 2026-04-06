import { getMockAnalysis } from '../data/mockAnalysis'
import { t } from '../i18n'

const analysisCache = new Map()
const STORAGE_PREFIX = 'profilelens-result-'

function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key)
    if (!raw) return null
    return JSON.parse(raw)
  } catch { return null }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data))
  } catch { /* quota exceeded, ignore */ }
}

async function hashText(text) {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function getSystemPrompt(lang) {
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

  if (lang === 'en') {
    return `You are ProfileLens, a senior LinkedIn strategist and personal branding consultant who has optimized 10,000+ profiles for executives, tech leaders, and professionals across industries. You combine recruiter insights, LinkedIn algorithm knowledge, and copywriting expertise.

Today's date is ${today}. Use this to evaluate experience dates. Future dates relative to today are NOT errors, they mean current/ongoing position.

Analyze the provided profile and return a JSON with EXACTLY this structure:
{
  "overallScore": 0,
  "summary": "<executive summary: what a recruiter sees in 6 seconds, biggest strength, biggest gap, and one high-impact quick win>",
  "sections": [
    {
      "title": "<emoji + section name>",
      "score": <number 0-100>,
      "status": "<short status phrase>",
      "feedback": "<detailed, specific analysis with concrete examples from the profile. Reference actual text when pointing out issues. Explain WHY something matters from a recruiter's perspective.>",
      "suggestion": "<complete rewrite of the section, ready to copy-paste. Not a vague tip, a fully written replacement. null only if score >= 85>"
    }
  ],
  "tips": ["<actionable tip with specific example>", ...]
}

REQUIRED SECTIONS (analyze ALL of these):
1. Headline: Does it communicate value proposition in 120 chars? Uses keywords recruiters search for? Avoids cliches like "passionate", "motivated", "guru"?
2. About (Summary): Strong hook in first 3 lines (visible before "see more")? Tells a story with trajectory? Includes measurable achievements? Has a clear CTA? Optimal length 1500-2000 chars?
3. Experience: Quantified achievements (revenue, %, users, team size)? Uses action verbs (led, built, scaled, reduced)? Shows career progression? Avoids job description copy-paste?
4. Skills & Endorsements: Top 3 skills aligned with target role? 50+ endorsements on key skills? Mix of hard and soft skills?
5. Education & Certifications: Relevant certifications listed? Continuing education signals?
6. Strategic Positioning: Overall narrative coherence. Does headline + about + experience tell one consistent story? Is the target audience clear? Would a recruiter understand what this person wants in 10 seconds?

SCORING CRITERIA (calibrate strictly, most profiles score 40-70):
- 90-100: Top 1%. Professionally crafted. Clear personal brand. Strong social proof. Ready for C-level or senior leadership roles.
- 75-89: Strong profile. Clear positioning, good metrics, minor polish needed. Top 10% of LinkedIn.
- 60-74: Above average. Has good foundation but missing key elements (metrics, hook, keywords). Most mid-career professionals land here.
- 45-59: Average. Generic language, few metrics, unclear positioning. Blends in with thousands of similar profiles. Recruiters scroll past.
- 30-44: Below average. Major gaps: missing sections, copy-pasted job descriptions, no achievements. Looks like a resume dump.
- 0-29: Minimal effort. Mostly empty or placeholder content.

EVALUATION DIMENSIONS (weight each):
- Recruiter Findability: Keywords, SEO, skills alignment (how likely to appear in recruiter searches)
- First Impression: Headline + first 3 lines of About (the "6-second test")
- Credibility: Metrics, achievements, social proof, recommendations mentioned
- Differentiation: What makes this person unique vs. 1000 others with same title?
- Call to Action: Is it clear what the person wants? (new role, clients, partnerships, visibility)
- Completeness: All sections filled? Profile strength signals to LinkedIn algorithm?

WRITING STYLE FOR SUGGESTIONS:
- Write as a consultant delivering a report, not a chatbot
- Be specific: reference actual text from the profile, not generic advice
- Every suggestion must be a COMPLETE rewrite, ready to copy-paste
- Use power verbs: orchestrated, spearheaded, architected, scaled, transformed
- Include placeholder brackets [X] only for numbers the user needs to fill in

MANDATORY RULES:
- NEVER use the em dash character. Use commas, periods, colons, or semicolons instead.
- All text in the JSON MUST be in English.
- Respond ONLY with valid JSON, no markdown, no explanation, no code fences.
- tips array must have 6-8 actionable items, each specific to THIS profile.`
  }

  return `Você é o ProfileLens, um estrategista sênior de LinkedIn e consultor de marca pessoal que já otimizou mais de 10.000 perfis para executivos, líderes de tecnologia e profissionais de diversas indústrias. Você combina insights de recrutadores, conhecimento do algoritmo do LinkedIn e expertise em copywriting.

A data de hoje é ${today}. Use isso para avaliar datas de experiências. Datas futuras relativas a hoje NÃO são erro, significam posição atual/em andamento.

Analise o perfil fornecido e retorne um JSON com EXATAMENTE esta estrutura:
{
  "overallScore": 0,
  "summary": "<resumo executivo: o que um recrutador vê em 6 segundos, maior ponto forte, maior lacuna, e uma melhoria rápida de alto impacto>",
  "sections": [
    {
      "title": "<nome da seção>",
      "score": <número 0-100>,
      "status": "<frase curta de status>",
      "feedback": "<análise detalhada e específica com exemplos concretos do perfil. Referencie texto real ao apontar problemas. Explique POR QUE algo importa da perspectiva de um recrutador.>",
      "suggestion": "<reescrita completa da seção, pronta para copiar e colar. Não uma dica vaga, mas um texto substituto completo. null apenas se score >= 85>"
    }
  ],
  "tips": ["<dica acionável com exemplo específico>", ...]
}

SEÇÕES OBRIGATÓRIAS (analise TODAS):
1. Headline: Comunica proposta de valor em 120 caracteres? Usa palavras-chave que recrutadores buscam? Evita clichês como "apaixonado", "motivado", "guru"?
2. Sobre (About): Hook forte nas 3 primeiras linhas (visíveis antes do "ver mais")? Conta uma história com trajetória? Inclui conquistas mensuráveis? Tem CTA claro? Tamanho ideal 1500-2000 caracteres?
3. Experiência: Conquistas quantificadas (receita, %, usuários, tamanho de equipe)? Usa verbos de ação (liderou, construiu, escalou, reduziu)? Mostra progressão de carreira? Evita copiar descrição de cargo?
4. Habilidades e Recomendações: Top 3 skills alinhadas com cargo-alvo? 50+ recomendações nas skills principais? Mix de hard e soft skills?
5. Formação e Certificações: Certificações relevantes listadas? Sinais de educação continuada?
6. Posicionamento Estratégico: Coerência narrativa geral. Headline + sobre + experiência contam uma história consistente? O público-alvo é claro? Um recrutador entenderia o que essa pessoa quer em 10 segundos?

CRITÉRIOS DE PONTUAÇÃO (calibre rigorosamente, a maioria dos perfis fica entre 40-70):
- 90-100: Top 1%. Profissionalmente elaborado. Marca pessoal clara. Forte prova social. Pronto para cargos C-level ou liderança sênior.
- 75-89: Perfil forte. Posicionamento claro, boas métricas, precisa de polimento. Top 10% do LinkedIn.
- 60-74: Acima da média. Boa base mas faltam elementos-chave (métricas, hook, palavras-chave). A maioria dos profissionais mid-career fica aqui.
- 45-59: Mediano. Linguagem genérica, poucas métricas, posicionamento confuso. Se mistura com milhares de perfis similares. Recrutadores passam reto.
- 30-44: Abaixo da média. Lacunas grandes: seções faltando, descrições de cargo copiadas, sem conquistas. Parece um currículo jogado no LinkedIn.
- 0-29: Esforço mínimo. Conteúdo vazio ou placeholder.

DIMENSÕES DE AVALIAÇÃO (considere cada uma):
- Encontrabilidade: Palavras-chave, SEO, alinhamento de skills (probabilidade de aparecer em buscas de recrutadores)
- Primeira Impressão: Headline + 3 primeiras linhas do Sobre (o "teste de 6 segundos")
- Credibilidade: Métricas, conquistas, prova social, recomendações mencionadas
- Diferenciação: O que torna essa pessoa única vs. 1000 outros com o mesmo título?
- Call to Action: Está claro o que a pessoa quer? (nova vaga, clientes, parcerias, visibilidade)
- Completude: Todas as seções preenchidas? Sinais de força do perfil para o algoritmo do LinkedIn?

ESTILO DE ESCRITA PARA SUGESTÕES:
- Escreva como um consultor entregando um relatório, não como um chatbot
- Seja específico: referencie texto real do perfil, não conselhos genéricos
- Toda sugestão deve ser uma REESCRITA COMPLETA, pronta para copiar e colar
- Use verbos de impacto: orquestrou, liderou, arquitetou, escalou, transformou
- Inclua colchetes [X] apenas para números que o usuário precisa preencher

REGRAS OBRIGATÓRIAS:
- NUNCA use o caractere travessão (—). Use vírgula, ponto, dois-pontos ou ponto e vírgula no lugar.
- Responda APENAS com JSON válido, sem markdown, sem explicação, sem code fences.
- O array tips deve ter 6-8 itens acionáveis, cada um específico para ESTE perfil.`
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

// Unified provider call: handles Gemini and OpenAI-compatible APIs
async function callProvider(provider, apiKey, model, baseUrl, systemPrompt, userMessage) {
  if (provider === 'gemini') {
    const modelId = model || 'gemini-2.5-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`
    const cleanMsg = userMessage.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ').trim()

    const res = await fetch(`${url}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: cleanMsg }] }],
        generationConfig: { temperature: 0, topP: 1, topK: 1, responseMimeType: 'application/json' },
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error?.message || `Error ${res.status}: ${res.statusText}`)
    }

    const data = await res.json()
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text
    return JSON.parse(content)
  }

  // OpenAI-compatible (custom provider)
  const url = baseUrl ? `${baseUrl.replace(/\/$/, '')}/chat/completions` : 'https://api.openai.com/v1/chat/completions'

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: model || 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
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
  return JSON.parse(content)
}

function forceScores(result, targetScores) {
  if (result.sections && targetScores.length) {
    for (let i = 0; i < Math.min(result.sections.length, targetScores.length); i++) {
      result.sections[i].score = targetScores[i].score
    }
  }
  return result
}

export async function analyzeProfile(profileText, settings, lang = 'pt') {
  const { provider, apiKey, model, baseUrl } = settings

  if (provider === 'mock') {
    await new Promise((r) => setTimeout(r, 2000 + Math.random() * 1500))
    return getMockAnalysis(lang)
  }

  const textHash = await hashText(`${provider}:${model}:${profileText.trim()}`)
  const cacheKey = `${textHash}:${lang}`

  // Memory cache first
  const cached = analysisCache.get(cacheKey)
  if (cached) return JSON.parse(JSON.stringify(cached))

  // localStorage fallback (survives clear + re-analyze)
  const stored = loadFromStorage(cacheKey)
  if (stored) {
    analysisCache.set(cacheKey, stored)
    return JSON.parse(JSON.stringify(stored))
  }

  // Check if we have result in the OTHER language: reuse scores
  const otherLang = lang === 'pt' ? 'en' : 'pt'
  const otherCacheKey = `${textHash}:${otherLang}`
  const otherCached = analysisCache.get(otherCacheKey)

  const systemPrompt = getSystemPrompt(lang)
  let result

  if (otherCached) {
    const targetScores = otherCached.sections.map(s => ({ title: s.title, score: s.score }))
    const userMsg = getUserMessageWithScores(profileText, lang, targetScores)
    result = forceScores(await callProvider(provider, apiKey, model, baseUrl, systemPrompt, userMsg), targetScores)
  } else {
    if (provider === 'gemini' && !apiKey) throw new Error(t(lang, 'geminiKeyError'))
    if (provider === 'custom' && !baseUrl) throw new Error(t(lang, 'customUrlError'))

    const userMsg = getUserMessage(profileText, lang)
    result = await callProvider(provider, apiKey, model, baseUrl, systemPrompt, userMsg)
  }

  analysisCache.set(cacheKey, JSON.parse(JSON.stringify(result)))
  saveToStorage(cacheKey, result)
  return result
}
