import styles from './Form.module.css';

type SelectProps<T extends string> = {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
};

export default function Select<T extends string>({ label, value, options, onChange }: SelectProps<T>) {
  return (
    <div className={styles.field}>
      <label>
        {label}
        <select value={value} onChange={(e) => onChange(e.target.value as T)}>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
