import ScoreRing from './ScoreRing'
import SectionCard from './SectionCard'

export default function Results({ data, onReset }) {
  const { overallScore, summary, sections, tips } = data

  return (
    <section className="results-section fade-up">
      <div className="results-header">
        <ScoreRing score={overallScore} label="Score geral" />
        <div className="results-summary">
          <h2>Resultado da análise</h2>
          <p>{summary}</p>
        </div>
      </div>

      <div className="sections-grid">
        {sections.map((s, i) => (
          <SectionCard key={i} section={s} />
        ))}
      </div>

      {tips && tips.length > 0 && (
        <div className="tips-box">
          <h3>Dicas rápidas</h3>
          <ul>
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="results-actions">
        <button className="btn-primary" onClick={onReset}>
          Analisar outro perfil
        </button>
      </div>
    </section>
  )
}
