import { createContext, useContext, useEffect, useReducer, type Dispatch, type PropsWithChildren } from 'react'
import type { Defect } from '../types/defect'
import { defectsReducer, initialState } from './defectsReducer'
import type { Action } from './defectsReducer'

type Ctx = {
  state: { defects: Defect[]; isLoading: boolean; loadError?: string }
  dispatch: Dispatch<Action>
  getById: (id: string) => Defect | undefined
}

const DefectsContext = createContext<Ctx | null>(null)

const asset = (p: string) => new URL(p, import.meta.env.BASE_URL).toString()

export const DefectsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(defectsReducer, initialState)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(asset('defect.json'))
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as Defect[]
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        if (!cancelled) dispatch({ type: 'LOAD_SUCCESS', payload: data })
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        if (!cancelled) dispatch({ type: 'LOAD_ERROR', error: msg })
      }
    })()
    return () => { cancelled = true }
  }, [])

  const getById = (id: string) => state.defects.find(d => String(d.id) === String(id))

  return (
    <DefectsContext.Provider value={{ state, dispatch, getById }}>
      {children}
    </DefectsContext.Provider>
  )
}

export const useDefects = () => {
  const ctx = useContext(DefectsContext)
  if (!ctx) throw new Error('useDefects must be used inside DefectsProvider')
  return ctx
}
