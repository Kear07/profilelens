import { useState } from 'react'
import FileUpload from './FileUpload'
import { extractTextFromPDF } from '../services/pdfParser'
import { t } from '../i18n'

const LINKEDIN_KEYWORDS = [
  'linkedin', 'experience', 'education', 'skills', 'about',
  'headline', 'summary', 'endorsement', 'recommendation',
  'experiência', 'experiencia', 'habilidades', 'formação',
  'formacao', 'educação', 'educacao', 'sobre', 'competências',
  'competencias', 'recomendações', 'recomendacoes',
]

function looksLikeLinkedIn(text) {
  const lower = text.toLowerCase()
  let matches = 0
  for (const kw of LINKEDIN_KEYWORDS) {
    if (lower.includes(kw)) matches++
  }
  return matches >= 2
}

export default function ProfileInput({ onAnalyze, onBack, error, provider, lang }) {
  const isDemo = provider === 'mock'
  const [text, setText] = useState('')
  const [mode, setMode] = useState(isDemo ? 'text' : 'pdf')
  const [pdfFile, setPdfFile] = useState(null)
  const [parsing, setParsing] = useState(false)
  const [localError, setLocalError] = useState(null)
  const [showPdfTooltip, setShowPdfTooltip] = useState(false)

  const handlePdfTabClick = () => {
    if (isDemo) {
      setShowPdfTooltip(true)
      setTimeout(() => setShowPdfTooltip(false), 5000)
    } else {
      setMode('pdf')
      setShowPdfTooltip(false)
    }
  }

  const handleSubmitText = (e) => {
    e.preventDefault()
    if (text.trim().length < 50) return
    if (!isDemo && !looksLikeLinkedIn(text)) {
      setLocalError(t(lang, 'textNotLinkedin'))
      return
    }
    setLocalError(null)
    onAnalyze(text.trim())
  }

  const handleSubmitPdf = async (e) => {
    e.preventDefault()
    if (!pdfFile) return
    setParsing(true)
    setLocalError(null)
    try {
      const extracted = await extractTextFromPDF(pdfFile)
      if (extracted.trim().length < 30) {
        throw new Error(t(lang, 'pdfExtractError'))
      }
      if (!looksLikeLinkedIn(extracted)) {
        throw new Error(t(lang, 'pdfNotLinkedin'))
      }
      onAnalyze(extracted.trim())
    } catch (err) {
      setLocalError(err.message || t(lang, 'pdfError'))
    } finally {
      setParsing(false)
    }
  }

  return (
    <section className="input-section fade-up">
      <button className="btn-ghost back-btn" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ verticalAlign: '-1px', marginRight: '4px' }}><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        {t(lang, 'back')}
      </button>

      <h2 className="section-title">{t(lang, 'yourProfile')}</h2>
      <p className="input-subtitle">{t(lang, 'inputSubtitle')}</p>

      <div className="input-mode-tabs">
        <div className="tab-wrapper">
          <button
            className={`tab ${mode === 'pdf' ? 'active' : ''} ${isDemo ? 'tab-disabled' : ''}`}
            onClick={handlePdfTabClick}
          >
            {t(lang, 'tabPdf')} {isDemo && <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ verticalAlign: '-2px', opacity: 0.6 }}><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
          </button>
          {showPdfTooltip && (
            <div className="pdf-locked-tooltip">
              {t(lang, 'pdfLockedTooltip').replace('{settings}', t(lang, 'settings'))}
            </div>
          )}
        </div>
        <button
          className={`tab ${mode === 'text' ? 'active' : ''}`}
          onClick={() => { setMode('text'); setShowPdfTooltip(false) }}
        >
          {t(lang, 'tabText')}
        </button>
      </div>

      {isDemo && (
        <p className="badge-demo-positive">
          {t(lang, 'demoBadge')}
        </p>
      )}

      {mode === 'pdf' ? (
        <form onSubmit={handleSubmitPdf}>
          <FileUpload
            onFileText={(file) => setPdfFile(file)}
            loading={parsing}
            lang={lang}
          />
          <div className="input-footer">
            <span className="char-count">
              {pdfFile ? t(lang, 'pdfReady') : t(lang, 'noFile')}
            </span>
            <button
              type="submit"
              className="btn-primary"
              disabled={!pdfFile || parsing}
            >
              {parsing ? t(lang, 'readingPdf') : t(lang, 'analyzeBtn')}
            </button>
          </div>
          {(error || localError) && <p className="error-msg">{localError || error}</p>}
        </form>
      ) : (
        <form onSubmit={handleSubmitText}>
          <textarea
            className="profile-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t(lang, 'placeholder')}
            rows={14}
            autoFocus
          />
          <div className="input-footer">
            <span className="char-count">
              {text.length} {t(lang, 'chars')} {text.length < 50 && text.length > 0 && t(lang, 'min50')}
            </span>
            <button
              type="submit"
              className="btn-primary"
              disabled={text.trim().length < 50}
            >
              {t(lang, 'analyzeBtn')}
            </button>
          </div>
          {(error || localError) && <p className="error-msg">{localError || error}</p>}
        </form>
      )}
    </section>
  )
}
