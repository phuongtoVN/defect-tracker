import styles from './Form.module.css';

type MultiSelectProps = {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
};

export default function MultiSelect({ label, value, onChange, placeholder }: MultiSelectProps) {
  const text = value.join(', ');

  return (
    <div className={styles.field}>
      <label>
        {label}
        <input
          type="text"
          value={text}
          placeholder={placeholder}
          onChange={(e) =>
            onChange(
              e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
            )
          }
        />
      </label>
    </div>
  );
}
