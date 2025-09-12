import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import useModalBackground from '../hooks/useModalBackground'; 

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export default function Modal({ children, onClose, className = '' }: Props) {
  
  useModalBackground(true, ['.app-content']); 

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`${styles.modalCard} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
