import { t } from '../i18n'

export default function Hero({ onStart, lang, userCount }) {
  return (
    <section className="hero">
      <div className="hero-badges">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {t(lang, 'heroBadge')}
        </div>
        {userCount > 0 && (
          <div className="hero-badge hero-badge-blue">
            <svg className="hero-badge-icon" width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3.5" stroke="currentColor" strokeWidth="1.8"/><path d="M2.5 14.5c0-2.5 2-4 5.5-4s5.5 1.5 5.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            {userCount.toLocaleString()} {t(lang, userCount === 1 ? 'heroProfileCount' : 'heroProfilesCount')}
          </div>
        )}
      </div>

      <h1 className="hero-title">
        {t(lang, 'heroTitle1')}
        <span className="hero-title-gradient">
          {t(lang, 'heroTitleGradient')}
        </span>
        {t(lang, 'heroTitle2')}
      </h1>

      <p className="hero-sub" dangerouslySetInnerHTML={{ __html: t(lang, 'heroSub') }} />

      <div className="hero-cta-group">
        <button className="btn-cta" onClick={onStart}>
          {t(lang, 'heroBtn')}
          <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      <div className="hero-steps">
        {[
          { num: `${t(lang, 'stepPrefix')} 01`, label: t(lang, 'howStep1Label'), desc: t(lang, 'howStep1Desc') },
          { num: `${t(lang, 'stepPrefix')} 02`, label: t(lang, 'howStep2Label'), desc: t(lang, 'howStep2Desc') },
          { num: `${t(lang, 'stepPrefix')} 03`, label: t(lang, 'howStep3Label'), desc: t(lang, 'howStep3Desc') },
        ].map((step, i) => (
          <div key={i} className="step-card">
            <span className="step-num">{step.num}</span>
            <div className="step-label">{step.label}</div>
            <div className="step-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
