import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import system from '../../theme/system';
import { ColorModeProvider } from './color-mode';

export default function Provider({ children }) {
  return (
    <ChakraProvider theme={system}>
      {/* force app into dark mode via next-themes */}
      <ColorModeProvider>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
