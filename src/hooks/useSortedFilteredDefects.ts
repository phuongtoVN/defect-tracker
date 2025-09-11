import { useMemo } from 'react';
import { useDefects } from '../state/DefectsContext';
import { matchesQuery } from '../utils/filter';
import type { SortKey } from '../utils/sort';
import { sortDefects, DEFAULT_SORT } from '../utils/sort';
import { slicePage } from '../utils/paginate';

export function useSortedFilteredDefects(q: string, sort: SortKey, page: number, pageSize = 10) {
  const { state } = useDefects();

  const filtered = useMemo(() => {
    const base = state.defects.filter(d => matchesQuery(d, q));
    return sortDefects(base, sort || DEFAULT_SORT);
  }, [state.defects, q, sort]);

  const total = filtered.length;
  const items = useMemo(() => slicePage(filtered, page, pageSize), [filtered, page, pageSize]);

  return { items, total, pageSize, isLoading: state.isLoading, loadError: state.loadError };
}
