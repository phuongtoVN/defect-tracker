import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, onClose }:{
  children: React.ReactNode; onClose: ()=>void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return createPortal(
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        {children}
      </div>
    </div>,
    document.body
  );
}
