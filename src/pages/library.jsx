import {
  Box,
  Button,
  Card,
  Stack,
} from '@chakra-ui/react';
import {
  Document, Page,
} from 'react-pdf';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router';
import { FaTrashAlt } from 'react-icons/fa';
import useStore from '../store';

function Library() {
  // Zustand store hooks
  // Fetch all documents, current document, and delete document functions
  const allDocs = useStore((state) => state.docSlice.all);
  const fetchAllDocs = useStore((state) => state.docSlice.fetchAllDocs);
  const deleteDoc = useStore((state) => state.docSlice.deleteDoc);

  // Fetch all documents on mount
  useEffect(() => {
    fetchAllDocs();
  }, []);

  const onDeleteClick = async (id) => {
    await deleteDoc(id);
    fetchAllDocs();
  };

  return (
    <Box p={8}>
      <Stack spacing={6}>
        {allDocs.map((doc) => (
          <Card.Root key={doc._id} width="100%">
            <Stack
              direction="row"
              align="center"
              p={4}
              gap={6}
            >
              <Box
                boxSize="80px"
                overflow="hidden"
                borderRadius="md"
                background="gray.100"
              >
                {/* Display the first page of the PDF as a thumbnail */}
                <Document file={doc.pdfUrl}>
                  <Page
                    pageNumber={1}
                    width={80}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </Box>

              <Box flex="1">
                <Card.Title>{doc.title}</Card.Title>
                <Card.Description>{doc.fileName}</Card.Description>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="plain"
                  onClick={() => onDeleteClick(doc._id)}
                  _hover={{ bg: 'red' }}
                >
                  <FaTrashAlt />
                </Button>
                <Button as={NavLink} to={`/reader/${doc._id}`} _hover={{ bg: 'brand.950' }} fontWeight="semibold">
                  Read
                </Button>
              </Stack>
            </Stack>
          </Card.Root>
        ))}
      </Stack>
    </Box>
  );
}

export default Library;
