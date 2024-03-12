import { useStore } from '@/app/store/store'
import { SharedButton } from '@/common/components/Button/Button'
import { ButtonLayout } from '@/common/components/Layout/ButtonLayout/ButtonLayout'
import { Flex } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { HapticFeedback, postEvent } from '@tma.js/sdk'
import { FaCheck } from 'react-icons/fa'
import { LuShoppingCart } from 'react-icons/lu'

export const NavigationButton = () => {
  const { sendUpdatedData, isDataChanged } = useStore()
  const haptic = new HapticFeedback('7.0', postEvent)

  const closeMiniAppHandler = async () => {
    haptic.impactOccurred('medium')

    if (isDataChanged) {
      await sendUpdatedData()
    }

    postEvent('web_app_close')
  }

  return (
    <ButtonLayout>
      <Flex gap={10} justify={'space-around'} pl={5} pr={5} w={'100%'}>
        <Link
          activeOptions={{ exact: true }}
          onClick={() => haptic.impactOccurred('heavy')}
          style={{ textDecoration: 'none' }}
          to={'/order'}
        >
          <SharedButton icon={LuShoppingCart}>Отслеживаемые</SharedButton>
        </Link>

        <SharedButton
          color={'green'}
          icon={FaCheck}
          iconVariant={'right'}
          onClick={closeMiniAppHandler}
          text={'Применить'}
        />
      </Flex>
    </ButtonLayout>
  )
}
