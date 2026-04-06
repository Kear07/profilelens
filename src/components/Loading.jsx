import { useEffect, useState } from 'react'
import { t } from '../i18n'

export default function Loading({ lang }) {
  const tips = t(lang, 'loadingTips')
  const [tipIdx, setTipIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [tipVisible, setTipVisible] = useState(true)

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipVisible(false)
      setTimeout(() => {
        setTipIdx((i) => (i + 1) % tips.length)
        setTipVisible(true)
      }, 300)
    }, 2200)
    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 12, 95))
    }, 500)
    return () => {
      clearInterval(tipTimer)
      clearInterval(progTimer)
    }
  }, [tips.length])

  return (
    <section className="loading-section fade-up">
      <div className="loading-ring">
        <div className="loading-glow" />
        <svg viewBox="0 0 120 120" className="ring-svg">
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
        {tips[tipIdx]}
      </p>
      <div className="loading-dots">
        <span /><span /><span />
      </div>
    </section>
  )
}
