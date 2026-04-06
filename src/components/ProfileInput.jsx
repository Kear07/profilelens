import { useState } from 'react'
import FileUpload from './FileUpload'
import { extractTextFromPDF } from '../services/pdfParser'
import { t } from '../i18n'

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
        {t(lang, 'back')}
      </button>

      <h2 className="section-title">{t(lang, 'yourProfile')}</h2>

      <div className="input-mode-tabs">
        <div className="tab-wrapper">
          <button
            className={`tab ${mode === 'pdf' ? 'active' : ''} ${isDemo ? 'tab-disabled' : ''}`}
            onClick={handlePdfTabClick}
          >
            {t(lang, 'tabPdf')} {isDemo && '(locked)'}
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
          {error && <p className="error-msg">{error}</p>}
        </form>
      )}
    </section>
  )
}
