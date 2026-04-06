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
          <h3><svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ verticalAlign: '-3px', marginRight: '6px' }}><path d="M9 2a5 5 0 013 9v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2A5 5 0 019 2z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>{t(lang, 'tipsTitle')}</h3>
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
      </div>
    </section>
  )
}
