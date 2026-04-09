import { t } from '../i18n'

const pillIcons = [
  // chart bar
  <svg key="0" width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="8" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.5"/><rect x="6" y="4" width="3" height="10" rx="0.5" fill="currentColor" opacity="0.7"/><rect x="11" y="1" width="3" height="13" rx="0.5" fill="currentColor"/></svg>,
  // pen
  <svg key="1" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3l9.5-9.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  // shield
  <svg key="2" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2.5 4v4c0 3.5 2.3 5.8 5.5 6.5 3.2-.7 5.5-3 5.5-6.5V4L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
]

const pillColors = ['var(--accent-soft)', 'var(--green-soft)', 'var(--cyan-soft)']
const pillTextColors = ['var(--accent-light)', 'var(--green)', 'var(--cyan)']

export default function Hero({ onStart, lang }) {
  const chips = t(lang, 'heroChips')
  const providers = t(lang, 'heroProviders')

  return (
    <section className="hero">
      <div className="hero-badge">
        <span className="hero-badge-dot" />
        {lang === 'pt' ? 'Powered by Gemini · 100% gratuito' : 'Powered by Gemini · 100% free'}
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
          <>IA analisa seu perfil como um <strong>recrutador sênior</strong> faria. Score detalhado em 6 dimensões + sugestões prontas pra copiar e colar.</>
        ) : (
          <>AI analyzes your profile like a <strong>senior recruiter</strong> would. Detailed score in 6 dimensions + suggestions ready to copy and paste.</>
        )}
      </p>

      <div className="hero-cta-group">
        <button className="btn-cta" onClick={onStart}>
          {t(lang, 'heroBtn')}
          <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <span className="hero-cta-hint">
          {providers[0]}<code>{providers[1]}</code>{providers[2]}
        </span>
      </div>

      <div className="hero-pills">
        {chips.map((chip, i) => (
          <span key={i} className="pill">
            <span className="pill-icon" style={{ background: pillColors[i], color: pillTextColors[i] }}>
              {pillIcons[i]}
            </span>
            {chip}
          </span>
        ))}
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
