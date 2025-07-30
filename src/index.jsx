import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import App from './app';
import Provider from './components/ui/provider';

/* *************************************
  INDEX.JSX
  Author: Thomas Clark
  Last Updated: Jul. 2025
************************************** */

// Point at the matching version on unpkg
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
);
