export default function Hero({ onStart }) {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <h1 className="hero-title">
        Analise seu perfil LinkedIn
        <br />
        <span className="gradient-text">com inteligência artificial</span>
      </h1>
      <p className="hero-subtitle">
        Descubra o que recrutadores realmente pensam do seu perfil.
        Score detalhado + sugestões reescritas por IA.
      </p>
      <div className="hero-features">
        <div className="feature-chip">🎯 Score detalhado</div>
        <div className="feature-chip">✍️ Sugestões reescritas</div>
        <div className="feature-chip">🔒 100% no navegador</div>
        <div className="feature-chip">🤖 Escolha sua IA</div>
      </div>
      <button className="btn-primary btn-lg" onClick={onStart}>
        Analisar meu perfil
      </button>
      <p className="hero-providers">
        Funciona com <strong>Gemini (grátis)</strong> ou qualquer API compatível
      </p>
    </section>
  )
}
