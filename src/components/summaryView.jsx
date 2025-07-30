import { Box, Text } from '@chakra-ui/react';
import React from 'react';

function SummaryView({ summary }) {
  return (
    <Box bg="brand.950" display="flex" flexDirection="column" justifyContent="center" alignItems="center" rounded={10} overflow="hidden">
      <Text fontSize="lg" color="black" fontWeight="semibold" p={3}>
        Summary:
      </Text>
      <Box
        bg="brand.25"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="lg" color="black" fontWeight="regular" p={4}>
          {summary}
        </Text>
      </Box>
    </Box>
  );
}

export default SummaryView;
