import { t } from '../i18n'

export default function SectionCard({ section, lang }) {
  const { title, score, status, feedback, suggestion } = section
  const color =
    score >= 80 ? '#21C25E' : score >= 60 ? '#F5A623' : score >= 40 ? '#FF8C42' : '#EF4444'

  return (
    <div className="section-card">
      <div className="section-card-header">
        <h4>{title}</h4>
        <span className="section-score" style={{ color }}>
          {score}/100
        </span>
      </div>
      <div className="section-bar">
        <div
          className="section-bar-fill"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className="section-status" style={{ color }}>{status}</span>
      <p className="section-feedback">{feedback}</p>
      {suggestion && (
        <div className="section-suggestion">
          <span className="suggestion-label">{t(lang, 'suggestionLabel')}</span>
          <p className="suggestion-text">{suggestion}</p>
        </div>
      )}
    </div>
  )
}
