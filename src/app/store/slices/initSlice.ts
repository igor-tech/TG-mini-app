import { BoundStore } from '@/app/store/store'
import { GenericStateCreator } from '@/app/store/types'
import { CategoryGroup, ChangeSettingsTrackedModel } from '@/common/types/category.type'
import { CategoryOptions } from '@/common/types/categoryOptions.type'
import { PromoCode } from '@/common/types/promoCode.type'
import { Region } from '@/common/types/region.type'
import { ResponseType } from '@/common/types/response.type'
import { ITelegramInitDataUser } from '@/common/types/telegramInitDataUser.type'
import { User } from '@/common/types/user.type'
import { produce } from 'immer'

type UpdatedTrackedModel = {
  categoryId: number
  purchasePrice: number
  regionId: number
}

type RequestServerUserData = Omit<User, 'chatId' | 'id'>

type sendUpdatedData = {
  promoCodes: number[]
  trackedModels: UpdatedTrackedModel[]
  user: RequestServerUserData
}

export interface IState {
  isInitialized: boolean
  authToken: string
  telegramUser: ITelegramInitDataUser
  user: User

  startData: string
  regions: Region[]
  categoriesGroup: CategoryGroup[]
  promoCodes: PromoCode[]
  categoryOptions: CategoryOptions[]
  isDataChanged: boolean

  setAuthToken: (token: string) => void
  setIsDataChanged: () => void
  setOrderStatus: (isFirstOrder: boolean) => void
  setRegion: (regionId: number) => void
  updateUsedPromoCodes: (promoCodeId: number, isUsed: boolean) => void
  changeSettingsTrackedModel: (data: ChangeSettingsTrackedModel) => void

  initializeApp: (initData: { initDataRaw: string }) => void
  initializeUser: (initDataRaw: string) => void
  getInitData: () => void

  authenticatedFetch: (url: string, options?: Record<any, any>, method?: string) => Promise<any>
  sendUpdatedData: () => Promise<void>
}

export const initSlice: GenericStateCreator<BoundStore> = (set, get) => ({
  ...get(),
  authToken: '',
  isInitialized: false,
  isDataChanged: false,
  startData: '',

  setAuthToken: (token: string) => set({ authToken: `tma ${token}` }),

  setIsDataChanged: () => {
    try {
      const categories = get().categoriesGroup
      const promoCodes = get().promoCodes
      const user = get().user

      const startData = get().startData
      const endData = JSON.stringify({ categories, promoCodes, user })
      const isDataChanged = !(startData.localeCompare(endData) == 0)

      console.log(isDataChanged)
      set(
        produce((state: BoundStore) => {
          state.isDataChanged = isDataChanged
        })
      )
    } catch (e) {
      console.log(e)
    }
  },

  initializeApp: async initData => {
    set(
      produce((state: BoundStore) => {
        state.isInitialized = false
      })
    )
    try {
      const { initDataRaw } = initData

      get().setAuthToken(initDataRaw)
      get().initializeUser(initDataRaw)
      get().getInitData()
    } catch (e) {
      console.log(e)
    } finally {
      set(
        produce((state: BoundStore) => {
          state.isInitialized = true
        })
      )
    }
  },

  authenticatedFetch: async (url, options) => {
    try {
      const headers = {
        Authorization: get().authToken,
        ...(options?.headers || {}),
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
        ...options,
        headers,
      }).then(res => res.json())

      return response as ResponseType
    } catch (e) {
      console.log(e)
    }
  },

  initializeUser: async initDataRaw => {
    try {
      const initTelegramData = new URLSearchParams(initDataRaw)

      if (!initTelegramData) {
        return
      }

      const telegramInitUser = JSON.parse(initTelegramData.get('user')!) as ITelegramInitDataUser

      set(
        produce((state: BoundStore) => {
          state.telegramUser = telegramInitUser
        })
      )
    } catch (e) {
      console.log(e)
    }
  },

  getInitData: async () => {
    try {
      const userId = get().telegramUser.id

      const regions = (await get().authenticatedFetch('/region')).data as Region[]

      const categories = (await get().authenticatedFetch(`/category/tracked-flag/${userId}`)).data

      const user = (await get().authenticatedFetch(`/user/${userId}`)).data as User

      const promoCodes = (await get().authenticatedFetch(`/promo/tracked-flag/${userId}`)).data

      const categoryOptions = (await get().authenticatedFetch(`/category-options`)).data

      const startData = JSON.stringify({ categories, promoCodes, user })

      set(
        produce((state: BoundStore) => {
          state.regions = regions
          state.user = user
          state.categoriesGroup = categories
          state.promoCodes = promoCodes
          state.categoryOptions = categoryOptions
          state.startData = startData
        })
      )
    } catch (e) {
      console.log(e)
    }
  },

  setRegion: async regionId => {
    try {
      set(
        produce((state: BoundStore) => {
          state.user.region = get().regions.filter(region => region.id === regionId)[0]
        })
      )
    } catch (e) {
      console.log(e)
    } finally {
      get().setIsDataChanged()
    }
  },

  setOrderStatus: async isFirstOrder => {
    try {
      set(
        produce((state: BoundStore) => {
          state.user.isFirstOrder = isFirstOrder
        })
      )
    } catch (e) {
      console.log(e)
    } finally {
      get().setIsDataChanged()
    }
  },

  changeSettingsTrackedModel(data) {
    try {
      const { categoryId, tracked, id, purchasePrice } = data
      const categories = get().categoriesGroup.map(category =>
        category.categoryId === categoryId
          ? {
              ...category,
              categories: category.categories.map(model =>
                model.id === id ? { ...model, tracked, purchasePrice } : model
              ),
            }
          : category
      )

      set(
        produce((state: BoundStore) => {
          state.categoriesGroup = categories
        })
      )
    } catch (e) {
      console.log(e)
    } finally {
      get().setIsDataChanged()
    }
  },

  sendUpdatedData: async (): Promise<void> => {
    try {
      const promoCodes = get()
        .promoCodes.filter(promo => promo.used)
        .map(promo => promo.id)

      const user = get().user

      const regionId = user.region.id

      const trackedModels = get()
        .categoriesGroup.flatMap(val => val.categories.filter(model => model.tracked))
        .map(model => ({
          categoryId: model.id,
          purchasePrice: model.purchasePrice,
          regionId,
        }))

      const data: sendUpdatedData = { promoCodes, trackedModels, user }

      await get().authenticatedFetch('/user/set-settings', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data),
      })
    } catch (e) {
      console.log(e)
    } finally {
      set(
        produce((state: BoundStore) => {
          state.isDataChanged = false
        })
      )
    }
  },

  updateUsedPromoCodes: (promoCodeId, isUsed) => {
    try {
      const promoCodes = get().promoCodes

      if (!promoCodes) {
        return
      }

      const updatedPromoCodes = get().promoCodes.map(promo =>
        promo.id === promoCodeId ? { ...promo, used: isUsed } : promo
      )

      set(
        produce((state: BoundStore) => {
          state.promoCodes = updatedPromoCodes
          state.isDataChanged = true
        })
      )
    } catch (e) {
      console.log(e)
    } finally {
      get().setIsDataChanged()
    }
  },
})
