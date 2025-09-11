import type { Defect } from '../types/defect';

export type Action =
  | { type: 'LOAD_SUCCESS'; payload: Defect[] }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'ADD_DEFECT'; payload: Defect };

export interface State {
  defects: Defect[];
  isLoading: boolean;
  loadError?: string;
}

export const initialState: State = { defects: [], isLoading: true };

export function defectsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return { defects: action.payload, isLoading: false };
    case 'LOAD_ERROR':
      return { defects: [], isLoading: false, loadError: action.error };
    case 'ADD_DEFECT':
      return { ...state, defects: [action.payload, ...state.defects] };
    default:
      return state;
  }
}
