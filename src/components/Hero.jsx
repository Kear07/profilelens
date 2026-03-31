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
    </section>
  )
}
