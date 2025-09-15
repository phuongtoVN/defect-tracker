import styles from './SearchBar.module.css';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search defects…',
  className = '',
}: Props) {
  return (
    <div className={`${styles.root} ${className}`}>
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M15.5 15.5l5 5m-2.5-7.5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search defects"
      />

      {value && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Clear search"
          onClick={() => onChange('')}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </button>
      )}
    </div>
  );
}
