import type { Defect } from '../types/defect';
import { compareDateAsc, compareDateDesc } from './dates';

export type SortKey =
  | 'titleAsc'
  | 'titleDesc'
  | 'dateAsc'
  | 'dateDesc'
  | 'priority'     // High → Low  (rank 1 first)
  | 'priorityLow'; // Low  → High (largest last)

export const DEFAULT_SORT: SortKey = 'dateDesc';

// helper: undefined priority goes to the bottom
const pr = (d: Defect) =>
  typeof d.priorityRank === 'number' ? d.priorityRank : Number.POSITIVE_INFINITY;

// tie-breakers fall back to newest first for a stable feel
export const sortDefects = (list: Defect[], sort: SortKey) => {
  const copy = [...list];
  switch (sort) {
    case 'titleAsc':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case 'titleDesc':
      return copy.sort((a, b) => b.title.localeCompare(a.title));
    case 'dateAsc':
      return copy.sort((a, b) => compareDateAsc(a.createdAt, b.createdAt));
    case 'dateDesc':
      return copy.sort((a, b) => compareDateDesc(a.createdAt, b.createdAt));
    case 'priority': // High → Low (1,2,3…)
      return copy.sort((a, b) => pr(a) - pr(b) || compareDateDesc(a.createdAt, b.createdAt));
    case 'priorityLow': // Low → High (…,3,2,1)
      return copy.sort((a, b) => pr(b) - pr(a) || compareDateDesc(a.createdAt, b.createdAt));
  }
};
