import { PromoOptions } from '@/common/types/promoOptions.type'

export type PromoCode = {
  color: string
  id: number
  isFirstOrder: boolean
  name: string
  options: PromoOptions[]
  used: boolean
  validUntil: string
}
