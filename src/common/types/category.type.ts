export type Category = {
  categoryId: number
  categoryName: string
  id: number
  memory: number
  pickUpInStore: boolean
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
  pickUpInStore: boolean
  purchasePrice: number
  tracked: boolean
}
