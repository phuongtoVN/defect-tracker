import { useNavigate, useParams } from 'react-router-dom';
import { useDefects } from '../../state/DefectsContext';
import { formatDate } from '../../utils/dates';
import Badge from '../../components/Badge';
import styles from './styles.module.css';

const severityColor: Record<string, 'gray'|'blue'|'amber'|'green'|'red'> = {
  Low: 'gray', Medium: 'blue', High: 'amber', Critical: 'red',
};
const statusColor: Record<string, 'gray'|'blue'|'amber'|'green'|'red'> = {
  Open: 'blue', 'In Progress': 'amber', Resolved: 'green', Closed: 'gray',
};

export default function MobileDetailPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const { getById } = useDefects();
  const d = id ? getById(id) : undefined;

  if (!d) {
    return (
      <div className={styles.page}>
        <header className={styles.topbar}>
          <button className={styles.back} onClick={() => nav(-1)} aria-label="Back">←</button>
          <h1 className={styles.title}>Not found</h1>
        </header>
        <div className={styles.body}>
          <p>That defect doesn’t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <button className={styles.back} onClick={() => nav(-1)} aria-label="Back">←</button>
        <h1 className={styles.title}>{d.title}</h1>
      </header>

      <div className={styles.body}>
        <div className={styles.badges}>
          <Badge text={d.severity} color={severityColor[d.severity] ?? 'gray'} />
          <Badge text={d.status}   color={statusColor[d.status] ?? 'gray'} />
          {typeof d.priorityRank === 'number' && (
            <Badge text={`Priority #${d.priorityRank}`} color="amber" />
          )}
        </div>

        <div className={styles.meta}>
          <div><strong>Reported By</strong><span>{d.reportedBy ?? '—'}</span></div>
          <div><strong>Assigned To</strong><span>{d.assignedTo ?? '—'}</span></div>
          <div><strong>Part Number</strong><span>{d.partNumber ?? '—'}</span></div>
          <div><strong>Supplier</strong><span>{d.supplier ?? '—'}</span></div>
          <div><strong>Created</strong><span>{formatDate(d.createdAt)}</span></div>
          <div><strong>Updated</strong><span>{formatDate(d.updatedAt)}</span></div>
        </div>

        <section>
          <h3>Description</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{d.description ?? '—'}</p>
        </section>

        {d.tags?.length ? (
          <section>
            <h3>Tags</h3>
            <ul className={styles.tags}>
              {d.tags.map((t, i) => <li key={i}><Badge text={t} color="blue" /></li>)}
            </ul>
          </section>
        ) : null}

        {d.stepsToReproduce?.length ? (
          <section>
            <h3>Steps to Reproduce</h3>
            <ol className={styles.steps}>
              {d.stepsToReproduce.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </section>
        ) : null}

        {d.attachments?.length ? (
          <section>
            <h3>Attachments</h3>
            <ul className={styles.attachments}>
              {d.attachments.map((u, i) => (
                <li key={i}><a href={u} target="_blank" rel="noreferrer">{u}</a></li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
