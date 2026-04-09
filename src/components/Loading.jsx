import { useEffect, useState, useRef } from 'react'
import { t } from '../i18n'

export default function Loading({ lang, done }) {
  const tips = t(lang, 'loadingTips')
  const [tipIdx, setTipIdx] = useState(0)
  const [simulatedProgress, setSimulatedProgress] = useState(0)
  const [tipVisible, setTipVisible] = useState(true)
  const elapsed = useRef(0)

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipVisible(false)
      setTimeout(() => {
        setTipIdx((i) => (i + 1) % tips.length)
        setTipVisible(true)
      }, 300)
    }, 2500)

    const progTimer = setInterval(() => {
      elapsed.current += 500
      setSimulatedProgress((p) => {
        if (p >= 95) return p
        const e = elapsed.current
        if (e < 2000) return Math.min(p + 8, 30)
        if (e < 6000) return Math.min(p + 3, 65)
        if (e < 12000) return Math.min(p + 1.5, 85)
        return Math.min(p + 0.5, 95)
      })
    }, 500)

    return () => {
      clearInterval(tipTimer)
      clearInterval(progTimer)
    }
  }, [tips.length])

  const progress = done ? 100 : simulatedProgress

  return (
    <section className="loading-section fade-up">
      <div className="loading-ring">
        <div className="loading-glow" />
        <svg viewBox="0 0 120 120" className="ring-svg">
          <defs>
            <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'var(--accent-light)' }} />
              <stop offset="100%" style={{ stopColor: 'var(--green)' }} />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="52" className="ring-bg" />
          <circle
            cx="60"
            cy="60"
            r="52"
            className="ring-progress"
            style={{
              strokeDasharray: `${progress * 3.27} 327`,
            }}
          />
        </svg>
        <span className="ring-percent">{Math.round(progress)}%</span>
      </div>
      <p className={`loading-tip ${tipVisible ? 'tip-visible' : 'tip-hidden'}`}>
        {done ? (lang === 'pt' ? 'Pronto!' : 'Done!') : tips[tipIdx]}
      </p>
    </section>
  )
}
