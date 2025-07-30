/* eslint-disable padded-blocks */
import React from 'react';
import {
  Box, Text, Flex, Button,
} from '@chakra-ui/react';
import { newDocOverlay } from './newDoc';
import { loginOverlay } from './login';
import HeroRSVP from '../components/heroRSVP';
import useStore from '../store';

function Home() {
  const username = useStore((state) => state.docSlice.username);

  // "Try it yourself" click
  const handleTryIt = () => {
    if (!username) {
      loginOverlay.open('login', {});
    } else {
      newDocOverlay.open('new-doc', {});
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      justifyContent="space-evenly"
    >
      <Box color="brand.10" width="100%" padding="4">
        <HeroRSVP />
      </Box>
      <Box
        width="100%"
        padding="4"
        color="brand.100"
        display="flex"
        fontSize="4xl"
        alignItems="center"
        justifyContent="center"
      >
        <Text textAlign="center" mr={4}>
          Powered By RSVP.
        </Text>
        <Button
          onClick={handleTryIt}
          variant="plain"
          color="brand.950"
          fontWeight="semibold"
          fontSize="4xl"
          _hover={{ textDecoration: 'underline' }}
        >
          Try it yourself.
        </Button>
      </Box>
    </Flex>
  );
}

export default Home;
