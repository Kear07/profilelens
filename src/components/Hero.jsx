import { t } from '../i18n'

const chipIcons = [
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 11l3-6h1l3 6M4.5 9h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="4" y="2" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 8.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 4l2-2M13 4l-2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
]

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
          <div key={i} className="feature-chip"><span className="chip-icon">{chipIcons[i]}</span>{chip}</div>
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
