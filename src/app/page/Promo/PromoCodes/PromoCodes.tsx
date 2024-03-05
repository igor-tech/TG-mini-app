import { FC } from 'react'

import { PromoCard } from '@/app/page/Promo/PromoCard/PromoCard'
import { PromoFilterTypes } from '@/app/page/Promo/PromoPage'
import { useStore } from '@/app/store/store'
import { Flex, Text } from '@mantine/core'

type Props = {
  filter: PromoFilterTypes
}
export const PromoCodes: FC<Props> = ({ filter }) => {
  const { promoCodes } = useStore()

  let sortedPromoCodes = promoCodes

  if (filter === 'available') {
    sortedPromoCodes = promoCodes.filter(promo => !promo.used)
  }
  if (filter === 'used') {
    sortedPromoCodes = promoCodes.filter(promo => promo.used)
  }

  return (
    <Flex direction={'column'} gap={20}>
      {sortedPromoCodes &&
        sortedPromoCodes.map(promo => (
          <PromoCard
            isUsed={promo.used}
            key={promo.id}
            promoName={promo.name}
            promoOptions={promo.options}
            {...promo}
          />
        ))}
      {!sortedPromoCodes.length && (
        <Text fz={16} mt={'30%'} opacity={0.6} style={{ textAlign: 'center' }}>
          Список промокодов пуст.
        </Text>
      )}
    </Flex>
  )
}
