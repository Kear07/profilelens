import { t } from '../i18n'

export default function Hero({ onStart, lang }) {
  const chips = t(lang, 'heroChips')
  const providers = t(lang, 'heroProviders')

  return (
    <section className="hero">
      <h1 className="hero-title">
        {t(lang, 'heroTitle1')}
        <br />
        <span className="hero-title-accent">{t(lang, 'heroTitle2')}</span>
      </h1>
      <p className="hero-subtitle">{t(lang, 'heroSubtitle')}</p>
      <div className="hero-features">
        {chips.map((chip, i) => (
          <span key={i} className="feature-chip">{chip}</span>
        ))}
      </div>
      <button className="btn-primary btn-lg" onClick={onStart}>
        {t(lang, 'heroBtn')}
      </button>
      <p className="hero-providers">
        {providers[0]}<strong>{providers[1]}</strong>{providers[2]}
      </p>

      <div className="how-section">
        <div className="how-steps">
          <div className="how-step">
            <span className="how-step-num">1</span>
            <strong>{t(lang, 'howStep1Label')}</strong>
            <span className="how-step-desc">{t(lang, 'howStep1Desc')}</span>
          </div>
          <span className="how-divider" />
          <div className="how-step">
            <span className="how-step-num">2</span>
            <strong>{t(lang, 'howStep2Label')}</strong>
            <span className="how-step-desc">{t(lang, 'howStep2Desc')}</span>
          </div>
          <span className="how-divider" />
          <div className="how-step">
            <span className="how-step-num">3</span>
            <strong>{t(lang, 'howStep3Label')}</strong>
            <span className="how-step-desc">{t(lang, 'howStep3Desc')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
