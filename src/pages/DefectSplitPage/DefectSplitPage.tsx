import { useEffect, useRef, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import SortControls from '../../components/SortControls';
import DefectList from '../../components/DefectList';
import FabAddButton from '../../components/FabAddButton';
import DetailPanel from '../../components/DetailPanel';
import { useQueryParams } from '../../hooks/useQueryParams';
import { DEFAULT_SORT } from '../../utils/sort';
import type { SortKey } from '../../utils/sort';
import { useSortedFilteredDefects } from '../../hooks/useSortedFilteredDefects';
import styles from './styles.module.css';

const CHUNK = 20;           // how many more items to reveal each time you hit bottom
const ALL   = 10000;        // page size big enough to retrieve all filtered items

export default function DefectSplitPage() {
  // we no longer keep "page" in the URL – only q + sort
  const { get, setMany } = useQueryParams({ q: '', sort: DEFAULT_SORT });
  const q = get('q');
  const sort = (get('sort') as SortKey) || DEFAULT_SORT;

  // get ALL items matching q+sort; we'll reveal them gradually as the user scrolls
  const { items } = useSortedFilteredDefects(q, sort, 1, ALL);

  const [visibleCount, setVisibleCount] = useState(CHUNK);
  const leftRef = useRef<HTMLDivElement | null>(null);

  // when the query/sort changes, reset the visible window
  useEffect(() => {
    setVisibleCount(CHUNK);
    // also scroll back to top of the left pane
    leftRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [q, sort]);

  // load more when near the bottom of the left pane
  useEffect(() => {
    const el = leftRef.current;
    if (!el) return;

    const onScroll = () => {
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      if (nearBottom) setVisibleCount((c) => Math.min(c + CHUNK, items.length));
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [items.length]);

  return (
    <div className={styles.page}>
      {/* Make sure .leftPane in styles.module.css has overflow-y:auto */}
      <div className={styles.leftPane} ref={leftRef}>
        <div className={styles.controls}>
          <div className={styles.searchWrap}>
            <SearchBar value={q} onChange={(v) => setMany({ q: v })} />
          </div>

          <div className={styles.filterWrap}>
            <SortControls sort={sort} onChange={(v) => setMany({ sort: v })} />
          </div>
        </div>


        <div className={styles.list}>
          <DefectList items={items.slice(0, visibleCount)} />
        </div>
      </div>

      <div className={styles.rightPane}>
        <div className={styles.detail}>
          <DetailPanel />
        </div>
      </div>

      <FabAddButton />
    </div>
  );
}
