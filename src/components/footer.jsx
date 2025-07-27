import {
  Box, Flex, Button, Text,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router';

function Footer() {
  return (
    <Box px={6} py={4}>
      <Flex align="center" justify="center">
        <Button as={Link} to="https://github.com/cannondev" variant="plain" fontSize="sm">
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
