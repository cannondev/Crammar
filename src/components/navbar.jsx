import {
  Box, Flex, Button,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import React from 'react';
import { NavLink } from 'react-router';
import { newDocOverlay } from '../pages/newDoc';

// classic navbar, nothing special
function NavBar() {
  return (
    <Box bg="brand.500" px={6} py={4} mt="10px">
      <Flex align="center" justify="space-between">
        <Box>
          <Button
            as={NavLink}
            to="/"
            variant="plain"
            color="brand.950"
            fontSize="5xl"
            fontWeight="bold"
          >
            Crammar.
          </Button>
        </Box>
        <Box>
          <Flex align="center" justify="space-between" gap={4}>
            <Button as={NavLink} to="/library" fontSize="3xl" variant="ghost">
              My Library
            </Button>
            <Button
              bg="brand.950"
              color="brand.500"
              size="md"
              fontSize="2xl"
              fontWeight="semibold"
              onClick={() => newDocOverlay.open('new-doc', {})} // open the newDoc modal overlay
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
