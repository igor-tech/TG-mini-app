import { useState } from 'react'

import { PromoCodes } from '@/app/page/Promo/PromoCodes/PromoCodes'
import { BackButton } from '@/common/components/BackButton/BackButton'
import { SharedDivider } from '@/common/components/Divider/Divider'
import { LayoutContent } from '@/common/components/Layout/LayoutContent/LayoutContent'
import { PROMO_CODES_CONTROLLED_DATA, URL_BANNERS_PAGE } from '@/common/config'
import { SegmentedControl } from '@mantine/core'
import { HapticFeedback, postEvent } from '@tma.js/sdk'

export type PromoFilterTypes = 'all' | 'available' | 'used'

export const PromoPage = () => {
  const [filter, setFilter] = useState<PromoFilterTypes>('all')
  const haptic = new HapticFeedback('7.0', postEvent)

  const changeControllerValue = (event: string) => {
    haptic.impactOccurred('rigid')
    setFilter(event as PromoFilterTypes)
  }

  return (
    <>
      <LayoutContent imageURL={URL_BANNERS_PAGE.PROMO}>
        <BackButton />

        <SegmentedControl
          color={'blue'}
          data={PROMO_CODES_CONTROLLED_DATA}
          defaultValue={filter}
          fullWidth
          mt={20}
          onChange={changeControllerValue}
          size={'lg'}
          styles={{
            indicator: {
              background: 'var(--tg-theme-secondary-background-color)',
            },
            label: {
              color: 'var(--tg-theme-text-color)',
            },
            root: {
              background: 'var(--tg-theme-background-color)',
              borderColor: 'red',
            },
          }}
          withItemsBorders={false}
        />

        <SharedDivider label={'Промокоды'} />

        <PromoCodes filter={filter} />
      </LayoutContent>
    </>
  )
}
