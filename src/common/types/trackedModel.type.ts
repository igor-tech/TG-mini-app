import { Category } from '@/common/types/category.type'
import { Region } from '@/common/types/region.type'
import { User } from '@/common/types/user.type'

export type TrackedModel = {
  category: Category
  categoryId: number
  id: number
  purchasePrice: number
  region: Region
  regionId: number
  user: User
  userId: number
}
