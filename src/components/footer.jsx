import {
  Box, Flex, Button, Text,
} from '@chakra-ui/react';
import React from 'react';

function Footer() {
  return (
    <Box px={6} py={4}>
      <Flex align="center" justify="center">
        <Button variant="plain" fontSize="sm">
          @cannondev
        </Button>
        <Text fontSize="sm">
          July 2025
        </Text>
      </Flex>
    </Box>
  );
}

export default Footer;
