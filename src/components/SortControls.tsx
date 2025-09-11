import React from 'react';
import type { SortKey } from '../utils/sort';

export default function SortControls({ sort, onChange }:{
  sort: SortKey;
  onChange: (v: SortKey)=>void;
}) {
  return (
    <div className="sort-controls">
      <select
        aria-label="Sort"
        value={sort}
        onChange={e=>onChange(e.target.value as SortKey)}
      >
        <option value="titleAsc">A–Z</option>
        <option value="titleDesc">Z–A</option>
        <option value="dateDesc">Newest</option>
        <option value="dateAsc">Oldest</option>
      </select>
    </div>
  );
}
