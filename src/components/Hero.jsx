import { t } from '../i18n'

export default function Hero({ onStart, lang }) {
  const chips = t(lang, 'heroChips')
  const providers = t(lang, 'heroProviders')

  return (
    <section className="hero">
      <div className="hero-aura" />
      <div className="hero-crosshair" />

      <div className="hero-tag">
        <span className="hero-tag-pulse" />
        {lang === 'pt' ? 'ONLINE' : 'ONLINE'}
      </div>

      <h1 className="hero-title">
        {t(lang, 'heroTitle1')}
        <br />
        <span className="hero-title-lit">{t(lang, 'heroTitle2')}</span>
      </h1>
      <p className="hero-sub">{t(lang, 'heroSubtitle')}</p>

      <div className="hero-stats">
        {chips.map((chip, i) => (
          <span key={i} className="stat-pill">
            <span className="stat-dot" />
            {chip}
          </span>
        ))}
      </div>

      <button className="btn-cta" onClick={onStart}>
        {t(lang, 'heroBtn')}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>

      <p className="hero-powered">
        {providers[0]}<strong>{providers[1]}</strong>{providers[2]}
      </p>

      <div className="hero-pipeline">
        <div className="pipeline-steps">
          {[
            { num: '01', label: t(lang, 'howStep1Label'), desc: t(lang, 'howStep1Desc') },
            { num: '02', label: t(lang, 'howStep2Label'), desc: t(lang, 'howStep2Desc') },
            { num: '03', label: t(lang, 'howStep3Label'), desc: t(lang, 'howStep3Desc') },
          ].map((step, i) => (
            <div key={i} className="pipe-step">
              <span className="pipe-num">{step.num}</span>
              <strong>{step.label}</strong>
              <span className="pipe-desc">{step.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
