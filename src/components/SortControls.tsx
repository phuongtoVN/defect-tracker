import React, { useEffect, useRef, useState } from 'react';
import type { SortKey } from '../utils/sort';
import styles from './SortControls.module.css';

type Props = {
  sort: SortKey;
  onChange: (v: SortKey) => void;
};

const LABELS: Record<SortKey, string> = {
  dateDesc: 'Newest',
  dateAsc: 'Oldest',
  titleAsc: 'A → Z',
  titleDesc: 'Z → A',
  priority: 'Priority (High → Low)',
  priorityLow: 'Priority (Low → High)',
};

const OPTIONS: SortKey[] = [
  'dateDesc',
  'dateAsc',
  'titleAsc',
  'titleDesc',
  'priority',
  'priorityLow',
];

export default function SortControls({ sort, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(
    Math.max(0, OPTIONS.indexOf(sort))
  );

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  // Keep active option in sync with current selection when opening
  useEffect(() => {
    if (open) setActiveIdx(Math.max(0, OPTIONS.indexOf(sort)));
  }, [open, sort]);

  const selectIndex = (idx: number) => {
    const key = OPTIONS[idx];
    if (!key) return;
    onChange(key);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIdx((i) => Math.min(OPTIONS.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) setOpen(true);
      else selectIndex(activeIdx);
    } else if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIdx(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIdx(OPTIONS.length - 1);
    }
  };

  return (
    <div className={styles.root}>
      <button
        ref={btnRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKeyDown}
        title="Sort"
      >
        <span className={styles.label}>{LABELS[sort]}</span>
        <svg className={styles.caret} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          className={styles.menu}
          role="listbox"
          aria-activedescendant={`opt-${activeIdx}`}
        >
          {OPTIONS.map((opt, idx) => {
            const selected = opt === sort;
            const active = idx === activeIdx;
            return (
              <div
                id={`opt-${idx}`}
                key={opt}
                role="option"
                aria-selected={selected}
                tabIndex={-1}
                className={[
                  styles.item,
                  active ? styles.itemActive : '',
                  selected ? styles.itemSelected : '',
                ].join(' ')}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => selectIndex(idx)}
              >
                <span className={styles.itemText}>{LABELS[opt]}</span>
                {selected && (
                  <svg className={styles.check} viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      d="M7.5 13.5l-3-3 1.4-1.4 1.6 1.6 6-6 1.4 1.4-7.4 7.4z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
