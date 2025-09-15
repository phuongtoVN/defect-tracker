import React, { useRef } from 'react';
import SearchBar from '../../components/SearchBar';
import SortControls from '../../components/SortControls';
import DefectList from '../../components/DefectList';
import FabAddButton from '../../components/FabAddButton';
import { useQueryParams } from '../../hooks/useQueryParams';
import type { SortKey } from '../../utils/sort';
import { DEFAULT_SORT } from '../../utils/sort';
import { useSortedFilteredDefects } from '../../hooks/useSortedFilteredDefects';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';
import styles from './styles.module.css';

const ALL = 10000;

export default function DefectsListPage() {
  const { get, setMany } = useQueryParams({ q: '', sort: DEFAULT_SORT });
  const q = get('q');
  const sort = (get('sort') as SortKey) || DEFAULT_SORT;

  const { items, isLoading, loadError } = useSortedFilteredDefects(q, sort, 1, ALL);

  const scrollRef = useRef<HTMLDivElement>(null);
  // ready when not loading; (items.length > 0) works too
  useScrollRestoration(`defects:list:${q}:${sort}`, scrollRef, !isLoading);

  return (
  <div className={styles.page}>
    <div className={styles.controls}>
      <div className={styles.searchWrap}>
        <SearchBar value={q} onChange={(v) => setMany({ q: v })} />
      </div>

      <div className={styles.sortWrap}>
        <SortControls sort={sort} onChange={(v) => setMany({ sort: v })} />
      </div>
    </div>

    <div className={styles.scrollArea}>
      <DefectList items={items} />
    </div>

    <FabAddButton />
  </div>
);
}
