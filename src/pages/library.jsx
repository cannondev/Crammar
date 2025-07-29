import {
  Box,
  Button,
  Card,
  Avatar,
  SimpleGrid,
} from '@chakra-ui/react';
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
  }, []);

  const onDeleteClick = async (id) => {
    await deleteDoc(id);
    fetchAllDocs();
  };

  return (
    <Box p={8}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {allDocs.map((doc) => (
          <Box key={doc._id}>
            <Card.Root width="320px">
              <Card.Body gap="2">
                <Avatar.Root size="lg" shape="rounded">
                  <Avatar.Image src="https://picsum.photos/200/300" />
                  <Avatar.Fallback name="Nue Camp" />
                </Avatar.Root>
                <Card.Title mt="2">{doc.title}</Card.Title>
                <Card.Description>
                  {doc.fileName}
                </Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="space-between">
                <Button as={NavLink} variant="outline" onClick={() => onDeleteClick(doc._id)} to="/library"><FaTrashAlt /></Button>
                <Button as={NavLink} to={`/reader/${doc._id}`}>Read</Button>
              </Card.Footer>
            </Card.Root>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Library;
