import { Button } from '@mantine/core'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { BackButton, HapticFeedback, postEvent } from '@tma.js/sdk'
import { FaArrowLeftLong } from 'react-icons/fa6'

export const BackButtonShared = () => {
  const backButton = new BackButton(true, '7.0', postEvent)
  const { history } = useRouter()
  const navigate = useNavigate()
  const haptic = new HapticFeedback('7.0', postEvent)

  const navigateHandler = () => {
    haptic.impactOccurred('soft')

    return navigate({ to: '/' })
  }

  backButton.on('click', () => {
    haptic.impactOccurred('soft')
    history.go(-1)
  })

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
