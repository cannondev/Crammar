// src/components/PDFView.jsx
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Button } from '@chakra-ui/react';

function PDFView({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  console.log({ pdfUrl });

  function onDocumentLoadSuccess({ numPages: totalPages }) {
    setNumPages(totalPages);
  }

  return (
    <div>
      {/* Use your pdfUrl prop instead of a hard‑coded string */}
      <Document
        file={pdfUrl}
        // eslint-disable-next-line react/jsx-no-bind
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(err) => console.error('Failed to load PDF:', err)}
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <p>
        Page {pageNumber} of {numPages}
      </p>

      {/* Optional simple controls */}
      <Button
        disabled={pageNumber <= 1}
        onClick={() => setPageNumber((p) => p - 1)}
      >
        Prev
      </Button>
      <Button
        disabled={pageNumber >= numPages}
        onClick={() => setPageNumber((p) => p + 1)}
      >
        Next
      </Button>
    </div>
  );
}

export default PDFView;
