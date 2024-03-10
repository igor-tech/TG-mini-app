import { CategoryItem } from '@/app/page/Category/Category/CategoryItem'
import { useStore } from '@/app/store/store'
import { Loader } from '@/common/components/Loader/Loader'
import { Card, SimpleGrid } from '@mantine/core'

export const Categories = () => {
  const { categoryOptions } = useStore()

  if (!categoryOptions) {
    return <Loader />
  }

  const items = [...categoryOptions]
    .sort((a, b) => a.order - b.order)
    .map((item, i) => <CategoryItem {...item} key={i} />)

  return (
    <>
      <Card
        radius={'md'}
        styles={{
          root: {
            backgroundColor: 'var(--tg-theme-background-color)',
            borderColor: 'var(--tg-theme-background-color)',
            color: 'var(--tg-theme-text-color)',
          },
        }}
        withBorder
      >
        <SimpleGrid cols={3} mt={'md'}>
          {items}
        </SimpleGrid>
      </Card>
    </>
  )
}
