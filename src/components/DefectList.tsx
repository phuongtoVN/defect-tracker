import React from 'react';
import type { Defect } from '../types/defect';
import DefectListItem from './DefectListItem';

export default function DefectList({ items }:{ items: Defect[] }) {
  return (
    <div className="defect-list">
      {items.map(d => <DefectListItem key={d.id} d={d} />)}
    </div>
  );
}
