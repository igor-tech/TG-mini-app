import { Categories } from '@/app/page/Category/Categories/Categories'
import { useStore } from '@/app/store/store'
import { SharedDivider } from '@/common/components/Divider/Divider'
import { FirstOrderTab } from '@/common/components/FirstOrderTab/FirstOrderTab'
import { LayoutContent } from '@/common/components/Layout/LayoutContent/LayoutContent'
import { Loader } from '@/common/components/Loader/Loader'
import { RegionSelect } from '@/common/components/RegionSelect/RegionSelect'
import { URL_BANNERS_PAGE } from '@/common/config'
import { Button } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { HapticFeedback, postEvent } from '@tma.js/sdk'
import { IoTicketOutline } from 'react-icons/io5'

import '@mantine/core/styles.css'

export const GeneralPage = () => {
  const { isInitialized } = useStore()
  const haptic = new HapticFeedback('7.0', postEvent)

  if (!isInitialized) {
    return <Loader />
  }

  return (
    <LayoutContent imageURL={URL_BANNERS_PAGE.GENERAL}>
      <RegionSelect />
      <FirstOrderTab />
      <Link
        onClick={() => haptic.impactOccurred('heavy')}
        style={{ textDecoration: 'none' }}
        to={'/promo'}
      >
        <Button
          color={'violet'}
          fullWidth
          leftSection={<IoTicketOutline size={22} />}
          mt={20}
          size={'md'}
        >
          Промокоды
        </Button>
      </Link>
      <SharedDivider label={'Категории'} />
      <Categories />
    </LayoutContent>
  )
}
