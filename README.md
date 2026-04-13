# ProfileLens

> Analyze your LinkedIn profile with AI and get a detailed score with improvement suggestions.

[![CI](https://github.com/Kear07/profilelens/actions/workflows/ci.yml/badge.svg)](https://github.com/Kear07/profilelens/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)
![License](https://img.shields.io/github/license/Kear07/profilelens)
![Tests](https://img.shields.io/badge/tests-27%20passing-brightgreen)

**Live:** [kear07.github.io/profilelens](https://kear07.github.io/profilelens/)

## What it does

Upload your LinkedIn PDF (or paste the text) and get:

- **Overall score** (0-100) with visual breakdown per section
- **Detailed analysis** of 6 dimensions: Headline, About, Experience, Skills & Endorsements, Education & Certifications, Strategic Positioning
- **Accordion sections**: click to expand feedback and suggestions, keeping the view clean
- **Rewrite suggestions**: ready-to-paste text, not vague tips
- **Actionable tips**: what to change first for maximum impact
- **User counter**: live count of profiles analyzed (via counterapi.dev)
- **Bilingual**: full PT-BR and EN support with one-click flag toggle

## How it works

1. On LinkedIn, click **More** > **Save to PDF**
2. Drag the PDF into ProfileLens (or paste text manually)
3. Pick your AI provider in Settings
4. Get the full analysis

## AI Providers

Your data stays in the browser. API keys are stored locally, never sent to any server.

| Provider | Models | Cost |
|----------|--------|------|
| **Google Gemini** | Gemini 2.5 Flash, 2.5 Pro, 2.5 Flash-Lite, 3 Flash, 3.1 Pro, 3.1 Flash-Lite | Free tier available |
| **Custom** | Any OpenAI-compatible API (OpenAI, Anthropic via proxy, Ollama, LM Studio, etc.) | Varies |
| **Demo** | Mock result to test the interface | Free |

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
│   └── pdfParser.js        # Client-side PDF extraction with retry
├── data/
│   └── mockAnalysis.js     # Bilingual mock data for demo mode
├── i18n.js                 # PT-BR / EN translation system
├── App.jsx
├── App.css
└── main.jsx
```

## Security

- Content Security Policy (CSP) enforced via meta tag
- Zero `innerHTML`, `dangerouslySetInnerHTML`, or `eval()`
- API key input uses `type="password"`
- No backend, no data collection, no tracking

## Privacy

- Your data **never leaves the browser**: API calls go directly from client to provider
- PDF is processed locally via pdf.js, no upload to any server
- API keys stay in localStorage on your machine only
- Zero backend: this is a static site hosted on GitHub Pages

## Tech stack

- React 19 + Vite 6
- pdf.js (client-side PDF parsing, lazy loaded with retry)
- Vitest + Testing Library (unit tests)
- ESLint (code quality)
- GitHub Actions CI (lint + test on every push/PR)
- Pure CSS with custom properties (zero UI dependencies)
- SVG icons (no emoji in the interface)
- 100% responsive, dark theme

## License

[MIT](LICENSE)
