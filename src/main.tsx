import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DefectsProvider } from './state/DefectsContext';
import './styles/globals.css';
import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DefectsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DefectsProvider>
  </React.StrictMode>
);
