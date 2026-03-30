import { useEffect, useState } from 'react'

const TIPS = [
  'Analisando sua headline...',
  'Avaliando a seção Sobre...',
  'Verificando experiências...',
  'Checando palavras-chave...',
  'Calculando score final...',
  'Gerando sugestões...',
]

export default function Loading() {
  const [tipIdx, setTipIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIdx((i) => (i + 1) % TIPS.length)
    }, 1800)
    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 95))
    }, 400)
    return () => {
      clearInterval(tipTimer)
      clearInterval(progTimer)
    }
  }, [])

  return (
    <section className="loading-section fade-up">
      <div className="loading-ring">
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
      <p className="loading-tip">{TIPS[tipIdx]}</p>
    </section>
  )
}
