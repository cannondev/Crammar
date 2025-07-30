import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Box, Button, Text } from '@chakra-ui/react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

// https://www.npmjs.com/package/react-pdf
function PDFView({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages: totalPages }) {
    setNumPages(totalPages);
  }

  return (
    <Box display="flex" flexDirection="column" borderRadius={10} overflow="hidden">
      <Box bg="brand.950" display="flex" flexDirection="row" justifyContent="center" alignItems="center" gapX={4}>
        <Button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((p) => p - 1)}
          variant="plain"
          color="brand.500"
        >
          <FaAngleLeft />
        </Button>
        <Text color="brand.500" fontWeight="semibold">
          Page {pageNumber} of {numPages}
        </Text>
        <Button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber((p) => p + 1)}
          variant="plain"
          color="brand.500"
        >
          <FaAngleRight />
        </Button>
      </Box>
      <Document
        file={pdfUrl}
        // eslint-disable-next-line react/jsx-no-bind
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(err) => console.error('Failed to load PDF:', err)}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </Box>
  );
}

export default PDFView;
