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
          <div key={i} className="feature-chip"><span className="chip-dot" />{chip}</div>
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
    </section>
  )
}
