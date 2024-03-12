import { TrackedModel } from '@/app/page/Category/TrackedModel/TrackedModel'
import { useStore } from '@/app/store/store'
import { BackButtonShared } from '@/common/components/BackButton/BackButtonShared'
import { SharedDivider } from '@/common/components/Divider/Divider'
import { LayoutContent } from '@/common/components/Layout/LayoutContent/LayoutContent'
import { Loader } from '@/common/components/Loader/Loader'
import { PriceChangeStep } from '@/common/components/PriceChangeStep/PriceChangeStep'
import { Accordion, Flex } from '@mantine/core'
import { useParams } from '@tanstack/react-router'
import { HapticFeedback, postEvent } from '@tma.js/sdk'

import styles from './CategoryPage.module.css'

export const CategoryPage = () => {
  const { categoriesGroup } = useStore()
  const { categoryid: categoryId } = useParams({ from: '/category/$categoryid' })
  const haptic = new HapticFeedback('7.0', postEvent)

  if (!categoriesGroup.length) {
    return <Loader />
  }

  const items = categoriesGroup
    .filter(categoryGroup => categoryGroup.categoryId === +categoryId)
    .map(item => (
      <Accordion.Item
        key={item.subcategory}
        onClick={() => haptic.impactOccurred('soft')}
        value={item.subcategory}
      >
        <Accordion.Control>{`${item.categoryName} ${item.subcategory}`}</Accordion.Control>

        {item.categories.map(models => (
          <Accordion.Panel key={models.id}>
            <TrackedModel item={models} />
          </Accordion.Panel>
        ))}
      </Accordion.Item>
    ))

  const urlBanner = categoriesGroup?.filter(
    categoryGroup => categoryGroup.categoryId === +categoryId
  )?.[0]?.bannerUrl

  return (
    <LayoutContent imageURL={urlBanner}>
      <BackButtonShared />

      <PriceChangeStep />

      <SharedDivider label={'Модели'} />

      <Accordion
        classNames={styles}
        styles={{
          item: { borderBottom: 'none' },
        }}
      >
        <Flex direction={'column'} gap={20}>
          {items}
        </Flex>
      </Accordion>
    </LayoutContent>
  )
}
