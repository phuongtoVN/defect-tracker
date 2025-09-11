import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { useDefects } from '../../state/DefectsContext';
import { genId } from '../../utils/id';
import type { Severity, Status } from '../../types/defect';
import styles from './styles.module.css';

export default function NewDefectModal() {
  const nav = useNavigate();
  const { dispatch } = useDefects();

  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<Severity>('Low');
  const [status, setStatus] = useState<Status>('Open');
  const [reportedBy, setReportedBy] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [supplier, setSupplier] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string>('');
  const [steps, setSteps] = useState<string>('');
  const [attachments, setAttachments] = useState<string>('');

  const close = () => nav(-1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const now = new Date().toISOString();
    dispatch({
      type: 'ADD_DEFECT',
      payload: {
        id: genId(),
        title,
        severity,
        status,
        reportedBy: reportedBy || undefined,
        description: description || undefined,
        partNumber: partNumber || undefined,
        supplier: supplier || undefined,
        createdAt: now,
        updatedAt: now,
        assignedTo: assignedTo || undefined,
        tags: tags ? tags.split(',').map(s => s.trim()).filter(Boolean) : undefined,
        stepsToReproduce: steps ? steps.split('\n').map(s => s.trim()).filter(Boolean) : undefined,
        attachments: attachments ? attachments.split('\n').map(s => s.trim()).filter(Boolean) : undefined,
      }
    });

    close();
  };

  return (
    <Modal onClose={close}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.formHeader}>
          <h2>Add Defect</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className={styles.field}>
          <label>Title*</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div className={styles.field}>
          <label>Description</label>
          <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Severity</label>
            <select value={severity} onChange={e => setSeverity(e.target.value as Severity)}>
              {['Low', 'Medium', 'High', 'Critical'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as Status)}>
              {['Open', 'In Progress', 'Resolved', 'Closed'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Reported By</label>
            <input value={reportedBy} onChange={e => setReportedBy(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Assigned To</label>
            <input value={assignedTo} onChange={e => setAssignedTo(e.target.value)} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Part Number</label>
            <input value={partNumber} onChange={e => setPartNumber(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Supplier</label>
            <input value={supplier} onChange={e => setSupplier(e.target.value)} />
          </div>
        </div>

        <div className={styles.field}>
          <label>Tags (comma separated)</label>
          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="critical, inspection"
          />
        </div>

        <div className={styles.field}>
          <label>Steps to Reproduce (one per line)</label>
          <textarea
            rows={3}
            value={steps}
            onChange={e => setSteps(e.target.value)}
            placeholder={`Locate the component\nApply standard inspection procedure`}
          />
        </div>

        <div className={styles.field}>
          <label>Attachments (URLs, one per line)</label>
          <textarea
            rows={2}
            value={attachments}
            onChange={e => setAttachments(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submit}>Submit</button>
        </div>
      </form>
    </Modal>
  );
}
