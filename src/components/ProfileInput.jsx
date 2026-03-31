import { useState } from 'react'
import FileUpload from './FileUpload'
import { extractTextFromPDF } from '../services/pdfParser'

const PLACEHOLDER = `Cole aqui o texto do seu perfil LinkedIn. Exemplo:

HEADLINE:
Desenvolvedor Full Stack | React, Node.js, Python

SOBRE:
Profissional com 5 anos de experiência em desenvolvimento web...

EXPERIÊNCIA:
Empresa X — Desenvolvedor Sênior (2022 - atual)
- Liderança técnica de squad com 5 devs...

HABILIDADES:
React, Node.js, TypeScript, Python, AWS, Docker`

export default function ProfileInput({ onAnalyze, onBack, error, provider }) {
  const isDemo = provider === 'mock'
  const [text, setText] = useState('')
  const [mode, setMode] = useState(isDemo ? 'text' : 'pdf')
  const [pdfFile, setPdfFile] = useState(null)
  const [parsing, setParsing] = useState(false)
  const [localError, setLocalError] = useState(null)

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
        throw new Error('Não consegui extrair texto do PDF. Tente colar o texto manualmente.')
      }
      onAnalyze(extracted.trim())
    } catch (err) {
      setLocalError(err.message || 'Erro ao processar PDF')
    } finally {
      setParsing(false)
    }
  }

  return (
    <section className="input-section fade-up">
      <button className="btn-ghost back-btn" onClick={onBack}>
        ← Voltar
      </button>

      <h2 className="section-title">Seu perfil</h2>

      <div className="input-mode-tabs">
        <button
          className={`tab ${mode === 'pdf' ? 'active' : ''} ${isDemo ? 'tab-disabled' : ''}`}
          onClick={() => !isDemo && setMode('pdf')}
          title={isDemo ? 'Configure uma IA em Configurações para usar PDF' : ''}
        >
          📄 Upload PDF {isDemo && '🔒'}
        </button>
        <button
          className={`tab ${mode === 'text' ? 'active' : ''}`}
          onClick={() => setMode('text')}
        >
          ✏️ Colar texto
        </button>
      </div>

      {isDemo && (
        <p className="badge-mock-block">
          Modo demo — clique em <strong>Configurações</strong> (topo direito) para conectar uma IA e desbloquear o upload de PDF
        </p>
      )}

      {mode === 'pdf' ? (
        <form onSubmit={handleSubmitPdf}>
          <FileUpload
            onFileText={(file) => setPdfFile(file)}
            loading={parsing}
          />
          <div className="input-footer">
            <span className="char-count">
              {pdfFile ? '✓ PDF pronto' : 'Nenhum arquivo selecionado'}
            </span>
            <button
              type="submit"
              className="btn-primary"
              disabled={!pdfFile || parsing}
            >
              {parsing ? 'Lendo PDF...' : 'Analisar perfil'}
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
            placeholder={PLACEHOLDER}
            rows={14}
            autoFocus
          />
          <div className="input-footer">
            <span className="char-count">
              {text.length} caracteres {text.length < 50 && text.length > 0 && '(mínimo 50)'}
            </span>
            <button
              type="submit"
              className="btn-primary"
              disabled={text.trim().length < 50}
            >
              Analisar perfil
            </button>
          </div>
          {error && <p className="error-msg">{error}</p>}
        </form>
      )}
    </section>
  )
}
