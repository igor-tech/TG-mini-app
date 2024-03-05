export type Category = {
  categoryId: number
  categoryName: string
  id: number
  memory: number
  purchasePrice: number
  subcategory: string
  tracked: boolean
}

export type CategoryGroup = {
  bannerUrl: string
  categories: Category[]
  categoryId: number
  categoryName: string
  subcategory: string
}

export type ChangeSettingsTrackedModel = {
  categoryId: number
  id: number
  purchasePrice: number
  tracked: boolean
}
