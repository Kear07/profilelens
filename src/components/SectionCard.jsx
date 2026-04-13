import { useState } from 'react'
import { t } from '../i18n'

export default function SectionCard({ section, lang }) {
  const [open, setOpen] = useState(false)
  const { title, score, status, feedback, suggestion } = section
  const color =
    score >= 80 ? '#21C25E' : score >= 60 ? '#F5A623' : score >= 40 ? '#FF8C42' : '#EF4444'

  return (
    <div className={`section-card${open ? ' section-card-open' : ''}`}>
      <button className="section-card-toggle" onClick={() => setOpen(!open)}>
        <div className="section-card-left">
          <h4>{title}</h4>
          <span className="section-status" style={{ color }}>{status}</span>
        </div>
        <div className="section-card-right">
          <span className="section-score" style={{ color }}>{score}/100</span>
          <svg className={`section-chevron${open ? ' section-chevron-open' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </button>
      <div className="section-bar">
        <div className="section-bar-fill" style={{ width: `${score}%`, background: color }} />
      </div>
      {open && (
        <div className="section-card-body">
          <p className="section-feedback">{feedback}</p>
          {suggestion && suggestion !== 'null' && (
            <div className="section-suggestion">
              <span className="suggestion-label">{t(lang, 'suggestionLabel')}</span>
              <p className="suggestion-text">{suggestion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
