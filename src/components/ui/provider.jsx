import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import system from '../../theme/system';
import { ColorModeProvider } from './color-mode';

export default function Provider(props) {
  return (
    <ChakraProvider value={system}>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
