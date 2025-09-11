import React from 'react';
import SearchBar from '../../components/SearchBar';
import SortControls from '../../components/SortControls';
import DefectList from '../../components/DefectList';
import Pagination from '../../components/Pagination';
import FabAddButton from '../../components/FabAddButton';
import { useQueryParams } from '../../hooks/useQueryParams';
import type { SortKey } from '../../utils/sort';
import { DEFAULT_SORT } from '../../utils/sort';
import { useSortedFilteredDefects } from '../../hooks/useSortedFilteredDefects';
import styles from './styles.module.css';

const PAGE_SIZE = 10;

export default function DefectsListPage() {
  const { get, setMany } = useQueryParams({ q: '', sort: DEFAULT_SORT, page: 1 });
  const q = get('q');
  const sort = (get('sort') as SortKey) || DEFAULT_SORT;
  const page = Math.max(1, parseInt(get('page') || '1', 10));

  const { items, total, isLoading, loadError } = useSortedFilteredDefects(
    q,
    sort,
    page,
    PAGE_SIZE
  );
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <SearchBar value={q} onChange={(v) => setMany({ q: v, page: 1 })} />
        <SortControls sort={sort} onChange={(v) => setMany({ sort: v, page: 1 })} />
      </div>

      {isLoading && <p style={{ padding: '0.75rem 1rem' }}>Loading defects…</p>}
      {loadError && (
        <p style={{ color: 'crimson', padding: '0.75rem 1rem' }}>
          Failed to load: {loadError}
        </p>
      )}

      <div className={styles.list}>
        <DefectList items={items} />
      </div>

      <Pagination page={page} pageCount={pageCount} onChange={(p) => setMany({ page: p })} />

      {/* FAB uses the global .fab style from globals.css.
          If you want to use this page's module .fab instead,
          add a className prop to FabAddButton and pass styles.fab. */}
      <FabAddButton />
    </div>
  );
}
