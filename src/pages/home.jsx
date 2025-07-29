/* eslint-disable padded-blocks */
import {
  Box, Text, Flex, Button,
} from '@chakra-ui/react';
import React from 'react';
import { newDocOverlay } from './newDoc';
import HeroRSVP from '../components/heroRSVP';

function Home() {
  return (
    <Flex flexDirection="column" width="100%" height="100%" justifyContent="space-evenly">
      <Box color="brand.10" width="100%" padding="4">
        <HeroRSVP />
      </Box>
      <Box width="100%" padding="4" color="brand.100" display="flex" fontSize="4xl" alignItems="center" justifyContent="center">
        <Text textAlign="center">
          Powered By RSVP.
        </Text>
        <Button onClick={() => newDocOverlay.open('new-doc', {})} variant="plain" color="brand.950" fontWeight="semibold" fontSize="4xl" _hover={{ textDecoration: 'underline' }}>
          Try it yourself.
        </Button>
      </Box>
    </Flex>
  );
}

export default Home;
