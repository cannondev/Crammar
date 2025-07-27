import {
  Box, Flex, Button,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import React from 'react';
import { NavLink } from 'react-router';

function NavBar() {
  return (
    <Box bg="brand.500" px={6} py={4}>
      <Flex align="center" justify="space-between">
        <Box>
          <Button
            as={NavLink}
            to="/"
            variant="plain"
            color="brand.950"
            fontSize="4xl"
            fontWeight="bold"
          >
            Crammar.
          </Button>
        </Box>
        <Box>
          <Flex align="center" justify="space-between" gap={4}>
            <Button as={NavLink} to="/library" variant="ghost">
              Library
            </Button>
            {/* File Upload Button */}
            <Button
              bg="brand.950"
              color="brand.500"
              size="sm"
              as={NavLink}
              to="/newDoc"
            >
              <FaPlusCircle /> Create Doc
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default NavBar;
