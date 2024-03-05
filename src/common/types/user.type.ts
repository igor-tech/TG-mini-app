import { PromoCode } from '@/common/types/promoCode.type'
import { Region } from '@/common/types/region.type'
import { TrackedModel } from '@/common/types/trackedModel.type'

export type User = {
  chatId: number
  id: number
  isFirstOrder: boolean
  isPaidUser: boolean
  lastActivity: number
  name: string
  region: Region
  role: string
  trackedPhoneModels: TrackedModel[]
  usedPromoCodes: PromoCode[]
  username: string
}
