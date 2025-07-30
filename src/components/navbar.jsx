import {
  Box, Flex, Button,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { newDocOverlay } from '../pages/newDoc';
import { loginOverlay } from '../pages/login';
import useStore from '../store';

// classic navbar, nothing special
function NavBar() {
  const username = useStore((state) => state.docSlice.username);
  const logout = useStore((state) => state.docSlice.logout);
  const navigate = useNavigate();

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
            {/* if logged in on log out */}
            {username ? (
              <Button
                fontSize="3xl"
                variant="ghost"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            ) : (
              // prompt login if not logged in
              <Button
                fontSize="3xl"
                variant="ghost"
                onClick={() => loginOverlay.open('login', {})}
              >
                Login
              </Button>
            )}
            {/* Only show Library when logged in */}
            {username && (
            <Button
              as={NavLink}
              to="/library"
              fontSize="3xl"
              variant="ghost"
            >
              {`${username}'s Library`}
            </Button>
            )}
            {/* Show Create Doc button if logged in */}
            {username && (
            <Button
              bg="brand.950"
              color="brand.500"
              size="md"
              fontSize="2xl"
              fontWeight="semibold"
              onClick={() => {
                if (username) newDocOverlay.open('new-doc', {});
              }}
              isDisabled={!username}
            >
              <FaPlusCircle /> Create Doc
            </Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default NavBar;
