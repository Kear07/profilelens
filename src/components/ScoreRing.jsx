export default function ScoreRing({ score, label }) {
  const circumference = 2 * Math.PI * 52
  const offset = circumference - (score / 100) * circumference
  const color =
    score >= 80 ? '#21C25E' : score >= 60 ? '#F5A623' : score >= 40 ? '#FF8C42' : '#EF4444'

  return (
    <div className="score-ring-container">
      <div className="score-ring-wrap">
        <svg viewBox="0 0 120 120" className="score-ring-svg">
          <circle cx="60" cy="60" r="52" className="ring-bg" />
          <circle
            cx="60"
            cy="60"
            r="52"
            className="ring-fill"
            style={{
              stroke: color,
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        <div className="score-ring-value">
          <span className="score-number" style={{ color }}>{score}</span>
          <span className="score-max">/100</span>
        </div>
      </div>
      {label && <p className="score-label">{label}</p>}
    </div>
  )
}
