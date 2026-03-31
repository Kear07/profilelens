import { useState, useRef } from 'react'
import { t } from '../i18n'

export default function FileUpload({ onFileText, loading, lang }) {
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
            <span className="file-icon">📄</span>
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
            <span className="upload-icon">📄</span>
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
