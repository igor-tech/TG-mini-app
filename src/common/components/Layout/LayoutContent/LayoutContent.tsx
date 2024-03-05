import { FC, ReactNode, useEffect } from 'react'

import { NavigationButton } from '@/common/components/Layout/Navigation/NavigationButton'
import { Box, Container, Image } from '@mantine/core'
import { useRouter } from '@tanstack/react-router'
import { BackButton, postEvent } from '@tma.js/sdk'

import styles from './LayoutContent.module.css'

type LayoutContentProps = {
  children: ReactNode
  imageURL: string
}

export const LayoutContent: FC<LayoutContentProps> = ({ children, imageURL }) => {
  const backButton = new BackButton(true, '6.3', postEvent)
  const { history } = useRouter()

  const navigateHandler = (): void => {
    history.go(-1)
  }

  useEffect(() => {
    if (window.location.pathname == '/') {
      backButton.hide()

      return
    }

    backButton.show()
  }, [])
  backButton.on('click', navigateHandler)

  return (
    <Box className={styles.wrapper}>
      <Image alt={'Banner'} className={styles.image} fit={'cover'} h={260} src={imageURL} />

      <Box className={styles.closeBlock}></Box>

      <Box className={styles.content}>
        <Container mb={20} mt={10} px={20} size={'lg'}>
          {children}
        </Container>

        <NavigationButton />
      </Box>
    </Box>
  )
}
