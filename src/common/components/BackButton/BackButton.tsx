import { Button } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'
import { HapticFeedback, postEvent } from '@tma.js/sdk'
import { FaArrowLeftLong } from 'react-icons/fa6'

export const BackButton = () => {
  const navigate = useNavigate()
  const haptic = new HapticFeedback('7.0', postEvent)

  const navigateHandler = () => {
    haptic.impactOccurred('soft')

    return navigate({ to: '/' })
  }

  return (
    <Button
      fullWidth
      leftSection={<FaArrowLeftLong size={14} />}
      mt={20}
      onClick={navigateHandler}
      size={'md'}
    >
      Вернуться на главную
    </Button>
  )
}
