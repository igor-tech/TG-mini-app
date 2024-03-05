import { IState, initSlice } from '@/app/store/slices/initSlice'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface BoundStore extends IState {}

export const useStore = create(
  persist(
    devtools(
      immer<BoundStore>((...a) => ({
        ...initSlice(...a),
      }))
    ),
    {
      name: 'mini-app-bot-state',
    }
  )
)
