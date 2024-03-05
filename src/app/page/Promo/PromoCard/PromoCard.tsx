import { FC, useState } from 'react'

import { useStore } from '@/app/store/store'
import { PromoOptions } from '@/common/types/promoOptions.type'
import { Badge, Button, Card, Flex, Group, List, Text } from '@mantine/core'
import { FaCheck } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'

import styles from './PromoCard.module.css'

type Props = {
  color: string
  id: number
  isFirstOrder: boolean
  isUsed: boolean
  promoName: string
  promoOptions: PromoOptions[]
  validUntil: string
}

export const PromoCard: FC<Props> = ({
  promoOptions,
  promoName,
  isFirstOrder,
  isUsed,
  color,
  validUntil,
  id,
}) => {
  const [used, setUsed] = useState(isUsed)
  const { updateUsedPromoCodes } = useStore()

  const onClickUsedButtonHandler = () => {
    updateUsedPromoCodes(id, !used)
    setUsed(!used)
  }

  return (
    <Card
      className={styles.card}
      radius={'md'}
      shadow={'sm'}
      styles={{
        root: {
          background: 'var(--tg-theme-background-color)',
        },
      }}
    >
      <Card.Section className={styles.header} style={{ backgroundColor: color }}>
        <Group justify={'space-between'} mb={'xs'}>
          <Text fw={600} fz={25} style={{ color: '#fdfdfd' }}>
            {promoName}
          </Text>

          <Badge color={'green'} fz={12}>
            {isFirstOrder ? 'первого заказ' : 'повторный заказ'}
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section className={styles.section}>
        <Text c={'dimmed'} size={'sm'}>
          {promoOptions && (
            <List>
              {promoOptions.map((option, i) => (
                <List.Item
                  key={i}
                >{`скидка ${option.discount}₽ от ${option.threshold}₽`}</List.Item>
              ))}
            </List>
          )}

          {!promoOptions && <Text>Нет доступных опций</Text>}
        </Text>
      </Card.Section>

      <Card.Section className={styles.section}>
        <Flex align={'center'} justify={'space-between'}>
          <Flex direction={'column'} gap={5}>
            <Text
              fw={300}
              style={{ whiteSpace: 'nowrap', color: 'var(--tg-theme-text-color)', opacity: 0.6 }}
            >
              действует до:
            </Text>

            <Flex align={'center'} gap={10} h={20}>
              <IoTimeOutline
                size={22}
                style={{ color: 'var(--tg-theme-text-color)', opacity: 0.6 }}
              />

              <Text
                fw={600}
                mt={5}
                style={{ whiteSpace: 'nowrap', color: 'var(--tg-theme-text-color)' }}
              >
                {validUntil ? new Date(+validUntil).toLocaleDateString() : 'бессрочен'}
              </Text>
            </Flex>
          </Flex>

          <Button
            color={used ? 'green' : 'blue'}
            onClick={onClickUsedButtonHandler}
            radius={'md'}
            rightSection={used && <FaCheck />}
            w={150}
          >
            Использовал
          </Button>
        </Flex>
      </Card.Section>
    </Card>
  )
}
