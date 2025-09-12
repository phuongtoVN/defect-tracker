import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DefectsListPage from './pages/DefectsListPage/DefectsListPage';
import DefectSplitPage from './pages/DefectSplitPage/DefectSplitPage';
import MobileDetailPage from './pages/MobileDetailPage/MobileDetailPage';
import NewDefectModal from './pages/NewDefectModal/NewDefectModal';
import useIsMobile from './hooks/useIsMobile';

function ResponsiveDefectRoute() {
  const isMobile = useIsMobile(768);
  return isMobile ? <MobileDetailPage /> : <DefectSplitPage />;
}

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      {/* Header could go here */}
      <main className="app-content">
        {/* Render the background UI using the previous location if present */}
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Navigate to="/defects" replace />} />
          <Route path="/defects" element={<DefectsListPage />} />
          <Route path="/defects/:id" element={<ResponsiveDefectRoute />} />
        </Routes>

        {/* Render the modal on top when backgroundLocation exists */}
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/defects/new" element={<NewDefectModal />} />
            <Route path="/defects/:id/new" element={<NewDefectModal />} />
          </Routes>
        )}
      </main>
    </>
  );
}
