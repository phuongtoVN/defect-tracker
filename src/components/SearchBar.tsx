import React, { useState, useEffect } from 'react';

export default function SearchBar({ value, onChange }:{
  value: string; onChange: (v: string)=>void;
}) {
  const [local, setLocal] = useState(value);
  useEffect(()=>{ setLocal(value); }, [value]);

  // Simple debounce
  useEffect(() => {
    const t = setTimeout(() => onChange(local), 250);
    return () => clearTimeout(t);
  }, [local]);

  return (
    <div className="searchbar">
      <input
        value={local}
        onChange={e=>setLocal(e.target.value)}
        placeholder="Search defects..."
        aria-label="Search defects"
      />
    </div>
  );
}
