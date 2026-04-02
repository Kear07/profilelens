import { useState, useEffect } from 'react'
import { t } from '../i18n'

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

export default function Hero({ onStart, lang }) {
  const chips = t(lang, 'heroChips')
  const providers = t(lang, 'heroProviders')
  const counter = useCounter(2847, 1800)

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

      {/* Social proof */}
      <div className="social-proof">
        <span className="social-proof-number">{counter.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}+</span>
        {' '}{t(lang, 'socialProof')}
      </div>

      {/* How it works */}
      <div className="how-section">
        <h3 className="how-title">{t(lang, 'howTitle')}</h3>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-icon">📋</div>
            <div className="how-step-number">1</div>
            <strong>{t(lang, 'howStep1Label')}</strong>
            <span>{t(lang, 'howStep1Desc')}</span>
          </div>
          <div className="how-step-arrow">→</div>
          <div className="how-step">
            <div className="how-step-icon">🤖</div>
            <div className="how-step-number">2</div>
            <strong>{t(lang, 'howStep2Label')}</strong>
            <span>{t(lang, 'howStep2Desc')}</span>
          </div>
          <div className="how-step-arrow">→</div>
          <div className="how-step">
            <div className="how-step-icon">✨</div>
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
            <div className="mockup-bar-label">Headline <span>55</span></div>
            <div className="mockup-bar"><div className="mockup-bar-fill" style={{ width: '55%', background: 'var(--yellow)' }} /></div>
            <div className="mockup-bar-label">Experience <span>80</span></div>
            <div className="mockup-bar"><div className="mockup-bar-fill" style={{ width: '80%', background: 'var(--green)' }} /></div>
            <div className="mockup-bar-label">Skills <span>45</span></div>
            <div className="mockup-bar"><div className="mockup-bar-fill" style={{ width: '45%', background: 'var(--orange)' }} /></div>
          </div>
        </div>
        <div className="mockup-suggestion">
          <div className="mockup-suggestion-label">REWRITE SUGGESTION</div>
          <div className="mockup-suggestion-text">
            &quot;Senior Full Stack Engineer | Scaling React + Node.js platforms for 2M+ users&quot;
          </div>
        </div>
      </div>
    </section>
  )
}
