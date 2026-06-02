import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
// TS may complain about missing type declarations for CSS imports.
// @ts-ignore: Allow side-effect import of CSS without type declarations
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
