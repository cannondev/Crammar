import {
  Box, Text, Flex, Link,
} from '@chakra-ui/react';
import React from 'react';

function Home() {
  return (
    <Flex flexDirection="column" width="100%" height="100%" justifyContent="space-evenly">
      <Box color="brand.10" width="100%" padding="4">
        <Text textAlign="center" fontSize="9xl">Read. Fast.</Text>
      </Box>
      <Box width="100%" padding="4" color="brand.100">
        <Text textAlign="center" fontSize="4xl">
          Powered By RSVP. {' '}
          <Link
            to="/upload"
            color="orange.400"
            fontWeight="semibold"
            _hover={{ textDecoration: 'underline' }}
          >
            Try it yourself
          </Link>
          .
        </Text>
      </Box>
    </Flex>
  );
}

export default Home;
