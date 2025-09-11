import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import DefectsListPage from '../pages/DefectsListPage/DefectsListPage';
import DefectSplitPage from '../pages/DefectSplitPage/DefectSplitPage';
import NewDefectModal from '../pages/NewDefectModal/NewDefectModal';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/defects" replace /> },
      { path: 'defects', element: <DefectsListPage /> },
      { path: 'defects/:id', element: <DefectSplitPage /> },
      { path: 'defects/new', element: <NewDefectModal /> },       // modal route
      { path: 'defects/:id/new', element: <NewDefectModal /> },   // modal over split
    ],
  },
]);
