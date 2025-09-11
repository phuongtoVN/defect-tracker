export const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';

export const compareDateDesc = (a: string, b: string) =>
  new Date(b).getTime() - new Date(a).getTime();

export const compareDateAsc = (a: string, b: string) =>
  new Date(a).getTime() - new Date(b).getTime();
