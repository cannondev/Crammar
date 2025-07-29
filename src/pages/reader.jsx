import { Box, Text, SegmentGroup } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useStore from '../store';
import SummaryView from '../components/summaryView';
import RSVPView from '../components/rsvpView';

function Reader() {
  const { docID } = useParams(); // retrieves complex docID given by API call
  const doc = useStore((state) => state.docSlice.current);
  const fetchDoc = useStore((state) => state.docSlice.fetchDoc);

  const [view, setView] = useState('Rsvp');

  useEffect(() => {
    fetchDoc(docID);
  }, [docID]);

  useEffect(() => {
    console.log('Fetched doc:', doc);
  }, [doc]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" flex="1" minWidth="80vw" minHeight="100%" p={4}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" minWidth="40vw">
        <Text textAlign="center" fontSize="3xl">
          {doc.title}
        </Text>

        <SegmentGroup.Root value={view} onValueChange={(e) => setView(e.value)}>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={['Summary', 'Rsvp']} />
        </SegmentGroup.Root>
      </Box>

      <Box width="70vw" height="100%" display="flex" flexDirection="column" alignItems="center" justifyItems="center" mt={8}>
        {view === 'Summary' && <SummaryView summary={doc.summary} />}
        {view === 'Rsvp' && <RSVPView wordArray={doc.wordArray} />}
      </Box>
    </Box>
  );
}

export default Reader;
