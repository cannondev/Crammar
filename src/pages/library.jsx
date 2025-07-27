import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useStore from '../store';

function Library() {
  const allDocs = useStore((state) => state.docSlice.all);
  const fetchAllDocs = useStore((state) => state.docSlice.fetchAllDocs);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllDocs();
  }, []);

  return (
    <Box p={8}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {allDocs.map((doc) => (
          <Card
            key={doc.id}
            flexDirection="row"
            overflow="hidden"
            maxW="xl"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW="200px"
              src={doc.thumbnail || 'https://via.placeholder.com/200x300'}
              alt={doc.title}
            />
            <Box>
              <CardBody>
                <CardTitle mb="2">{doc.title}</CardTitle>
                <CardDescription>
                  {doc.description || 'No description provided.'}
                </CardDescription>
              </CardBody>
              <CardFooter>
                <Button
                  size="sm"
                  onClick={() => navigate(`/docs/${doc.id}`)}
                  bg="brand.950"
                  color="brand.500"
                >
                  View RSVP
                </Button>
              </CardFooter>
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Library;
