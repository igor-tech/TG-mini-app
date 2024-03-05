import { Button } from '@mantine/core'
import { useRouter } from '@tanstack/react-router'
import { FaArrowLeftLong } from 'react-icons/fa6'

export const BackButton = () => {
  const { history } = useRouter()

  const navigateHandler = () => {
    history.go(-1)
  }

  return (
    <Button fullWidth leftSection={<FaArrowLeftLong size={14} />} mt={20} onClick={navigateHandler}>
      Вернуться обратно
    </Button>
  )
}
