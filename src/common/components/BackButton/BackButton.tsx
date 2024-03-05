import { Button } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'
import { FaArrowLeftLong } from 'react-icons/fa6'

export const BackButton = () => {
  const navigate = useNavigate()

  const navigateHandler = () => {
    return navigate({ to: '/' })
  }

  return (
    <Button fullWidth leftSection={<FaArrowLeftLong size={14} />} mt={20} onClick={navigateHandler}>
      Вернуться на главную
    </Button>
  )
}
