import { t } from '../i18n'

export default function Hero({ onStart, lang, userCount }) {
  return (
    <section className="hero">
      <div className="hero-badges">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {lang === 'pt' ? 'Powered by Gemini · 100% gratuito' : 'Powered by Gemini · 100% free'}
        </div>
        {userCount > 0 && (
          <div className="hero-badge hero-badge-blue">
            <svg className="hero-badge-icon" width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3.5" stroke="currentColor" strokeWidth="1.8"/><path d="M2.5 14.5c0-2.5 2-4 5.5-4s5.5 1.5 5.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            {userCount.toLocaleString()} {lang === 'pt' ? (userCount === 1 ? 'perfil analisado' : 'perfis analisados') : (userCount === 1 ? 'profile analyzed' : 'profiles analyzed')}
          </div>
        )}
      </div>

      <h1 className="hero-title">
        {lang === 'pt' ? 'Descubra seu ' : 'Discover your '}
        <span className="hero-title-gradient">
          {lang === 'pt' ? 'score no LinkedIn' : 'LinkedIn score'}
        </span>
        {lang === 'pt' ? ' em 30 segundos' : ' in 30 seconds'}
      </h1>

      <p className="hero-sub">
        {lang === 'pt' ? (
          <>IA analisa seu perfil como um <strong>recrutador s{'\u00ea'}nior</strong> faria. Score detalhado em 6 dimens{'\u00f5'}es + sugest{'\u00f5'}es prontas pra copiar e colar.</>
        ) : (
          <>AI analyzes your profile like a <strong>senior recruiter</strong> would. Detailed score in 6 dimensions + suggestions ready to copy and paste.</>
        )}
      </p>

      <div className="hero-cta-group">
        <button className="btn-cta" onClick={onStart}>
          {t(lang, 'heroBtn')}
          <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      <div className="hero-steps">
        {[
          { num: lang === 'pt' ? 'Passo 01' : 'Step 01', label: t(lang, 'howStep1Label'), desc: t(lang, 'howStep1Desc') },
          { num: lang === 'pt' ? 'Passo 02' : 'Step 02', label: t(lang, 'howStep2Label'), desc: t(lang, 'howStep2Desc') },
          { num: lang === 'pt' ? 'Passo 03' : 'Step 03', label: t(lang, 'howStep3Label'), desc: t(lang, 'howStep3Desc') },
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
