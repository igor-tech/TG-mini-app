import { TrackedModel } from '@/app/page/Category/TrackedModel/TrackedModel'
import { useStore } from '@/app/store/store'
import { BackButton } from '@/common/components/BackButton/BackButton'
import { SharedDivider } from '@/common/components/Divider/Divider'
import { LayoutContent } from '@/common/components/Layout/LayoutContent/LayoutContent'
import { Loader } from '@/common/components/Loader/Loader'
import { Accordion, Flex } from '@mantine/core'
import { useParams } from '@tanstack/react-router'

import styles from './CategoryPage.module.css'

export const CategoryPage = () => {
  const { categoriesGroup } = useStore()
  const { categoryid: categoryId } = useParams({ from: '/category/$categoryid' })

  if (!categoriesGroup.length) {
    return <Loader />
  }

  const items = categoriesGroup
    .filter(categoryGroup => categoryGroup.categoryId === +categoryId)
    .map(item => (
      <Accordion.Item key={item.subcategory} value={item.subcategory}>
        <Accordion.Control>{`${item.categoryName} ${item.subcategory}`}</Accordion.Control>

        {item.categories.map(models => (
          <Accordion.Panel key={models.id}>
            <TrackedModel item={models} />
          </Accordion.Panel>
        ))}
      </Accordion.Item>
    ))

  const urlBanner = categoriesGroup?.[0]?.bannerUrl

  return (
    <LayoutContent imageURL={urlBanner}>
      <BackButton />

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
