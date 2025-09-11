import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FabAddButton() {
  const nav = useNavigate();
  const loc = useLocation();
  const open = () => nav(loc.pathname.endsWith('/new') ? loc.pathname : `${loc.pathname}/new`);

  return (
    <button className="fab" onClick={open} aria-label="Add new defect" title="Add new defect">＋</button>
  );
}
