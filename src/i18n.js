const translations = {
  pt: {
    // Topbar
    settings: 'Configurar IA',

    // Hero
    heroTitle1: 'Analise seu perfil LinkedIn',
    heroTitle2: 'com inteligência artificial',
    heroSubtitle: 'Descubra em 30 segundos o que recrutadores realmente pensam do seu perfil. Score detalhado + sugestões prontas pra copiar.',
    heroChips: ['Score detalhado', 'Sugestões reescritas', '100% no navegador'],
    heroBtn: 'Ver meu score grátis',
    heroProviders: ['Funciona com ', 'Gemini (grátis)', ' ou qualquer API compatível'],

    // How it works
    howTitle: 'Como funciona',
    howStep1Label: 'Cole seu perfil',
    howStep1Desc: 'Texto ou PDF do LinkedIn',
    howStep2Label: 'IA analisa',
    howStep2Desc: '6 dimensões avaliadas',
    howStep3Label: 'Receba sugestões',
    howStep3Desc: 'Textos prontos pra copiar',

    // Input
    back: 'Voltar',
    yourProfile: 'Seu perfil',
    inputSubtitle: 'Cole o texto ou suba o PDF exportado do LinkedIn',
    tabPdf: 'Upload PDF',
    tabText: 'Colar texto',
    demoBadge: 'Modo demo ativo: cole qualquer texto e veja um resultado de exemplo',
    demoTitle: 'Modo demonstração',
    demoDesc: 'Veja como funciona a análise com dados de exemplo. Nenhuma API key necessária.',
    demoBtn: 'Ver exemplo',
    demoHint: 'Configure uma API key em Configurações para analisar seu perfil real',
    pdfLockedTooltip: 'Upload de PDF requer uma IA conectada. Clique em {settings} (topo direito) e escolha Gemini (grátis) ou Custom.',
    pdfReady: '✓ PDF pronto',
    noFile: 'Nenhum arquivo selecionado',
    readingPdf: 'Lendo PDF...',
    analyzeBtn: 'Analisar perfil',
    chars: 'caracteres',
    min50: '(mínimo 50)',
    placeholder: `Cole aqui o texto do seu perfil LinkedIn. Exemplo:

HEADLINE:
Desenvolvedor Full Stack | React, Node.js, Python

SOBRE:
Profissional com 5 anos de experiência em desenvolvimento web...

EXPERIÊNCIA:
Empresa X - Desenvolvedor Sênior (2022 - atual)
- Liderança técnica de squad com 5 devs...

HABILIDADES:
React, Node.js, TypeScript, Python, AWS, Docker`,

    // File upload
    dragHere: 'Arraste seu PDF aqui',
    orClick: ' ou clique para selecionar',
    pdfHint: 'Perfil LinkedIn salvo como PDF',
    onlyPdf: 'Só aceita PDF. Baixe seu perfil LinkedIn como PDF.',
    fileTooBig: 'Arquivo muito grande (máx 10MB).',
    howToPdf: 'Como baixar o PDF do LinkedIn?',
    howStep1: 'Abra seu perfil no LinkedIn',
    howStep2: 'Clique no botão ',
    howStep2Bold: '"Recursos"',
    howStep2After: ' (abaixo da foto)',
    howStep3: 'Selecione ',
    howStep3Bold: '"Salvar como PDF"',
    howStep4: 'Arraste o arquivo aqui',
    pdfExtractError: 'Não consegui extrair texto do PDF. Tente colar o texto manualmente.',
    pdfNotLinkedin: 'Este PDF não parece ser um perfil LinkedIn. Baixe seu perfil em LinkedIn > Recursos > Salvar como PDF.',
    textNotLinkedin: 'Este texto não parece ser um perfil LinkedIn. Cole o conteúdo do seu perfil (headline, sobre, experiência, habilidades).',
    pdfError: 'Erro ao processar PDF',

    // Loading
    loadingTips: [
      'Analisando sua headline...',
      'Lendo sua experiência...',
      'Avaliando suas habilidades...',
      'Gerando sugestões personalizadas...',
      'Quase lá...',
    ],

    // Results
    overallScore: 'Score geral',
    suggestionLabel: 'SUGESTÃO DE REESCRITA',
    tipsTitle: 'Dicas rápidas',
    analyzeAnother: 'Analisar outro perfil',

    // Settings
    settingsTitle: 'Configurar IA',
    apiKey: 'API Key',
    baseUrl: 'URL Base',
    model: 'Modelo',
    cancel: 'Cancelar',
    save: 'Salvar',
    geminiHint: 'Grátis: pegue sua key em aistudio.google.com/apikey',
    keyPrivacy: 'Sua key fica apenas no navegador, nunca é enviada a terceiros',

    // Footer
    madeBy: 'Feito por',
    privacy: 'Seus dados não saem do navegador',

    // Providers
    providerMockName: 'Demo (sem API)',
    providerMockDesc: 'Resultado de exemplo para testar a interface',
    providerGeminiName: 'Google Gemini',
    providerGeminiDesc: '2.5 Flash (grátis), 2.5 Pro, 3.x Preview',
    providerCustomName: 'Custom (OpenAI-compatible)',
    providerCustomDesc: 'Qualquer API compatível com formato OpenAI',

    // Errors
    geminiKeyError: 'Configure sua Gemini API Key em Configurações (grátis em aistudio.google.com)',
    customUrlError: 'Configure a URL base da API em Configurações',
  },

  en: {
    settings: 'Set up AI',

    heroTitle1: 'Analyze your LinkedIn profile',
    heroTitle2: 'with artificial intelligence',
    heroSubtitle: 'Find out in 30 seconds what recruiters really think of your profile. Detailed score + ready-to-paste suggestions.',
    heroChips: ['Detailed score', 'Rewritten suggestions', '100% in browser'],
    heroBtn: 'See my score for free',
    heroProviders: ['Works with ', 'Gemini (free)', ' or any compatible API'],

    howStep1Label: 'Paste your profile',
    howStep1Desc: 'Text or LinkedIn PDF',
    howStep2Label: 'AI analyzes',
    howStep2Desc: '6 dimensions evaluated',
    howStep3Label: 'Get suggestions',
    howStep3Desc: 'Ready-to-paste text',
    howTitle: 'How it works',

    back: 'Back',
    yourProfile: 'Your profile',
    inputSubtitle: 'Paste the text or upload your exported LinkedIn PDF',
    tabPdf: 'Upload PDF',
    tabText: 'Paste text',
    demoBadge: 'Demo mode active: paste any text and see a sample result',
    demoTitle: 'Demo mode',
    demoDesc: 'See how the analysis works with sample data. No API key needed.',
    demoBtn: 'See example',
    demoHint: 'Set up an API key in Settings to analyze your real profile',
    pdfLockedTooltip: 'PDF upload requires a connected AI. Click {settings} (top right) and choose Gemini (free) or Custom.',
    pdfReady: '✓ PDF ready',
    noFile: 'No file selected',
    readingPdf: 'Reading PDF...',
    analyzeBtn: 'Analyze profile',
    chars: 'characters',
    min50: '(minimum 50)',
    placeholder: `Paste your LinkedIn profile text here. Example:

HEADLINE:
Full Stack Developer | React, Node.js, Python

ABOUT:
Professional with 5 years of experience in web development...

EXPERIENCE:
Company X - Senior Developer (2022 - present)
- Technical leadership of a 5-dev squad...

SKILLS:
React, Node.js, TypeScript, Python, AWS, Docker`,

    dragHere: 'Drag your PDF here',
    orClick: ' or click to select',
    pdfHint: 'LinkedIn profile saved as PDF',
    onlyPdf: 'Only PDF files. Download your LinkedIn profile as PDF.',
    fileTooBig: 'File too large (max 10MB).',
    howToPdf: 'How to download your LinkedIn PDF?',
    howStep1: 'Open your LinkedIn profile',
    howStep2: 'Click the ',
    howStep2Bold: '"Resources"',
    howStep2After: ' button (below your photo)',
    howStep3: 'Select ',
    howStep3Bold: '"Save to PDF"',
    howStep4: 'Drag the file here',
    pdfExtractError: 'Could not extract text from PDF. Try pasting the text manually.',
    pdfNotLinkedin: 'This PDF does not look like a LinkedIn profile. Download yours at LinkedIn > Resources > Save to PDF.',
    textNotLinkedin: 'This text does not look like a LinkedIn profile. Paste your profile content (headline, about, experience, skills).',
    pdfError: 'Error processing PDF',

    loadingTips: [
      'Analyzing your headline...',
      'Reading your experience...',
      'Evaluating your skills...',
      'Generating personalized suggestions...',
      'Almost there...',
    ],

    overallScore: 'Overall score',
    suggestionLabel: 'REWRITE SUGGESTION',
    tipsTitle: 'Quick tips',
    analyzeAnother: 'Analyze another profile',

    settingsTitle: 'Configure AI',
    apiKey: 'API Key',
    baseUrl: 'Base URL',
    model: 'Model',
    cancel: 'Cancel',
    save: 'Save',
    geminiHint: 'Free: get your key at aistudio.google.com/apikey',
    keyPrivacy: 'Your key stays in your browser only, never sent to third parties',

    madeBy: 'Made by',
    privacy: 'Your data never leaves the browser',

    providerMockName: 'Demo (no API)',
    providerMockDesc: 'Sample result to test the interface',
    providerGeminiName: 'Google Gemini',
    providerGeminiDesc: '2.5 Flash (free), 2.5 Pro, 3.x Preview',
    providerCustomName: 'Custom (OpenAI-compatible)',
    providerCustomDesc: 'Any API compatible with OpenAI format',

    geminiKeyError: 'Set your Gemini API Key in Settings (free at aistudio.google.com)',
    customUrlError: 'Set the API base URL in Settings',
  },
}

export function t(lang, key) {
  return translations[lang]?.[key] ?? translations.pt[key] ?? key
}
