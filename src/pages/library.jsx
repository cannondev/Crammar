import {
  Box, Button, Card, Stack, Text,
} from '@chakra-ui/react';
import { Document, Page } from 'react-pdf';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router';
import { FaTrashAlt } from 'react-icons/fa';
import useStore from '../store';

function Library() {
  const allDocs = useStore((state) => state.docSlice.all);
  const fetchAllDocs = useStore((state) => state.docSlice.fetchAllDocs);
  const deleteDoc = useStore((state) => state.docSlice.deleteDoc);

  useEffect(() => {
    fetchAllDocs();
  }, [fetchAllDocs]);

  const onDeleteClick = async (id) => {
    await deleteDoc(id);
    fetchAllDocs();
  };

  return (
    <Box p={8}>
      {/* placeholder */}
      {allDocs.length === 0 ? (
        <Text fontSize="xl" color="gray.500" textAlign="center">
          Nothing in the library. Create a doc!
        </Text>
      ) : (
        <Stack spacing={6}>
          {allDocs.map((doc) => (
            <Card.Root key={doc._id} width="100%">
              <Stack direction="row" align="center" p={4} gap={6}>
                <Box
                  boxSize="80px"
                  overflow="hidden"
                  borderRadius="md"
                  background="gray.100"
                >
                  {/* pdf thumbnail is a rendering of the first page */}
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
                  <Button
                    as={NavLink}
                    to={`/reader/${doc._id}`}
                    _hover={{ bg: 'brand.950' }}
                    fontWeight="semibold"
                  >
                    Read
                  </Button>
                </Stack>
              </Stack>
            </Card.Root>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default Library;
