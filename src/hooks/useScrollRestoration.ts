import { useEffect, useLayoutEffect } from 'react';

type AnyElemRef =
  | React.RefObject<HTMLElement | null>
  | React.MutableRefObject<HTMLElement | null>;

function raf2(cb: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(cb));
}

/**
 * Persist and restore scrollTop for a scroll container.
 * Pass `ready=true` only when the list is rendered (not loading).
 */
export function useScrollRestoration(key: string, ref: AnyElemRef, ready = true) {
  // Restore AFTER layout and only when ready
  useLayoutEffect(() => {
    if (!ready || !ref.current) return;
    const saved = Number(sessionStorage.getItem(key) || '0');
    raf2(() => {
      if (ref.current) ref.current.scrollTop = saved;
    });
  }, [key, ready]);

  // Persist on every scroll (so we don't rely on unmount timing)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => sessionStorage.setItem(key, String(el.scrollTop));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [key, ref]);

  // Safety: also save on unmount
  useEffect(() => {
    return () => {
      const el = ref.current;
      if (el) sessionStorage.setItem(key, String(el.scrollTop));
    };
  }, [key, ref]);
}
