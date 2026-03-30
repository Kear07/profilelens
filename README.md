# ◉ ProfileLens

> Analise seu perfil LinkedIn com IA e receba um score detalhado com sugestões de melhoria.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

## O que faz

Faça upload do PDF do seu perfil LinkedIn (ou cole o texto) e receba:

- **Score geral** (0-100) com breakdown visual por seção
- **Análise detalhada** — Headline, Sobre, Experiência, Habilidades, Presença Visual
- **Sugestões de reescrita** — texto pronto pra copiar e colar
- **Dicas acionáveis** — o que mudar primeiro pra ter mais impacto

## Como funciona

1. No LinkedIn, clique em **Mais** → **Salvar como PDF**
2. Arraste o PDF para o ProfileLens (ou cole o texto manualmente)
3. Escolha sua IA preferida em ⚙
4. Receba a análise completa

## Multi-provider IA

Escolha o provider que preferir — seus dados ficam no navegador, a API key nunca é armazenada em servidor.

| Provider | Modelos | Custo |
|----------|---------|-------|
| **Google Gemini** | Gemini 2.5 Flash, 2.5 Pro, 2.0 Flash, 2.0 Flash-Lite | Grátis (free tier) |
| **OpenAI** | GPT-4.1, GPT-4.1-mini, GPT-4.1-nano, GPT-4o, GPT-4o-mini | Pago |
| **Anthropic (Claude)** | Claude Sonnet 4, Claude Haiku 4 | Pago |
| **Ollama** | Llama 3.3, Gemma 3, Mistral, Phi-4, Qwen3, DeepSeek-R1 | Grátis (local) |
| **Custom** | Qualquer API compatível com formato OpenAI | Variável |
| **Demo** | Resultado mockado pra testar a interface | Grátis |

## Pontuação

O score geral é calculado no client como média ponderada fixa:

| Seção | Peso |
|-------|------|
| Experiência | 30% |
| Sobre (About) | 25% |
| Headline | 20% |
| Habilidades | 15% |
| Presença Visual | 10% |

## Rodando local

```bash
git clone https://github.com/seu-usuario/profilelens.git
cd profilelens
npm install
npm run dev
```

Acesse `http://localhost:3000`

## Deploy

```bash
npm run build
```

A pasta `dist/` está pronta pra deploy em qualquer host estático (Vercel, Netlify, GitHub Pages).

### Deploy no Vercel (1 clique)

1. Push o repo pro GitHub
2. Acesse [vercel.com/new](https://vercel.com/new)
3. Importe o repo → Deploy automático

## Estrutura

```
src/
├── components/
│   ├── Hero.jsx          # Landing page
│   ├── ProfileInput.jsx  # Tabs: upload PDF ou colar texto
│   ├── FileUpload.jsx    # Drag & drop de PDF
│   ├── Settings.jsx      # Painel multi-provider (Gemini, OpenAI, Claude, Ollama, Custom)
│   ├── Loading.jsx       # Tela de loading animada
│   ├── Results.jsx       # Score + breakdown + sugestões
│   ├── ScoreRing.jsx     # Ring animado do score
│   └── SectionCard.jsx   # Card de cada seção analisada
├── hooks/
│   └── useAnalysis.js    # Hook de análise + cálculo de score ponderado
├── services/
│   ├── analyzer.js       # Multi-provider: Gemini, OpenAI, Claude, Ollama, Custom, Mock
│   └── pdfParser.js      # Extração de texto de PDF (pdfjs-dist, client-side)
├── data/
│   └── mockAnalysis.js   # Dados mock para modo demo
├── App.jsx
├── App.css
└── main.jsx
```

## Privacidade

- Seus dados **nunca saem do navegador** — a chamada de API é feita direto do client
- O PDF é processado localmente via pdf.js — nenhum upload pra servidor
- API keys ficam apenas na memória da sessão — não são persistidas
- Nenhum dado é enviado a servidores próprios — zero backend

## Tech

- React 18 + Vite 6
- pdf.js (parsing de PDF client-side, lazy loaded)
- CSS puro (zero dependências de UI)
- ~54KB gzipped (core) + ~103KB (pdf.js, carregado sob demanda)
- 100% responsivo, dark theme

## Licença

MIT
