import { useEffect, useState, useRef } from 'react'
import { t } from '../i18n'

const SAFETY_TIMEOUT_MS = 180_000

export default function Loading({ lang, done, onTimeout }) {
  const tips = t(lang, 'loadingTips')
  const [tipIdx, setTipIdx] = useState(0)
  const [simulatedProgress, setSimulatedProgress] = useState(0)
  const [tipVisible, setTipVisible] = useState(true)
  const [timedOut, setTimedOut] = useState(false)
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
        if (e < 3000) return Math.min(p + 5, 25)
        if (e < 10000) return Math.min(p + 2, 50)
        if (e < 30000) return Math.min(p + 0.8, 70)
        if (e < 60000) return Math.min(p + 0.4, 85)
        return Math.min(p + 0.15, 95)
      })
    }, 500)

    const safetyTimer = setTimeout(() => {
      if (!done) {
        setTimedOut(true)
        if (onTimeout) onTimeout()
      }
    }, SAFETY_TIMEOUT_MS)

    return () => {
      clearInterval(tipTimer)
      clearInterval(progTimer)
      clearTimeout(safetyTimer)
    }
  }, [tips.length, done, onTimeout])

  const progress = done ? 100 : simulatedProgress

  const statusText = timedOut
    ? t(lang, 'loadingTimeout')
    : done
      ? t(lang, 'loadingDone')
      : tips[tipIdx]

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
        {statusText}
      </p>
    </section>
  )
}
