export async function extractTextFromPDF(file) {
  let pdfjsLib
  try {
    pdfjsLib = await import('pdfjs-dist')
  } catch {
    // Stale chunk after deploy: force reload once
    if (!sessionStorage.getItem('pdf-reload')) {
      sessionStorage.setItem('pdf-reload', '1')
      window.location.reload()
      return ''
    }
    throw new Error('Failed to load PDF module. Please refresh the page.')
  }
  sessionStorage.removeItem('pdf-reload')
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).href

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
