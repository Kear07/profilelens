import { useState, useRef } from 'react'

export default function FileUpload({ onFileText, loading }) {
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState(null)
  const [error, setError] = useState(null)
  const inputRef = useRef()

  const handleFile = async (file) => {
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Só aceita PDF. Baixe seu perfil LinkedIn como PDF.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Arquivo muito grande (máx 10MB).')
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
            <span className="file-icon">📄</span>
            <span className="file-name">{fileName}</span>
          </div>
        ) : (
          <>
            <span className="upload-icon">📄</span>
            <p className="upload-text">
              <strong>Arraste seu PDF aqui</strong> ou clique para selecionar
            </p>
            <p className="upload-hint">Perfil LinkedIn salvo como PDF</p>
          </>
        )}
      </div>

      {error && <p className="error-msg">{error}</p>}

      <details className="how-to-pdf">
        <summary>Como baixar o PDF do LinkedIn?</summary>
        <ol>
          <li>Abra seu perfil no LinkedIn</li>
          <li>Clique no botão <strong>"Mais"</strong> (abaixo da foto)</li>
          <li>Selecione <strong>"Salvar como PDF"</strong></li>
          <li>Arraste o arquivo aqui</li>
        </ol>
      </details>
    </div>
  )
}
