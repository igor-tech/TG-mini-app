import { FC, useState } from 'react'

import { useStore } from '@/app/store/store'
import { Category } from '@/common/types/category.type'
import { ActionIcon, Checkbox, Flex, NumberFormatter } from '@mantine/core'
import { CgMathMinus } from 'react-icons/cg'
import { GoPlus } from 'react-icons/go'

import styles from '@/app/page/Category/CategoryPage.module.css'

type Props = {
  item: Category
}
export const TrackedModel: FC<Props> = ({ item }) => {
  const { changeSettingsTrackedModel } = useStore()
  const { purchasePrice, tracked, subcategory, memory } = item
  const [price, setPrice] = useState<number>(purchasePrice)
  const [checked, setChecked] = useState(tracked)

  const baseData = {
    tracked: checked,
    id: item.id,
    categoryId: item.categoryId,
    purchasePrice: price,
  }

  const changeTrackedValueHandler = () => {
    changeSettingsTrackedModel({ ...baseData, tracked: !checked })
    setChecked(!checked)
  }

  const changePurchasePriceHandler = (price: number) => {
    changeSettingsTrackedModel({ ...baseData, purchasePrice: price })
    setPrice(price)
  }

  const countGB = memory ? `${memory}Gb` : ''

  const label = `${subcategory} ${countGB}`

  return (
    <>
      <Flex align={'center'} justify={'space-between'} mt={30} w={'100%'}>
        <Checkbox
          checked={checked}
          classNames={{ icon: styles.checkboxIcon, input: styles.checkbox, label: styles.label }}
          label={label}
          onClick={changeTrackedValueHandler}
          size={'md'}
        />

        <Flex align={'center'} gap={15} justify={'space-between'} style={{ whiteSpace: 'nowrap' }}>
          <ActionIcon
            aria-label={'Settings'}
            onClick={() => changePurchasePriceHandler(price - 500)}
            size={20}
            variant={'light'}
          >
            <CgMathMinus />
          </ActionIcon>
          <NumberFormatter className={styles.label} suffix={' ₽'} thousandSeparator value={price} />

          <ActionIcon
            aria-label={'Settings'}
            onClick={() => changePurchasePriceHandler(price + 500)}
            size={20}
            variant={'light'}
          >
            <GoPlus />
          </ActionIcon>
        </Flex>
      </Flex>
    </>
  )
}
