import styles from './Form.module.css';

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
};

export default function TextArea({ label, value, onChange, rows = 3, placeholder }: TextAreaProps) {
  return (
    <div className={styles.field}>
      <label>
        {label}
        <textarea
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
