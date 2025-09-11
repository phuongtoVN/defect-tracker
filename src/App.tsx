import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';

// Blur the background whenever the modal route is active
const useIsModalRoute = () => {
  const { pathname } = useLocation();
  return pathname.endsWith('/new');
};

const App: React.FC = () => {
  const isModal = useIsModalRoute();
  return (
    <div className="app-root">
      <Header />
      <div className={`app-content ${isModal ? 'blurred' : ''}`}>
        <Outlet />
      </div>

      {/* Footer credits (optional) */}
      <div style={{ textAlign:'center', color:'#9aa4b2', fontSize:12, padding:10 }}>
        <Link to="/defects">Home</Link>
      </div>
    </div>
  );
};

export default App;
