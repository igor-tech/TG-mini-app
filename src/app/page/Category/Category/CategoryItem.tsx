import { FC } from 'react'

import { CATEGORIES_ICON } from '@/common/config'
import { Text, UnstyledButton, useMantineTheme } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'
import { HapticFeedback, postEvent } from '@tma.js/sdk'

import styles from './CategoryItem.module.css'

type Props = {
  colorIcon: string
  iconName: string
  id: number
  title: string
}

export const CategoryItem: FC<Props> = ({ colorIcon, iconName, id, title }) => {
  const theme = useMantineTheme()
  const navigate = useNavigate({ from: '/category/$categoryid' })
  const haptic = new HapticFeedback('7.0', postEvent)

  const Icon = CATEGORIES_ICON[iconName]

  const navigateHandler = async () => {
    haptic.impactOccurred('heavy')
    await navigate({ params: { categoryid: `${id}` }, to: '/category/$categoryid' })
  }

  return (
    <>
      <UnstyledButton classNames={{ root: styles.item }} key={title} onClick={navigateHandler}>
        <Icon color={theme.colors[colorIcon][6]} size={'2.5rem'} />

        <Text mt={7} size={'sm'}>
          {title}
        </Text>
      </UnstyledButton>
    </>
  )
}
