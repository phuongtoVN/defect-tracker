import { Routes, Route, Navigate } from 'react-router-dom';
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
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/defects" replace />} />
      <Route path="/defects" element={<DefectsListPage />} />
      <Route path="/defects/new" element={<NewDefectModal />} />
      <Route path="/defects/:id" element={<ResponsiveDefectRoute />} />
    </Routes>
  );
}
