// src/theme/system.js
import {
  defineConfig,
  createSystem,
  defaultConfig,
} from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    extend: true, // to keep base tokens + add yours
    tokens: {
      colors: {
        brand: {
          10: { value: '#fffcf2' },
          100: { value: '#ccc5b9' },
          50: { value: '#403d39' },
          500: { value: '#252422' },
          950: { value: '#eb5e28' },
        },
      },
      fonts: {
        heading: { value: 'Poppins, sans-serif' },
        body: { value: 'Inter, sans-serif' },
        mono: { value: 'SFMono, monospace' },
      },
    },
  },
  semanticTokens: {
    colors: {
      text: {
        default: { value: 'gray.900' },
        _dark: { value: 'gray.100' },
      },
      background: {
        default: { value: 'white' },
        _dark: { value: 'gray.900' },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);
export default system;
