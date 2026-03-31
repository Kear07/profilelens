const MOCK_PT = {
  overallScore: 58,
  summary:
    'Em 6 segundos, um recrutador veria um perfil tecnicamente competente, mas que não se diferencia dos milhares de desenvolvedores com headline similar. Seu maior ponto forte é a experiência real com stack moderna. Maior lacuna: ausência total de métricas e resultados quantificados. Melhoria rápida de alto impacto: reescrever a headline com proposta de valor clara.',
  sections: [
    {
      title: '🎯 Headline',
      score: 40,
      status: 'Abaixo da média',
      feedback:
        'Sua headline "Desenvolvedor Full Stack | React, Node.js, Python" segue o formato mais comum do LinkedIn: cargo + lista de tecnologias com pipes. Isso te coloca no mesmo balde de ~500 mil perfis similares. Recrutadores buscam por keywords, mas decidem clicar pelo diferencial. Não há proposta de valor: o que você resolve? Para quem? Qual seu impacto? "Apaixonado por tecnologia" (se presente) é o clichê n°1 do LinkedIn e sinaliza falta de posicionamento.',
      suggestion:
        'Engenheiro de Software que escala plataformas web para milhões de usuários | React, Node.js, AWS | Ex-[Empresa] | Aberto a oportunidades Senior/Staff',
    },
    {
      title: '📝 Sobre (About)',
      score: 55,
      status: 'Mediano',
      feedback:
        'O Sobre tem extensão razoável, mas as 3 primeiras linhas (visíveis antes do "ver mais") não têm um hook que prenda atenção. Um recrutador decide se expande ou não em 2 segundos. Faltam: (1) número de impacto logo na abertura, (2) história de trajetória (de onde veio, para onde vai), (3) CTA no final (como te encontrar, o que busca). O texto lê como uma lista de habilidades em formato de parágrafo, não como uma narrativa profissional.',
      suggestion:
        'Nos últimos 5 anos, ajudei [N] empresas a escalar suas plataformas de [X] para [Y] milhões de usuários. Minha especialidade: pegar sistemas legados que travam a operação e transformá-los em arquiteturas modernas, escaláveis e observáveis.\n\nHoje como Engenheiro Sênior na [Empresa], lidero um squad de [N] pessoas responsável por [produto/sistema], que processa [volume] transações por dia. Antes disso, na [Empresa anterior], fui o engenheiro principal da migração de monolito para microsserviços que reduziu o tempo de deploy de 4h para 15min.\n\nStack principal: React, Node.js, TypeScript, Python, AWS (ECS, Lambda, DynamoDB), Kafka, Terraform.\n\nBuscando minha próxima oportunidade como Senior/Staff Engineer em produto de alto impacto. Vamos conversar? Me mande uma mensagem.',
    },
    {
      title: '💼 Experiência',
      score: 50,
      status: 'Precisa de métricas',
      feedback:
        'A seção descreve responsabilidades ("liderança técnica de squad", "desenvolvimento de APIs") em vez de conquistas. Um recrutador sênior consegue inferir responsabilidades pelo título do cargo. O que ele NÃO consegue inferir: quanto você impactou. "Migração de monolito para microsserviços" é ótimo tema, mas sem métricas (tempo de deploy antes/depois, uptime, custo) perde 80% do impacto. Também falta progressão visível: por que você mudou de cargo/empresa? O que cresceu?',
      suggestion:
        '[Empresa X] | Engenheiro de Software Sênior | Jan 2022, presente\n\n> Lidero squad de 5 engenheiros responsável pelo [produto], que processa [X]M transações/mês\n\n- Arquitetei a migração de monolito para 8 microsserviços, reduzindo deploy time de 4h para 15min e aumentando uptime de 99.2% para 99.95%\n- Implementei pipeline de CI/CD que cortou o ciclo de release de 2 semanas para deploy contínuo (15+ deploys/semana)\n- Reduzi custo de infraestrutura em [X]% otimizando queries e implementando cache distribuído com Redis\n- Mentorei 3 desenvolvedores juniores, 2 dos quais foram promovidos a pleno em 12 meses',
    },
    {
      title: '🛠 Habilidades e Recomendações',
      score: 65,
      status: 'Bom, falta endosso social',
      feedback:
        'Lista sólida de tecnologias relevantes, o que ajuda na indexação do algoritmo do LinkedIn (recrutadores buscam por skills). Porém: (1) as 3 primeiras skills do perfil definem como você aparece em buscas, verifique se estão alinhadas com seu cargo-alvo; (2) sem recomendações escritas, o perfil perde credibilidade social; (3) faltam soft skills estratégicas (Liderança Técnica, Arquitetura de Sistemas, Mentoria) que sinalizam senioridade.',
      suggestion: null,
    },
    {
      title: '🎓 Formação e Certificações',
      score: 60,
      status: 'Pode fortalecer',
      feedback:
        'Formação acadêmica presente, mas certificações fazem diferença real na indexação e credibilidade: AWS Certified, Google Cloud, ou certificações de arquitetura. Mesmo cursos relevantes (System Design, Kubernetes, etc.) sinalizam aprendizado contínuo. Para o algoritmo do LinkedIn, cada certificação é mais uma keyword indexada.',
      suggestion: null,
    },
    {
      title: '🧭 Posicionamento Estratégico',
      score: 52,
      status: 'Narrativa fragmentada',
      feedback:
        'Headline, Sobre e Experiência não contam uma história coerente. Não fica claro em 10 segundos: (1) o que você faz de melhor, (2) para quem, (3) o que você busca. O perfil tenta ser "Full Stack generalista" quando poderia se posicionar como especialista em algo específico (escalabilidade, migração de legado, liderança técnica). Perfis com posicionamento claro recebem 3x mais visualizações de recrutadores.',
      suggestion: null,
    },
  ],
  tips: [
    'Reescreva a headline HOJE: é a mudança de maior impacto com menor esforço. Formato sugerido: [O que você faz] + [Para quem/com que resultado] + [Stack principal]',
    'Adicione números em TODAS as experiências: "equipe de 5", "99.9% uptime", "3x mais rápido". Recrutadores escaneiam números antes de ler texto',
    'Primeira linha do Sobre precisa de um hook com métrica: "Nos últimos X anos, [resultado impressionante]"',
    'Peça 3 recomendações escritas esta semana: ex-gestores e colegas sênior. Perfis com 5+ recomendações aparecem 2x mais em buscas',
    'Reordene suas skills: as 3 primeiras devem ser as que o cargo-alvo exige. Peça endorsements dos colegas nessas específicas',
    'Adicione pelo menos 1 certificação relevante (AWS, GCP, ou curso de System Design). Cada certificação indexa mais keywords',
    'Publique 1 post técnico por semana (nem que seja um aprendizado curto). O algoritmo favorece criadores ativos e aumenta sua visibilidade em 5x',
    'Adicione um CTA claro no final do Sobre: "Aberto a conversas sobre [X]. Me mande mensagem." Remove a barreira de contato',
  ],
}

const MOCK_EN = {
  overallScore: 58,
  summary:
    'In 6 seconds, a recruiter would see a technically competent profile that does not stand out from thousands of developers with a similar headline. Your biggest strength is real experience with a modern stack. Biggest gap: complete absence of quantified metrics and results. High-impact quick win: rewrite the headline with a clear value proposition.',
  sections: [
    {
      title: '🎯 Headline',
      score: 40,
      status: 'Below average',
      feedback:
        'Your headline "Full Stack Developer | React, Node.js, Python" follows the most common LinkedIn format: title + technology list with pipes. This puts you in the same bucket as ~500K similar profiles. Recruiters search by keywords but decide to click based on differentiation. There is no value proposition: what do you solve? For whom? What is your impact? "Passionate about technology" (if present) is LinkedIn cliche #1 and signals lack of positioning.',
      suggestion:
        'Software Engineer scaling web platforms for millions of users | React, Node.js, AWS | Ex-[Company] | Open to Senior/Staff opportunities',
    },
    {
      title: '📝 About',
      score: 55,
      status: 'Average',
      feedback:
        'The About section has reasonable length, but the first 3 lines (visible before "see more") lack a hook that grabs attention. A recruiter decides whether to expand in 2 seconds. Missing: (1) an impact number right in the opening, (2) a career trajectory story (where you came from, where you are headed), (3) a CTA at the end (how to reach you, what you are looking for). The text reads like a skills list in paragraph format, not a professional narrative.',
      suggestion:
        'Over the last 5 years, I helped [N] companies scale their platforms from [X] to [Y] million users. My specialty: taking legacy systems that bottleneck operations and transforming them into modern, scalable, observable architectures.\n\nToday as a Senior Engineer at [Company], I lead a [N]-person squad responsible for [product/system], processing [volume] transactions per day. Previously at [Former Company], I was the lead engineer on a monolith-to-microservices migration that cut deploy time from 4h to 15min.\n\nCore stack: React, Node.js, TypeScript, Python, AWS (ECS, Lambda, DynamoDB), Kafka, Terraform.\n\nLooking for my next opportunity as a Senior/Staff Engineer on a high-impact product. Let us connect: send me a message.',
    },
    {
      title: '💼 Experience',
      score: 50,
      status: 'Needs metrics',
      feedback:
        'The section describes responsibilities ("technical squad leadership", "API development") instead of achievements. A senior recruiter can infer responsibilities from the job title. What they cannot infer: how much you impacted. "Monolith to microservices migration" is a great topic, but without metrics (deploy time before/after, uptime, cost) it loses 80% of its impact. Career progression is also unclear: why did you change roles/companies? What growth happened?',
      suggestion:
        '[Company X] | Senior Software Engineer | Jan 2022, present\n\n> Leading a 5-engineer squad responsible for [product], processing [X]M transactions/month\n\n- Architected monolith to 8 microservices migration, cutting deploy time from 4h to 15min and improving uptime from 99.2% to 99.95%\n- Implemented CI/CD pipeline that shortened release cycles from 2 weeks to continuous deployment (15+ deploys/week)\n- Reduced infrastructure costs by [X]% by optimizing queries and implementing distributed caching with Redis\n- Mentored 3 junior developers, 2 of whom were promoted to mid-level within 12 months',
    },
    {
      title: '🛠 Skills and Endorsements',
      score: 65,
      status: 'Good, needs social proof',
      feedback:
        'Solid list of relevant technologies, which helps with LinkedIn algorithm indexing (recruiters search by skills). However: (1) the top 3 skills on your profile define how you appear in searches, verify they align with your target role; (2) without written recommendations, the profile lacks social credibility; (3) missing strategic soft skills (Technical Leadership, System Architecture, Mentoring) that signal seniority.',
      suggestion: null,
    },
    {
      title: '🎓 Education and Certifications',
      score: 60,
      status: 'Can strengthen',
      feedback:
        'Academic background is present, but certifications make a real difference in indexing and credibility: AWS Certified, Google Cloud, or architecture certifications. Even relevant courses (System Design, Kubernetes, etc.) signal continuous learning. For the LinkedIn algorithm, each certification is one more indexed keyword.',
      suggestion: null,
    },
    {
      title: '🧭 Strategic Positioning',
      score: 52,
      status: 'Fragmented narrative',
      feedback:
        'Headline, About, and Experience do not tell a coherent story. It is not clear in 10 seconds: (1) what you do best, (2) for whom, (3) what you are looking for. The profile tries to be a "Full Stack generalist" when it could position as a specialist in something specific (scalability, legacy migration, technical leadership). Profiles with clear positioning receive 3x more recruiter views.',
      suggestion: null,
    },
  ],
  tips: [
    'Rewrite the headline TODAY: it is the highest-impact change with the least effort. Suggested format: [What you do] + [For whom/with what result] + [Core stack]',
    'Add numbers to ALL experiences: "team of 5", "99.9% uptime", "3x faster". Recruiters scan for numbers before reading text',
    'First line of About needs a hook with a metric: "Over the last X years, [impressive result]"',
    'Request 3 written recommendations this week: former managers and senior colleagues. Profiles with 5+ recommendations appear 2x more in searches',
    'Reorder your skills: the top 3 should match what the target role requires. Ask colleagues for endorsements on those specific ones',
    'Add at least 1 relevant certification (AWS, GCP, or a System Design course). Each certification indexes more keywords',
    'Publish 1 technical post per week (even a short learning). The algorithm favors active creators and increases your visibility by 5x',
    'Add a clear CTA at the end of About: "Open to conversations about [X]. Send me a message." Removes the contact barrier',
  ],
}

export function getMockAnalysis(lang) {
  return lang === 'en' ? { ...MOCK_EN, sections: MOCK_EN.sections.map(s => ({...s})), tips: [...MOCK_EN.tips] }
    : { ...MOCK_PT, sections: MOCK_PT.sections.map(s => ({...s})), tips: [...MOCK_PT.tips] }
}

export const MOCK_ANALYSIS = MOCK_PT
