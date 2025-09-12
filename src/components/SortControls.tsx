import React from 'react';
import type { SortKey } from '../utils/sort';

type Props = {
  sort: SortKey;
  onChange: (v: SortKey) => void;
};

export default function SortControls({ sort, onChange }: Props) {
  return (
    <div className="sort-controls">
      <select value={sort} onChange={(e) => onChange(e.target.value as SortKey)}>
        <option value="dateDesc">Newest</option>
        <option value="dateAsc">Oldest</option>
        <option value="titleAsc">A → Z</option>
        <option value="titleDesc">Z → A</option>
        <option value="priority">Priority (High → Low)</option>     {/* new */}
        <option value="priorityLow">Priority (Low → High)</option>   {/* new */}
      </select>
    </div>
  );
}
