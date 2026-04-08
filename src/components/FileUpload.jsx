import { useState, useRef } from 'react'
import { t } from '../i18n'

export default function FileUpload({ onFileText, lang }) {
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState(null)
  const [error, setError] = useState(null)
  const inputRef = useRef()

  const handleFile = async (file) => {
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError(t(lang, 'onlyPdf'))
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError(t(lang, 'fileTooBig'))
      return
    }
    setError(null)
    setFileName(file.name)
    onFileText(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  return (
    <div className="file-upload-wrapper">
      <div
        className={`file-upload ${dragOver ? 'drag-over' : ''} ${fileName ? 'has-file' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => handleFile(e.target.files[0])}
          hidden
        />
        {fileName ? (
          <div className="file-selected">
            <span className="file-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 2h6l4 4v12a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span className="file-name">{fileName}</span>
            <button
              className="file-remove"
              onClick={(e) => {
                e.stopPropagation()
                setFileName(null)
                onFileText(null)
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <span className="upload-icon"><svg width="32" height="32" viewBox="0 0 20 20" fill="none"><path d="M6 2h6l4 4v12a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12l2-2 2 2M10 10v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <p className="upload-text">
              <strong>{t(lang, 'dragHere')}</strong>{t(lang, 'orClick')}
            </p>
            <p className="upload-hint">{t(lang, 'pdfHint')}</p>
          </>
        )}
      </div>

      {error && <p className="error-msg">{error}</p>}

      <details className="how-to-pdf">
        <summary>{t(lang, 'howToPdf')}</summary>
        <ol>
          <li>{t(lang, 'howStep1')}</li>
          <li>{t(lang, 'howStep2')}<strong>{t(lang, 'howStep2Bold')}</strong>{t(lang, 'howStep2After')}</li>
          <li>{t(lang, 'howStep3')}<strong>{t(lang, 'howStep3Bold')}</strong></li>
          <li>{t(lang, 'howStep4')}</li>
        </ol>
      </details>
    </div>
  )
}
