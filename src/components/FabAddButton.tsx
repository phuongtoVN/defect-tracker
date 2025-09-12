import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function FabAddButton() {
  const nav = useNavigate();
  const loc = useLocation();
  const { id } = useParams(); // if you're on /defects/:id

  const open = () => {
    const to = id ? `/defects/${id}/new` : '/defects/new';
    nav(to, { state: { backgroundLocation: loc } });
  };

  return (
    <button className="fab" onClick={open} aria-label="Add new defect" title="Add new defect">
      +
    </button>
  );
}
