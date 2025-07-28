import { Box, Text } from '@chakra-ui/react';
import React from 'react';

function SummaryView({ summary }) {
  return (
    <Box p={4}>
      <Text fontSize="lg">{summary}</Text>
    </Box>
  );
}

export default SummaryView;
