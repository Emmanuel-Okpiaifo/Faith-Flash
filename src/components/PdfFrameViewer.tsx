interface PdfFrameViewerProps {
  pdfUrl: string
  title: string
}

/**
 * Renders a PDF inside a browser-native in-frame viewer. On iOS and macOS
 * Safari that's PDFKit — robust enough to paint every photo on the Mercy
 * Convention magazine without the WebKit renderer crash that DearFlip's
 * three.js + pdf.js bundle triggers there. On Android Chrome the user agent
 * delegates to Chrome's PDF viewer (also reliable). Used only on WebKit; see
 * lib/webkit.ts and MagazineViewerPage.
 *
 * Mobile WebKit sometimes refuses to inline a cross-origin PDF, so we also
 * surface a direct open link right below the frame.
 */
export function PdfFrameViewer({ pdfUrl, title }: PdfFrameViewerProps) {
  return (
    <div className="pdf-frame" aria-label={`${title} PDF`}>
      <iframe
        src={pdfUrl}
        title={`${title} PDF`}
        className="pdf-frame__iframe"
        allow="fullscreen"
      />
      <p className="pdf-frame__hint">
        Trouble opening on this device?{' '}
        <a href={pdfUrl} target="_blank" rel="noreferrer" className="nav-link">
          Open the PDF in a new tab
        </a>
        .
      </p>
    </div>
  )
}
