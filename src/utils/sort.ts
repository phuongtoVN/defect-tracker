import type { Defect } from '../types/defect';
import { compareDateAsc, compareDateDesc } from './dates';

export type SortKey = 'titleAsc' | 'titleDesc' | 'dateAsc' | 'dateDesc';
export const DEFAULT_SORT: SortKey = 'dateDesc';

export const sortDefects = (list: Defect[], sort: SortKey) => {
  const copy = [...list];
  switch (sort) {
    case 'titleAsc':  return copy.sort((a,b)=>a.title.localeCompare(b.title));
    case 'titleDesc': return copy.sort((a,b)=>b.title.localeCompare(a.title));
    case 'dateAsc':   return copy.sort((a,b)=>compareDateAsc(a.createdAt, b.createdAt));
    case 'dateDesc':  return copy.sort((a,b)=>compareDateDesc(a.createdAt, b.createdAt));
  }
};
