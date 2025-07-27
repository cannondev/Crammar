import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import App from './app';
import Provider from './components/ui/provider';

/* *************************************
  INDEX.JSX
  Author: Thomas Clark
  Last Updated: Jul. 2025

  Things that im taking out but should not be forgotten:
    1. Nav links and routes to about pages and fallbacks
************************************** */

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
);
