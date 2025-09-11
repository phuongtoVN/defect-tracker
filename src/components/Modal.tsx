import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  /** optional extra class to tweak width per-usage */
  className?: string;
};

export default function Modal({ children, onClose, className = '' }: Props) {
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
      onClick={onClose}                    /* click outside closes */
    >
      <div
        className={`${styles.modalCard} ${className}`}
        onClick={(e) => e.stopPropagation()}  /* don't close when clicking inside */
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
