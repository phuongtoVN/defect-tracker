import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { DefectsProvider } from './state/DefectsContext';
import './styles/globals.css';
import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DefectsProvider>
      <RouterProvider router={router} />
    </DefectsProvider>
  </React.StrictMode>
);
