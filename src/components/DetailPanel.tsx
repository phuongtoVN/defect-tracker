import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDefects } from '../state/DefectsContext';
import { formatDate } from '../utils/dates';

export default function DetailPanel() {
  const nav = useNavigate();
  const { id } = useParams();
  const { getById } = useDefects();
  const d = id ? getById(id) : undefined;

  if (!d) return (
    <div className="detail-panel">
      <div className="detail-header">
        <div className="detail-title">Not found</div>
        <button className="close" onClick={()=>nav('/defects')}>×</button>
      </div>
      <p>That defect doesn't exist. Go back to the list.</p>
    </div>
  );

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div className="detail-title">{d.title}</div>
        <button className="close" onClick={()=>nav('/defects')}>×</button>
      </div>

      <div className="detail-grid">
        <div><strong>Severity</strong><div>{d.severity}</div></div>
        <div><strong>Status</strong><div>{d.status}</div></div>
        <div><strong>Reported By</strong><div>{d.reportedBy ?? '—'}</div></div>
        <div><strong>Part Number</strong><div>{d.partNumber ?? '—'}</div></div>
        <div><strong>Supplier</strong><div>{d.supplier ?? '—'}</div></div>
        <div><strong>Created</strong><div>{formatDate(d.createdAt)}</div></div>
        <div><strong>Assigned To</strong><div>{d.assignedTo ?? '—'}</div></div>
      </div>

      <hr />
      <h3>Description</h3>
      <p style={{whiteSpace:'pre-wrap'}}>{d.description ?? '—'}</p>

      {d.stepsToReproduce?.length ? (
        <>
          <hr />
          <h3>Steps to Reproduce</h3>
          <ol className="steps">
            {d.stepsToReproduce.map((s,i)=><li key={i}>{s}</li>)}
          </ol>
        </>
      ): null}
    </div>
  );
}
