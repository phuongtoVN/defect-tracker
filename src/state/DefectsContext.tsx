import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { Defect } from '../types/defect';
import { defectsReducer, initialState } from './defectsReducer';
import type { Action } from './defectsReducer';

type Ctx = {
  state: { defects: Defect[]; isLoading: boolean; loadError?: string };
  dispatch: React.Dispatch<Action>;
  getById: (id: string) => Defect | undefined;
};

const DefectsContext = createContext<Ctx | null>(null);

export const DefectsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(defectsReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/data/defects.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Defect[];
        // default sort by date desc so most recent first
        data.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        dispatch({ type: 'LOAD_SUCCESS', payload: data });
      } catch (e) {
        const err = e as Error;
        dispatch({ type: 'LOAD_ERROR', error: err.message ?? 'load failed' });
      }
    })();
  }, []);

  const getById = (id: string) => state.defects.find(d => String(d.id) === String(id));

  return (
    <DefectsContext.Provider value={{ state, dispatch, getById }}>
      {children}
    </DefectsContext.Provider>
  );
};

export const useDefects = () => {
  const ctx = useContext(DefectsContext);
  if (!ctx) throw new Error('useDefects must be used inside DefectsProvider');
  return ctx;
};
