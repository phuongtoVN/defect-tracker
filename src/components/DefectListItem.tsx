import React from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Defect } from '../types/defect';
import { formatDate } from '../utils/dates';

export default function DefectListItem({ d }:{ d: Defect }) {
  const { id } = useParams();
  const selected = String(d.id) === String(id);

  return (
    <Link to={`/defects/${d.id}`} className={`defect-item ${selected ? 'selected' : ''}`}>
      <div className="item-title">{d.title}</div>
      <div className="item-sub">{formatDate(d.createdAt)}</div>
    </Link>
  );
}
