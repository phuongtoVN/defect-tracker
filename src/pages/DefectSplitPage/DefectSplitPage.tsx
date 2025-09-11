import React from 'react';
import SearchBar from '../../components/SearchBar';
import SortControls from '../../components/SortControls';
import DefectList from '../../components/DefectList';
import Pagination from '../../components/Pagination';
import FabAddButton from '../../components/FabAddButton';
import DetailPanel from '../../components/DetailPanel';
import { useQueryParams } from '../../hooks/useQueryParams';
import { DEFAULT_SORT } from '../../utils/sort';
import type { SortKey } from '../../utils/sort';
import { useSortedFilteredDefects } from '../../hooks/useSortedFilteredDefects';
import styles from './styles.module.css';

const PAGE_SIZE = 10;

export default function DefectSplitPage() {
  const { get, setMany } = useQueryParams({ q: '', sort: DEFAULT_SORT, page: 1 });
  const q = get('q');
  const sort = (get('sort') as SortKey) || DEFAULT_SORT;
  const page = Math.max(1, parseInt(get('page') || '1', 10));

  const { items, total } = useSortedFilteredDefects(q, sort, page, PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className={styles.page}>
      <div className={styles.leftPane}>
        <div className={styles.controls}>
          <SearchBar value={q} onChange={(v) => setMany({ q: v, page: 1 })} />
          <SortControls sort={sort} onChange={(v) => setMany({ sort: v, page: 1 })} />
        </div>

        <div className={styles.list}>
          <DefectList items={items} />
        </div>

        <Pagination
          page={page}
          pageCount={pageCount}
          onChange={(p) => setMany({ page: p })}
        />
      </div>

      <div className={styles.rightPane}>
        <div className={styles.detail}>
          <DetailPanel />
        </div>
      </div>

      {/* FabAddButton still uses the global .fab class from globals.css */}
      <FabAddButton />
    </div>
  );
}
