import ScoreRing from './ScoreRing'
import SectionCard from './SectionCard'
import { t } from '../i18n'

export default function Results({ data, onReset, lang }) {
  const { overallScore, summary, sections, tips } = data

  return (
    <section className="results-section fade-up">
      <div className="results-header">
        <ScoreRing score={overallScore} label={t(lang, 'overallScore')} />
        <div className="results-summary">
          <h2>{t(lang, 'overallScore')}</h2>
          <p>{summary}</p>
        </div>
      </div>

      <div className="sections-grid">
        {sections.map((s, i) => (
          <SectionCard key={i} section={s} lang={lang} />
        ))}
      </div>

      {tips && tips.length > 0 && (
        <div className="tips-box">
          <h3>{t(lang, 'tipsTitle')}</h3>
          <ul>
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="results-actions">
        <button className="btn-primary" onClick={onReset}>
          {t(lang, 'analyzeAnother')}
        </button>
        <p className="results-disclaimer">
          {t(lang, 'resultsDisclaimer')}
        </p>
      </div>
    </section>
  )
}
