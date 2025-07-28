import { Box } from '@chakra-ui/react';
import React from 'react';

function RSVPView() {
  return (
    <Box display="flex" flexDirection="column" alignContent="center" p={4}>
      <Box width="70vw" display="flex" flexDirection="row" justifyContent="center">
        [RSVP Reader goes here]
      </Box>
      <Box width="70vw" display="flex" flexDirection="row" justifyContent="center">
        This is the play/pause nav box
      </Box>
      <Box width="70vw" display="flex" flexDirection="row" justifyContent="center">
        This is the WPM slider
      </Box>
    </Box>
  );
}

export default RSVPView;
