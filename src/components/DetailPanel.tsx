import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDefects } from '../state/DefectsContext';
import { formatDate } from '../utils/dates';
import Badge from './Badge'; // ← small pill for quick visual cues

// Optional: map values to badge colors (matches Badge.module.css colors)
const severityColor: Record<string, 'gray' | 'blue' | 'amber' | 'green' | 'red'> = {
  Low: 'gray',
  Medium: 'blue',
  High: 'amber',
  Critical: 'red',
};
const statusColor: Record<string, 'gray' | 'blue' | 'amber' | 'green' | 'red'> = {
  Open: 'blue',
  'In Progress': 'amber',
  Resolved: 'green',
  Closed: 'gray',
};

export default function DetailPanel() {
  const nav = useNavigate();
  const { id } = useParams();
  const { getById } = useDefects();
  const d = id ? getById(id) : undefined;

  if (!d) {
    return (
      <div className="detail-panel">
        <div className="detail-header">
          <div className="detail-title">Not found</div>
          <button
            className="close"
            onClick={() => nav('/defects')}
            aria-label="Close details"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"/>
            </svg>
          </button>

        </div>
        <p>That defect doesn't exist. Go back to the list.</p>
      </div>
    );
  }

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div className="detail-title">{d.title}</div>
        <button className="close" onClick={() => nav('/defects')}>×</button>
      </div>

      {/* Top badges */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: 12 }}>
        <Badge text={d.severity} color={severityColor[d.severity] ?? 'gray'} />
        <Badge text={d.status} color={statusColor[d.status] ?? 'gray'} />
        {typeof d.priorityRank === 'number' && (
          <Badge text={`Priority #${d.priorityRank}`} color="amber" />
        )}
      </div>

      {/* Meta grid */}
      <div className="detail-grid">
        <div><strong>Reported By</strong><div>{d.reportedBy ?? '—'}</div></div>
        <div><strong>Assigned To</strong><div>{d.assignedTo ?? '—'}</div></div>

        <div><strong>Part Number</strong><div>{d.partNumber ?? '—'}</div></div>
        <div><strong>Supplier</strong><div>{d.supplier ?? '—'}</div></div>

        <div><strong>Created</strong><div>{formatDate(d.createdAt)}</div></div>
        <div><strong>Updated</strong><div>{formatDate(d.updatedAt)}</div></div>

       
        
      </div>

      <hr />
      <h3>Description</h3>
      <p style={{ whiteSpace: 'pre-wrap' }}>{d.description ?? '—'}</p>

      {/* Tags */}
      <hr />
      <h3>Tags</h3>
      {d.tags?.length ? (
        <ul style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingLeft: 0, listStyle: 'none' }}>
          {d.tags.map((tag, i) => (
            <li key={i}>
              <Badge text={tag} color="blue" />
            </li>
          ))}
        </ul>
      ) : (
        <p>—</p>
      )}

      {/* Steps */}
      {d.stepsToReproduce?.length ? (
        <>
          <hr />
          <h3>Steps to Reproduce</h3>
          <ol className="steps">
            {d.stepsToReproduce.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </>
      ) : null}

      {/* Attachments */}
      <hr />
      <h3>Attachments</h3>
      {d.attachments?.length ? (
        <ul style={{ paddingLeft: 18 }}>
          {d.attachments.map((url, i) => (
            <li key={i}>
              <a href={url} target="_blank" rel="noreferrer">{url}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>—</p>
      )}
    </div>
  );
}
