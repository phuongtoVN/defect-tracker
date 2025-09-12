import React from 'react';
import SearchBar from '../../components/SearchBar';
import SortControls from '../../components/SortControls';
import DefectList from '../../components/DefectList';
import FabAddButton from '../../components/FabAddButton';
import { useQueryParams } from '../../hooks/useQueryParams';
import type { SortKey } from '../../utils/sort';
import { DEFAULT_SORT } from '../../utils/sort';
import { useSortedFilteredDefects } from '../../hooks/useSortedFilteredDefects';
import styles from './styles.module.css';

const ALL = 10000; // large enough page size to fetch everything

export default function DefectsListPage() {
  // no "page" param anymore
  const { get, setMany } = useQueryParams({ q: '', sort: DEFAULT_SORT });
  const q = get('q');
  const sort = (get('sort') as SortKey) || DEFAULT_SORT;

  // grab ALL items matching q + sort
  const { items, isLoading, loadError } = useSortedFilteredDefects(q, sort, 1, ALL);

  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <SearchBar value={q} onChange={(v) => setMany({ q: v })} />
        <SortControls sort={sort} onChange={(v) => setMany({ sort: v })} />
      </div>

      <div className={styles.scrollArea}>
        {isLoading && <p className={styles.info}>Loading defects…</p>}
        {loadError && <p className={styles.error}>Failed to load: {loadError}</p>}
        <DefectList items={items} />
      </div>

      <FabAddButton />
    </div>
  );
}
