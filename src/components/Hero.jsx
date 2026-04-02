import { t } from '../i18n'

export default function Hero({ onStart, lang }) {
  const chips = t(lang, 'heroChips')
  const providers = t(lang, 'heroProviders')

  return (
    <section className="hero">
      <div className="hero-glow" />
      <h1 className="hero-title">
        {t(lang, 'heroTitle1')}
        <br />
        <span className="gradient-text">{t(lang, 'heroTitle2')}</span>
      </h1>
      <p className="hero-subtitle">{t(lang, 'heroSubtitle')}</p>
      <div className="hero-features">
        {chips.map((chip, i) => (
          <div key={i} className="feature-chip">{chip}</div>
        ))}
      </div>
      <button className="btn-primary btn-lg" onClick={onStart}>
        {t(lang, 'heroBtn')}
      </button>
      <p className="hero-providers">
        {providers[0]}<strong>{providers[1]}</strong>{providers[2]}
      </p>

      {/* How it works */}
      <div className="how-section">
        <h3 className="how-title">{t(lang, 'howTitle')}</h3>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-number">1</div>
            <strong>{t(lang, 'howStep1Label')}</strong>
            <span>{t(lang, 'howStep1Desc')}</span>
          </div>
          <div className="how-step-arrow">&rarr;</div>
          <div className="how-step">
            <div className="how-step-number">2</div>
            <strong>{t(lang, 'howStep2Label')}</strong>
            <span>{t(lang, 'howStep2Desc')}</span>
          </div>
          <div className="how-step-arrow">&rarr;</div>
          <div className="how-step">
            <div className="how-step-number">3</div>
            <strong>{t(lang, 'howStep3Label')}</strong>
            <span>{t(lang, 'howStep3Desc')}</span>
          </div>
        </div>
      </div>

      {/* Preview mockup */}
      <div className="preview-mockup">
        <div className="mockup-header">
          <div className="mockup-score-ring">
            <svg viewBox="0 0 36 36" className="mockup-ring-svg">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#6C63FF" strokeWidth="3" strokeLinecap="round"
                strokeDasharray="63 94" transform="rotate(-90 18 18)" />
            </svg>
            <span className="mockup-score-number">67</span>
          </div>
          <div className="mockup-summary">
            <div className="mockup-bar-label">{t(lang, 'mockupHeadline')} <span>55</span></div>
            <div className="mockup-bar"><div className="mockup-bar-fill" style={{ width: '55%', background: 'var(--yellow)' }} /></div>
            <div className="mockup-bar-label">{t(lang, 'mockupExperience')} <span>80</span></div>
            <div className="mockup-bar"><div className="mockup-bar-fill" style={{ width: '80%', background: 'var(--green)' }} /></div>
            <div className="mockup-bar-label">{t(lang, 'mockupSkills')} <span>45</span></div>
            <div className="mockup-bar"><div className="mockup-bar-fill" style={{ width: '45%', background: 'var(--orange)' }} /></div>
          </div>
        </div>
        <div className="mockup-suggestion">
          <div className="mockup-suggestion-label">{t(lang, 'mockupSuggestionLabel')}</div>
          <div className="mockup-suggestion-text">
            {t(lang, 'mockupSuggestionText')}
          </div>
        </div>
      </div>
    </section>
  )
}
