import { FC, useState } from 'react'

import { useStore } from '@/app/store/store'
import { Category } from '@/common/types/category.type'
import { ActionIcon, Card, Divider, Flex, Group, NumberFormatter, Text } from '@mantine/core'
import { HapticFeedback, postEvent } from '@tma.js/sdk'
import { CgMathMinus } from 'react-icons/cg'
import { GoPlus } from 'react-icons/go'
import { MdDeleteOutline } from 'react-icons/md'

import styles from './CartTrackedModel.module.css'

type Props = {
  item: Category
}

export const CartTrackedModel: FC<Props> = ({ item }) => {
  const { changeSettingsTrackedModel } = useStore()
  const haptic = new HapticFeedback('7.0', postEvent)
  const [price, setPrice] = useState<number>(item.purchasePrice)
  const [checked, setChecked] = useState(item.tracked)

  const countGB = item.memory ? `${item.memory}Gb` : ''
  const label = `${item.categoryName} ${item.subcategory} ${countGB}`

  const changeTrackedValueHandler = () => {
    haptic.impactOccurred('heavy')
    changeSettingsTrackedModel({
      tracked: false,
      id: item.id,
      categoryId: item.categoryId,
      purchasePrice: price,
    })
    setChecked(false)
  }

  const changePurchasePriceHandler = (price: number) => {
    changeSettingsTrackedModel({
      tracked: checked,
      id: item.id,
      categoryId: item.categoryId,
      purchasePrice: price,
    })
    setPrice(price)
  }

  return (
    <Card
      padding={'lg'}
      radius={'md'}
      shadow={'sm'}
      styles={{
        root: {
          backgroundColor: 'var(--tg-theme-background-color)',
          borderColor: 'var(--tg-theme-background-color)',
          color: 'var(--tg-theme-text-color)',
        },
      }}
      withBorder
    >
      <Group className={styles.title} justify={'space-between'} mb={'xs'} mt={'md'}>
        <ActionIcon
          aria-label={'delete'}
          color={'red'}
          onClick={changeTrackedValueHandler}
          pos={'absolute'}
          right={0}
          size={'lg'}
          variant={'light'}
        >
          <MdDeleteOutline size={20} />
        </ActionIcon>
        <Text fw={500}>{label}</Text>
      </Group>
      <Divider
        label={'Изменить цену отслеживания'}
        labelPosition={'center'}
        size={'xs'}
        styles={{
          label: { fontSize: '12px' },
          root: { borderColor: 'var(--tg-theme-hint-color)' },
        }}
      />
      <Flex align={'center'} gap={40} justify={'center'} mt={10}>
        <ActionIcon
          aria-label={'Settings'}
          onClick={() => changePurchasePriceHandler(price - 500)}
          size={25}
          variant={'light'}
        >
          <CgMathMinus />
        </ActionIcon>
        <NumberFormatter className={styles.label} suffix={' ₽'} thousandSeparator value={price} />

        <ActionIcon
          aria-label={'Settings'}
          onClick={() => changePurchasePriceHandler(price + 500)}
          size={25}
          variant={'light'}
        >
          <GoPlus />
        </ActionIcon>
      </Flex>
    </Card>
  )
}
