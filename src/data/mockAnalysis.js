const MOCK_PT = {
  overallScore: 68,
  summary:
    'Seu perfil está acima da média, mas tem oportunidades claras de melhoria. A headline é genérica e não diferencia você. A seção Sobre tem boa extensão mas falta storytelling. Experiências precisam de métricas concretas.',
  sections: [
    {
      title: '🎯 Headline',
      score: 55,
      status: 'Precisa melhorar',
      feedback:
        'Headline genérica com pipe separators ("|"). Não comunica seu diferencial nem o valor que você entrega. "Apaixonado por tecnologia" é clichê e não agrega.',
      suggestion:
        'Engenheiro de Software que transforma requisitos complexos em sistemas escaláveis: React, Node.js & Cloud',
    },
    {
      title: '📝 Sobre (About)',
      score: 72,
      status: 'Bom, pode melhorar',
      feedback:
        'Extensão adequada (150+ palavras). Falta um hook forte na primeira linha, essa é a parte visível antes do "ver mais". Pouca menção a resultados concretos.',
      suggestion:
        'Nos últimos 5 anos, ajudei empresas a escalar suas plataformas web atendendo milhões de usuários. Minha especialidade é pegar sistemas legados e transformá-los em arquiteturas modernas, com React no front, Node.js no back e infraestrutura cloud-native na AWS.',
    },
    {
      title: '💼 Experiência',
      score: 60,
      status: 'Precisa melhorar',
      feedback:
        'Descreve responsabilidades, não conquistas. Faltam números, métricas e impacto real. "Liderança técnica" e "migração de monolito" são bons temas, mas precisam de dados.',
      suggestion:
        'Liderança técnica de squad com 5 devs, entregando 12 features/quarter com 99.5% de uptime. Migração de monolito para 8 microsserviços que reduziu o deploy time de 4h para 15min.',
    },
    {
      title: '🛠 Habilidades',
      score: 78,
      status: 'Bom',
      feedback:
        'Lista sólida de tecnologias relevantes. Considere adicionar soft skills e ferramentas de produtividade. Ordene por relevância para o cargo que busca.',
      suggestion: null,
    },
  ],
  tips: [
    'Use números sempre que possível: "5 anos" é melhor que "vários anos"',
    'Primeira linha do Sobre deve ter um hook, é o que aparece antes do "ver mais"',
    'Remova "apaixonado por tecnologia", todo dev diz isso, não diferencia',
    'Adicione um CTA no final do Sobre, tipo "Vamos conversar? Me chama no DM"',
    'Peça recomendações de colegas, perfis com 5+ recomendações rankeiam melhor',
    'Publique ao menos 1 post por semana, o algoritmo favorece criadores ativos',
  ],
}

const MOCK_EN = {
  overallScore: 68,
  summary:
    'Your profile is above average, but there are clear improvement opportunities. The headline is generic and does not set you apart. The About section has good length but lacks storytelling. Experiences need concrete metrics.',
  sections: [
    {
      title: '🎯 Headline',
      score: 55,
      status: 'Needs improvement',
      feedback:
        'Generic headline with pipe separators ("|"). Does not communicate your differentiator or the value you deliver. "Passionate about technology" is a cliche and adds nothing.',
      suggestion:
        'Software Engineer turning complex requirements into scalable systems: React, Node.js & Cloud',
    },
    {
      title: '📝 About',
      score: 72,
      status: 'Good, can improve',
      feedback:
        'Adequate length (150+ words). Missing a strong hook in the first line, which is the visible part before "see more". Few mentions of concrete results.',
      suggestion:
        'Over the last 5 years, I helped companies scale their web platforms serving millions of users. My specialty is taking legacy systems and turning them into modern architectures with React on the front, Node.js on the back, and cloud-native infrastructure on AWS.',
    },
    {
      title: '💼 Experience',
      score: 60,
      status: 'Needs improvement',
      feedback:
        'Describes responsibilities, not achievements. Missing numbers, metrics, and real impact. "Technical leadership" and "monolith migration" are good topics, but need data.',
      suggestion:
        'Technical leadership of a 5-dev squad, delivering 12 features/quarter with 99.5% uptime. Monolith migration to 8 microservices that reduced deploy time from 4h to 15min.',
    },
    {
      title: '🛠 Skills',
      score: 78,
      status: 'Good',
      feedback:
        'Solid list of relevant technologies. Consider adding soft skills and productivity tools. Sort by relevance for the role you are targeting.',
      suggestion: null,
    },
  ],
  tips: [
    'Use numbers whenever possible: "5 years" is better than "several years"',
    'First line of About should have a hook, it is what shows before "see more"',
    'Remove "passionate about technology", every dev says it, it does not differentiate',
    'Add a CTA at the end of About, like "Let\'s chat? Send me a DM"',
    'Request recommendations from colleagues, profiles with 5+ rank better',
    'Post at least once a week, the algorithm favors active creators',
  ],
}

export function getMockAnalysis(lang) {
  return lang === 'en' ? { ...MOCK_EN } : { ...MOCK_PT }
}

export const MOCK_ANALYSIS = MOCK_PT
