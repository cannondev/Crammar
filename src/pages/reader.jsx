import { Box, Text, SegmentGroup } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useStore from '../store';
import SummaryView from '../components/summaryView';
import RSVPView from '../components/rsvpView';
import PDFView from '../components/pdfView';

function Reader() {
  const { docID } = useParams(); // retrieves complex docID given by API call
  const doc = useStore((state) => state.docSlice.current);
  const fetchDoc = useStore((state) => state.docSlice.fetchDoc);

  const [view, setView] = useState('RSVP'); // default view set to RSVP

  useEffect(() => {
    fetchDoc(docID);
  }, [docID]);

  useEffect(() => { // used for debugging to check for doc defintion
    console.log('Fetched doc:', doc);
  }, [doc]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" flex="1" minWidth="80vw" minHeight="100%" p={4}>
      <Box display="flex" flexDirection="row" gap="20" alignItems="center" minWidth="40vw">
        <Text textAlign="center" fontSize="3xl">
          {doc.title}
        </Text>

        {/* https://chakra-ui.com/docs/components/segment-group */}
        <SegmentGroup.Root value={view} onValueChange={(e) => setView(e.value)}>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={['Summary', 'RSVP', 'PDF']} />
        </SegmentGroup.Root>
      </Box>

      <Box width="70vw" height="100%" display="flex" flexDirection="column" alignItems="center" justifyItems="center" mt={8}>
        {view === 'Summary' && <SummaryView summary={doc.summary} />}
        {view === 'RSVP' && <RSVPView wordArray={doc.wordArray} />}
        {view === 'PDF' && <PDFView pdfUrl={doc.pdfUrl} />}
      </Box>
    </Box>
  );
}

export default Reader;
