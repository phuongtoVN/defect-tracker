import styles from './Form.module.css';

type FileLinksInputProps = {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
};

export default function FileLinksInput({ label, value, onChange, placeholder }: FileLinksInputProps) {
  const text = value.join('\n');

  return (
    <div className={styles.field}>
      <label>
        {label}
        <textarea
          rows={2}
          value={text}
          placeholder={placeholder}
          onChange={(e) =>
            onChange(
              e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
            )
          }
        />
      </label>
    </div>
  );
}
