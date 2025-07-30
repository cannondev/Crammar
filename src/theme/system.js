import {
  defineConfig,
  createSystem,
  defaultConfig,
} from '@chakra-ui/react';

// https://chakra-ui.com/docs/theming/theme
const config = defineConfig({

  initialColorMode: 'dark',

  theme: {
    extend: true, // to keep base tokens + add yours
    tokens: {
      colors: {
        brand: {
          10: { value: '#fffcf2' },
          25: { value: '#f9f9c7' },
          100: { value: '#ccc5b9' },
          50: { value: '#403d39' },
          500: { value: '#252422' },
          950: { value: '#ed973b' },
        },
      },
      fonts: {
        heading: { value: 'Poppins, sans-serif' },
        body: { value: 'Inter, sans-serif' },
        mono: { value: 'SFMono, monospace' },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);
export default system;
