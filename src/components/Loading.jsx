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
    }, 2500)

    // Simulates realistic progress: fast start, slow middle, stalls near end
    let elapsed = 0
    const progTimer = setInterval(() => {
      elapsed += 500
      setProgress((p) => {
        if (p >= 95) return p
        if (elapsed < 2000) return Math.min(p + 8, 30)       // 0-30: fast (sending)
        if (elapsed < 6000) return Math.min(p + 3, 65)       // 30-65: medium (processing)
        if (elapsed < 12000) return Math.min(p + 1.5, 85)    // 65-85: slow (generating)
        return Math.min(p + 0.5, 95)                          // 85-95: crawl (finishing)
      })
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
    </section>
  )
}
