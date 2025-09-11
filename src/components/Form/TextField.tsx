import React from 'react';
import styles from './Form.module.css';

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
};

export default function TextField({ label, value, onChange, required, placeholder }: TextFieldProps) {
  return (
    <div className={styles.field}>
      <label>
        {label}{required && '*'}
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
