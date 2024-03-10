import { FC, useState } from 'react'

import { useStore } from '@/app/store/store'
import { Category } from '@/common/types/category.type'
import { ActionIcon, Badge, Card, Divider, Flex, NumberFormatter, Text } from '@mantine/core'
import { HapticFeedback, postEvent } from '@tma.js/sdk'
import { CgMathMinus } from 'react-icons/cg'
import { FaHeart, FaPeopleCarry } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'

import styles from './TrackedModel.module.css'

type Props = {
  item: Category
}
export const TrackedModel: FC<Props> = ({ item }) => {
  const { changeSettingsTrackedModel, priceStep } = useStore()
  const { purchasePrice, tracked, subcategory, memory, categoryName, pickUpInStore } = item
  const [price, setPrice] = useState<number>(purchasePrice)
  const [isTracked, setIsTracked] = useState(tracked)
  const [isPickup, setIsPickup] = useState(pickUpInStore)
  const haptic = new HapticFeedback('7.0', postEvent)

  const baseData = {
    tracked: isTracked,
    id: item.id,
    categoryId: item.categoryId,
    purchasePrice: price,
    pickUpInStore: isPickup,
  }

  const changePickUpValueHandler = () => {
    haptic.impactOccurred('light')
    changeSettingsTrackedModel({ ...baseData, pickUpInStore: !isPickup })
    setIsPickup(!isPickup)
  }

  const changeTrackedValueHandler = () => {
    haptic.impactOccurred('light')
    changeSettingsTrackedModel({ ...baseData, tracked: !isTracked })
    setIsTracked(!isTracked)
  }

  const changePurchasePriceHandler = (price: number) => {
    haptic.impactOccurred('light')
    changeSettingsTrackedModel({ ...baseData, purchasePrice: price })
    setPrice(price)
  }

  const additionalOptions = memory ? `${memory}Gb` : ''

  const label = `${categoryName} ${subcategory}`

  return (
    <>
      <Card
        className={styles.card}
        radius={'md'}
        shadow={'sm'}
        styles={{
          root: {
            backgroundColor: 'var(--tg-theme-background-color)',
            borderColor: 'var(--tg-theme-secondary-background-color)',
            color: 'var(--tg-theme-text-color)',
            boxShadow: 'var(--mantine-shadow-xl)',
          },
        }}
        withBorder
      >
        <Card.Section className={styles.section}>
          <Flex align={'center'} gap={15}>
            <Text className={styles.label}>{label}</Text>
            {additionalOptions && (
              <Badge className={styles.badge} color={'blue'} variant={'gradient'}>
                {additionalOptions}
              </Badge>
            )}
          </Flex>
        </Card.Section>
        <Divider
          label={'Изменить параметры отслеживания'}
          labelPosition={'center'}
          size={'xs'}
          styles={{
            label: { fontSize: '12px' },
            root: { borderColor: 'var(--tg-theme-hint-color)' },
          }}
        />
        <Flex justify={'space-between'} mt={'xs'}>
          <Flex
            align={'center'}
            gap={15}
            justify={'space-between'}
            style={{ whiteSpace: 'nowrap' }}
            w={'70%'}
          >
            <ActionIcon
              aria-label={'Settings'}
              onClick={() => changePurchasePriceHandler(price - priceStep)}
              size={20}
              variant={'light'}
            >
              <CgMathMinus />
            </ActionIcon>
            <NumberFormatter
              className={styles.priceLabel}
              suffix={' ₽'}
              thousandSeparator
              value={price}
            />

            <ActionIcon
              aria-label={'Settings'}
              onClick={() => changePurchasePriceHandler(price + priceStep)}
              size={20}
              variant={'light'}
            >
              <GoPlus />
            </ActionIcon>
          </Flex>

          <ActionIcon.Group borderWidth={2}>
            <ActionIcon
              aria-label={'pick up in store'}
              bg={isPickup ? '#3fbe56' : ''}
              onClick={changePickUpValueHandler}
              size={'md'}
              variant={'filled'}
            >
              <FaPeopleCarry size={20} />
            </ActionIcon>
            <ActionIcon
              aria-label={'Likes'}
              bg={isTracked ? '#3fbe56' : ''}
              onClick={changeTrackedValueHandler}
              size={'md'}
              variant={'filled'}
            >
              <FaHeart size={20} />
            </ActionIcon>
          </ActionIcon.Group>
        </Flex>
      </Card>
    </>
  )
}
