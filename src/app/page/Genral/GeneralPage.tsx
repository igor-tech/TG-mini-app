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
import { IoTicketOutline } from 'react-icons/io5'

import '@mantine/core/styles.css'

export const GeneralPage = () => {
  const { isInitialized } = useStore()

  if (!isInitialized) {
    return <Loader />
  }

  return (
    <LayoutContent imageURL={URL_BANNERS_PAGE.GENERAL}>
      <RegionSelect />
      <FirstOrderTab />
      <Link style={{ textDecoration: 'none' }} to={'promo'}>
        <Button color={'violet'} fullWidth leftSection={<IoTicketOutline size={22} />} mt={20}>
          Промокоды
        </Button>
      </Link>
      <SharedDivider label={'Категории'} />
      <Categories />
    </LayoutContent>
  )
}
