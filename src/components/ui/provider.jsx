import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import system from '../../theme/system';
import { ColorModeProvider } from './color-mode';

export default function Provider({ children }) {
  return (
    <ChakraProvider value={system}>
      {/* force app into dark mode via next-themes */}
      <ColorModeProvider defaultTheme="dark" attribute="class" disableTransitionOnChange>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
