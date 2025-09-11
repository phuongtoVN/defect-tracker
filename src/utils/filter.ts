import type { Defect } from '../types/defect';

export const matchesQuery = (d: Defect, q: string) => {
  if (!q) return true;
  const s = q.toLowerCase();
  const hay = [
    d.id + '', d.title, d.description, d.assignedTo, d.reportedBy, d.partNumber, d.supplier,
    ...(d.tags ?? [])
  ].join(' ').toLowerCase();
  return hay.includes(s);
};
