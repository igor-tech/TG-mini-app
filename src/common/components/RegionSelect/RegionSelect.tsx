import { useStore } from '@/app/store/store'
import { Loader } from '@/common/components/Loader/Loader'
import { Select } from '@mantine/core'

import styles from './RegionSelect.module.css'

export const RegionSelect = () => {
  const { setRegion, regions, user } = useStore()

  if (!regions.length || !user) {
    return <Loader />
  }

  const currentRegionId = user?.region?.id || regions?.[0]?.id || 1

  if (!user?.region) {
    setRegion(regions?.[0]?.id)
  }

  const dataSelect = regions?.map(region => ({
    value: region.id.toString(),
    label: region.regionName,
  }))

  const changeRegionHandler = (event: null | string) => {
    if (event) {
      setRegion(+event)
    }
  }

  return (
    <Select
      allowDeselect={false}
      checkIconPosition={'right'}
      classNames={{ option: styles.option }}
      data={dataSelect}
      maxDropdownHeight={'400'}
      onChange={changeRegionHandler}
      placeholder={'Выберите ваш регион'}
      size={'md'}
      styles={{
        dropdown: {
          background: 'var(--tg-theme-background-color)',
          borderColor: 'var(--tg-theme-secondary-background-color)',
          boxShadow: '5px 5px 6px var(--tg-theme-secondary-background-color)',
          color: 'var(--tg-theme-text-color)',
        },
        input: {
          background: 'var(--tg-theme-background-color)',
          borderColor: 'var(--tg-theme-secondary-background-color)',
          color: 'var(--tg-theme-text-color)',
        },
      }}
      value={currentRegionId.toString()}
    />
  )
}
