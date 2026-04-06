let cachedLib = null

async function loadPdfJs(retries = 2) {
  if (cachedLib) return cachedLib
  for (let i = 0; i <= retries; i++) {
    try {
      const lib = await import('pdfjs-dist')
      lib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).href
      cachedLib = lib
      return lib
    } catch {
      if (i === retries) {
        if (!sessionStorage.getItem('pdf-reload')) {
          sessionStorage.setItem('pdf-reload', '1')
          window.location.reload()
          return null
        }
        throw new Error('Failed to load PDF module. Please refresh the page.')
      }
      await new Promise((r) => setTimeout(r, 300))
    }
  }
}

export async function extractTextFromPDF(file) {
  sessionStorage.removeItem('pdf-reload')
  const pdfjsLib = await loadPdfJs()
  if (!pdfjsLib) return ''

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  const pages = []

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const text = content.items.map((item) => item.str).join(' ')
    pages.push(text)
  }

  return pages.join('\n\n')
}
