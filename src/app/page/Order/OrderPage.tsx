import { CartTrackedModel } from '@/app/page/Order/CartTrackedModel/CartTrackedModel'
import { useStore } from '@/app/store/store'
import { BackButton } from '@/common/components/BackButton/BackButton'
import { SharedDivider } from '@/common/components/Divider/Divider'
import { LayoutContent } from '@/common/components/Layout/LayoutContent/LayoutContent'
import { URL_BANNERS_PAGE } from '@/common/config'
import { Category } from '@/common/types/category.type'
import { Flex } from '@mantine/core'

export const OrderPage = () => {
  const { categoriesGroup } = useStore()

  const trackedModels = categoriesGroup.reduce((acc: Category[], val) => {
    val.categories.forEach(model => {
      if (model.tracked) {
        acc.push(model)
      }
    })

    return acc
  }, [])

  return (
    <>
      <LayoutContent imageURL={URL_BANNERS_PAGE.ORDER}>
        <BackButton />

        <SharedDivider label={'Отслеживаемые товары'} />

        <Flex direction={'column'} gap={15}>
          {trackedModels.map(model => {
            return <CartTrackedModel item={model} key={model.id} />
          })}
        </Flex>
      </LayoutContent>
    </>
  )
}
