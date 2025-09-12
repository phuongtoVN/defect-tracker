export const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';

export const compareDateDesc = (a: string, b: string) =>
  new Date(b).getTime() - new Date(a).getTime();

export const compareDateAsc = (a: string, b: string) =>
  new Date(a).getTime() - new Date(b).getTime();

export function formatShortMdY(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}
