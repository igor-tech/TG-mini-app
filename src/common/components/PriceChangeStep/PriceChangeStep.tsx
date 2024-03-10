import { useStore } from '@/app/store/store'
import { PRICE_STEP_SLIDER_MARKS } from '@/common/config'
import { Box, Slider, Text } from '@mantine/core'
import { HapticFeedback, postEvent } from '@tma.js/sdk'
import { TbGripHorizontal } from 'react-icons/tb'

import styles from './PriceChangeStep.module.css'

export const PriceChangeStep = () => {
  const { priceStep, changePriceStep } = useStore()
  const haptic = new HapticFeedback('7.0', postEvent)

  const defaultValue = PRICE_STEP_SLIDER_MARKS.find(mark => +mark.label === priceStep)?.value || 0

  const setEndValue = (value: number) => {
    const price = PRICE_STEP_SLIDER_MARKS.find(mark => +mark.value === value)!.label

    changePriceStep(+price)
  }

  return (
    <Box className={styles.wrapper} mt={15} p={15}>
      <Text>Шаг изменения цены</Text>
      <Slider
        classNames={styles}
        defaultValue={defaultValue}
        label={val => PRICE_STEP_SLIDER_MARKS.find(mark => mark.value === val)!.label}
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
        marks={PRICE_STEP_SLIDER_MARKS}
        mb={15}
        mt={10}
        onChange={() => haptic.selectionChanged()}
        onChangeEnd={setEndValue}
        step={25}
        thumbChildren={<TbGripHorizontal />}
      />
    </Box>
  )
}