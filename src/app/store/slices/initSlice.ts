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

// Перед отправкой должны убрать те что не tracked
type sendUpdatedData = {
  promoCodes: number[]
  trackedModels: UpdatedTrackedModel[]
  user: RequestServerUserData
}

export interface IState {
  isInitialized: boolean
  authToken: string
  telegramUser: ITelegramInitDataUser

  currentRegionId: number // Отправим на сервер
  isFirstOrder: boolean // Отправим на сервер

  regions: Region[]
  categoriesGroup: CategoryGroup[] // Отправим на сервер
  promoCodes: PromoCode[] // Отправим на сервер
  categoryOptions: CategoryOptions[]
  categoryModels: CategoryGroup[]
  currentCategoryId: number
  isDataChanged: boolean

  user: User

  setAuthToken: (token: string) => void
  initializeApp: (initData: { initDataRaw: string }) => void
  authenticatedFetch: (url: string, options?: Record<any, any>, method?: string) => Promise<any>
  initializeUser: (initDataRaw: string) => void
  getInitData: () => void
  setRegion: (regionId: number) => void
  setOrderStatus: (isFirstOrder: boolean) => void
  setCurrentCategoryId: (categoryId: number) => void
  changeSettingsTrackedModel: (data: ChangeSettingsTrackedModel) => void
  sendUpdatedData: () => Promise<void>
  setIsDataChanged: (value: boolean) => void
  updateUsedPromoCodes: (promoCodeId: number, isUsed: boolean) => void
}

export const initSlice: GenericStateCreator<BoundStore> = (set, get) => ({
  ...get(),
  authToken: '',
  currentRegionId: 0,
  isFirstOrder: true,
  isInitialized: false,
  isDataChanged: false,

  setAuthToken: (token: string) => set({ authToken: `tma ${token}` }),

  setIsDataChanged: value => {
    try {
      console.log('setIsDataChanged', value)
      set(
        produce((state: BoundStore) => {
          state.isDataChanged = value
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

      throw e
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

      const regions = (await get().authenticatedFetch('/region')).data

      const categories = (await get().authenticatedFetch(`/category/tracked-flag/${userId}`)).data

      const user = (await get().authenticatedFetch(`/user/${userId}`)).data as User

      const promoCodes = (await get().authenticatedFetch(`/promo/tracked-flag/${userId}`)).data

      const categoryOptions = (await get().authenticatedFetch(`/category-options`)).data

      set(
        produce((state: BoundStore) => {
          state.regions = regions
          state.user = user
          state.categoriesGroup = categories
          state.promoCodes = promoCodes
          state.categoryOptions = categoryOptions
        })
      )
    } catch (e) {
      console.log(e)
    }
  },

  setRegion: async regionId => {
    try {
      get().setIsDataChanged(true)
      set(
        produce((state: BoundStore) => {
          state.user.region = get().regions.filter(region => region.id === regionId)[0]
        })
      )
    } catch (e) {
      console.log(e)
    }
  },

  setOrderStatus: async isFirstOrder => {
    try {
      get().setIsDataChanged(true)
      set(
        produce((state: BoundStore) => {
          state.user.isFirstOrder = isFirstOrder
        })
      )
    } catch (e) {
      console.log(e)
    }
  },

  setCurrentCategoryId(categoryId) {
    try {
      set(
        produce((state: BoundStore) => {
          state.currentCategoryId = categoryId
        })
      )

      const categoryModels = get().categoriesGroup.filter(
        category => category.categoryId === categoryId
      )

      if (categoryModels) {
        set(
          produce((state: BoundStore) => {
            state.categoryModels = categoryModels
          })
        )
      }
    } catch (e) {
      console.log(e)
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
          state.isDataChanged = true
        })
      )
    } catch (e) {
      console.log(e)
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
    }
  },
})
