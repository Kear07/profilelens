# ProfileLens

> Analyze your LinkedIn profile with AI and get a detailed score with improvement suggestions.

[![CI](https://github.com/Kear07/profilelens/actions/workflows/ci.yml/badge.svg)](https://github.com/Kear07/profilelens/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)
![License](https://img.shields.io/github/license/Kear07/profilelens)
![Tests](https://img.shields.io/badge/tests-27%20passing-brightgreen)
![Mobile](https://img.shields.io/badge/mobile-optimized-A29BFE)

**Live:** [kear07.github.io/profilelens](https://kear07.github.io/profilelens/)

## What it does

Upload your LinkedIn PDF (or paste the text) and get:

- **Overall score** (0-100) with visual breakdown per section
- **Detailed analysis** of 6 dimensions: Headline, About, Experience, Skills & Endorsements, Education & Certifications, Strategic Positioning
- **Accordion sections**: click to expand feedback and suggestions, keeping the view clean
- **Rewrite suggestions**: ready-to-paste text, not vague tips
- **Actionable tips**: what to change first for maximum impact
- **User counter**: live count of *real* profile analyses (demo runs are excluded)
- **Bilingual**: full PT-BR and EN support with one-click flag toggle
- **Mobile-first**: bottom-sheet settings, full-width CTAs, no auto-zoom on input focus, safe-area aware

## How it works

1. On LinkedIn, click **More** > **Save to PDF**
2. Drag the PDF into ProfileLens (or paste text manually)
3. Pick your AI provider in Settings
4. Get the full analysis

## AI Providers

Your data stays in the browser. API keys are stored locally, never sent to any server.

| Provider | Models | Cost |
|----------|--------|------|
| **Google Gemini** | Gemini 2.5 Flash, 2.5 Pro, 2.0 Flash, 2.0 Flash-Lite + custom model input | Free tier available |
| **Custom** | Any OpenAI-compatible API (OpenAI, Anthropic via proxy, Ollama, LM Studio, etc.) | Varies |
| **Demo** | Mock result to test the interface | Free |

The Gemini selector shows 4 curated models by default. You can also type any valid Gemini model ID manually — it's validated against the API before saving (must exist and support text generation).

## Scoring

The overall score is a weighted average calculated client-side:

| Section | Weight |
|---------|--------|
| Experience | 25% |
| About (Summary) | 20% |
| Headline | 20% |
| Strategic Positioning | 15% |
| Skills & Endorsements | 10% |
| Education & Certifications | 10% |

Results are cached per profile text (SHA-256 hash) in both memory and localStorage, so re-analyzing the same profile returns consistent scores.

## Running locally

```bash
git clone https://github.com/Kear07/profilelens.git
cd profilelens
npm install
npm run dev
```

Open `http://localhost:5173`

## Testing

```bash
npm test          # run all tests
npm run test:watch # watch mode
npm run lint       # ESLint
```

27 unit tests covering:
- `calcOverallScore` (weighted average, edge cases, language parity)
- AI response parsing (Gemini and OpenAI-compatible formats)
- Schema validation (sections, scores, tips)
- i18n (both languages, fallback behavior)

## Project structure

```
src/
├── __tests__/
│   ├── calcOverallScore.test.js   # Score calculation tests
│   ├── parseAIResponse.test.js    # AI response parsing + schema validation
│   ├── i18n.test.js               # Translation tests
│   └── setup.js                   # Test setup (jsdom)
├── components/
│   ├── Hero.jsx            # Landing page
│   ├── ProfileInput.jsx    # Tabs: upload PDF or paste text
│   ├── FileUpload.jsx      # Drag & drop PDF with gradient border
│   ├── Settings.jsx        # AI provider configuration panel
│   ├── Loading.jsx         # Animated loading with glow ring
│   ├── Results.jsx         # Score + breakdown + suggestions
│   ├── ScoreRing.jsx       # Animated score ring
│   └── SectionCard.jsx     # Accordion section card (click to expand)
├── hooks/
│   └── useAnalysis.js      # Analysis hook + weighted score calculation
├── services/
│   ├── analyzer.js         # Unified provider caller + persistent cache
│   ├── counter.js          # User counter via counterapi.dev
│   ├── geminiModels.js     # Dynamic model fetch, allowlist + custom validation
│   └── pdfParser.js        # Client-side PDF extraction with retry
├── data/
│   └── mockAnalysis.js     # Bilingual mock data for demo mode
├── i18n.js                 # PT-BR / EN translation system
├── App.jsx
├── App.css
└── main.jsx
```

## Security

- **CSP** locked down via `<meta>`: only allowlisted provider domains in `connect-src`, `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`
- **Custom provider URL** validated against a hardcoded allowlist of trusted AI vendors (OpenAI, Anthropic, Groq, OpenRouter, Together, Fireworks, Mistral, Perplexity, DeepSeek)
- **Rate limiting** in two places: 30s between analyses (client-side) and 30s between counter increments (anti-spam)
- **Session-only API key**: never persisted to localStorage; `apiKey` is stripped from saved settings and cleared automatically when `baseUrl` changes
- **Sensitive storage cleanup** on `beforeunload`: cached results and model lists are purged when the user leaves
- **Prompt-injection hardening**: the system prompt explicitly instructs the model to treat profile text as data, never as instructions
- `dangerouslySetInnerHTML` used only with hardcoded i18n strings (never user input)

## Privacy

- Your data **never leaves the browser**: API calls go directly from client to provider
- PDF is processed locally via pdf.js, no upload to any server
- API keys are kept in sessionStorage and wiped between sessions (re-entry required)
- Zero backend: this is a static site hosted on GitHub Pages

## Architecture highlights

- **Layered cache**: in-memory `Map` (LRU, max 10 entries) → sessionStorage (24h TTL, LRU) — same profile = same scores, every time
- **Cross-language reuse**: re-analyzing in the other language reuses the per-section scores so PT and EN stay consistent
- **Race-condition safe**: every `analyze()` call gets a monotonic ID; stale responses are discarded
- **Provider fallback**: if a Gemini model is overloaded, automatic retry with exponential backoff (5s → 15s → 30s → 45s) then fallback to `gemini-2.5-flash`
- **Lazy PDF parsing**: `pdfjs-dist` is a dynamic import with retry, so the initial bundle stays lean

## Tech stack

- React 18 + Vite 6
- pdf.js (client-side PDF parsing, lazy loaded with retry)
- Vitest + Testing Library (unit tests)
- ESLint (code quality)
- GitHub Actions CI (lint + test on every push/PR)
- Pure CSS with custom properties (zero UI dependencies)
- SVG icons + SVG favicon (sharp at every DPI)
- Mobile-first responsive: 640px / 380px breakpoints + `hover: none` for touch devices
- Dark theme only (high-contrast, WCAG AA on body text)

## License

[MIT](LICENSE)
