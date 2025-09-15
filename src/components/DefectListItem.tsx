import { Link, useParams } from 'react-router-dom';
import type { Defect } from '../types/defect';
import { formatShortMdY } from '../utils/dates';  // new short date (MM/DD/YY)

export default function DefectListItem({ d }: { d: Defect }) {
  const { id } = useParams();
  const selected = String(d.id) === String(id);

  // prefer last update; fall back to created
  const date = formatShortMdY(d.updatedAt ?? d.createdAt);

  return (
    <Link to={`/defects/${d.id}`} className={`defect-item ${selected ? 'selected' : ''}`}>
      <div className="item-row">
        <div className="item-title">{d.title}</div>
        <div className="item-date">{date}</div>
      </div>
      <div className="item-desc">{d.description ?? '—'}</div>
    </Link>
  );
}
