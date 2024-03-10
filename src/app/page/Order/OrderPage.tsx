import { TrackedModel } from '@/app/page/Category/TrackedModel/TrackedModel'
import { useStore } from '@/app/store/store'
import { BackButton } from '@/common/components/BackButton/BackButton'
import { SharedDivider } from '@/common/components/Divider/Divider'
import { LayoutContent } from '@/common/components/Layout/LayoutContent/LayoutContent'
import { PriceChangeStep } from '@/common/components/PriceChangeStep/PriceChangeStep'
import { URL_BANNERS_PAGE } from '@/common/config'
import { Category } from '@/common/types/category.type'
import { Flex, Text } from '@mantine/core'

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

        <PriceChangeStep />

        <SharedDivider label={'Отслеживаемые товары'} />

        <Flex direction={'column'} gap={15}>
          {trackedModels.map(model => {
            return <TrackedModel item={model} key={model.id} />
          })}

          {!trackedModels.length && (
            <Text fz={16} mt={'30%'} opacity={0.6} style={{ textAlign: 'center' }}>
              Список отслеживаемыех товаров пуст.
            </Text>
          )}
        </Flex>
      </LayoutContent>
    </>
  )
}
