import { useSearchParams } from 'react-router-dom';

export function useQueryParams<T extends Record<string, string | number | undefined>>(defaults: T) {
  const [sp, setSp] = useSearchParams();

  const get = <K extends keyof T>(k: K): string => sp.get(String(k)) ?? String(defaults[k] ?? '');

  const setMany = (next: Partial<T>) => {
    const copy = new URLSearchParams(sp.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') copy.delete(k);
      else copy.set(k, String(v));
    });
    setSp(copy, { replace: true });
  };

  return { get, setMany, raw: sp };
}
