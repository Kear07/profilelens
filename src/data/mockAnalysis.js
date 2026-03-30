export const MOCK_ANALYSIS = {
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
        'Engenheiro de Software que transforma requisitos complexos em sistemas escaláveis — React, Node.js & Cloud',
    },
    {
      title: '📝 Sobre (About)',
      score: 72,
      status: 'Bom, pode melhorar',
      feedback:
        'Extensão adequada (150+ palavras). Falta um hook forte na primeira linha — essa é a parte visível antes do "ver mais". Pouca menção a resultados concretos.',
      suggestion:
        'Nos últimos 5 anos, ajudei empresas a escalar suas plataformas web atendendo milhões de usuários. Minha especialidade é pegar sistemas legados e transformá-los em arquiteturas modernas — com React no front, Node.js no back e infraestrutura cloud-native na AWS.',
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
    {
      title: '📸 Presença Visual',
      score: 70,
      status: 'Razoável',
      feedback:
        'Não foi possível avaliar foto e banner diretamente, mas a estrutura textual sugere um perfil com seções preenchidas. Perfis com foto profissional recebem 14x mais visualizações.',
      suggestion: null,
    },
  ],
  tips: [
    'Use números sempre que possível — "5 anos" é melhor que "vários anos"',
    'Primeira linha do Sobre deve ter um hook — é o que aparece antes do "ver mais"',
    'Remova "apaixonado por tecnologia" — todo dev diz isso, não diferencia',
    'Adicione um CTA no final do Sobre — "Vamos conversar? Me chama no DM"',
    'Peça recomendações de colegas — perfis com 5+ recomendações rankeiam melhor',
    'Publique ao menos 1 post por semana — o algoritmo favorece criadores ativos',
  ],
}
