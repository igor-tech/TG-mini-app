import { useStore } from '@/app/store/store'
import { Loader } from '@/common/components/Loader/Loader'
import { SegmentedControl } from '@mantine/core'

export const FirstOrderTab = () => {
  const { user, setOrderStatus } = useStore()

  if (!user) {
    return <Loader />
  }

  const changeTabValueHandler = (event: null | string) => {
    if (event) {
      setOrderStatus(event === '0')
    }
  }

  return (
    <SegmentedControl
      data={[
        { label: 'Первый заказ', value: '0' },
        { label: 'Повторный заказ', value: '1' },
      ]}
      fullWidth
      mt={20}
      onChange={changeTabValueHandler}
      size={'md'}
      styles={{
        indicator: {
          background: 'var(--tg-theme-secondary-background-color)',
        },
        label: {
          color: 'var(--tg-theme-text-color)',
        },
        root: {
          background: 'var(--tg-theme-background-color)',
        },
      }}
      value={user?.isFirstOrder ? '0' : '1'}
    />
  )
}
