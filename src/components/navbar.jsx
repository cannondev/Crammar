import {
  Box, Flex, Text, Button, FileUpload,
} from '@chakra-ui/react';
import { HiUpload } from 'react-icons/hi';
import React from 'react';

function NavBar() {
  return (
    <Box bg="brand.500" px={6} py={4}>
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontFamily="heading" fontWeight="bold" color="brand.950" fontSize="4xl">
            Crammar.
          </Text>
        </Box>
        <Box>
          <Flex align="center" justify="space-between" gap={4}>
            <Button variant="ghost">
              About
            </Button>
            <Button variant="ghost">
              Library
            </Button>
            {/* File Upload Button */}
            <Box>
              <FileUpload.Root accept={['application/pdf']}> {/* application/pdf is the official MIME type */}
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                  <Button bg="brand.950" color="brand.500" size="sm">
                    <HiUpload /> Upload PDF
                  </Button>
                </FileUpload.Trigger>
                <FileUpload.List />
              </FileUpload.Root>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default NavBar;
