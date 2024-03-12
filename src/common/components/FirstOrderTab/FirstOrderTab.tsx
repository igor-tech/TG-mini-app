import { useStore } from '@/app/store/store'
import { Loader } from '@/common/components/Loader/Loader'
import { SegmentedControl } from '@mantine/core'
import { HapticFeedback, postEvent } from '@tma.js/sdk'

export const FirstOrderTab = () => {
  const { user, setOrderStatus } = useStore()
  const haptic = new HapticFeedback('7.0', postEvent)

  if (!user) {
    return <Loader />
  }

  const changeTabValueHandler = (event: null | string) => {
    if (event) {
      haptic.impactOccurred('rigid')
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
        },
      }}
      value={user?.isFirstOrder ? '0' : '1'}
    />
  )
}
