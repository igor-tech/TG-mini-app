import { FC, ReactNode } from 'react'

import { Flex } from '@mantine/core'

type ButtonLayoutProps = {
  children: ReactNode
}

export const ButtonLayout: FC<ButtonLayoutProps> = ({ children }) => {
  return (
    <Flex
      align={'center'}
      bottom={10}
      gap={10}
      justify={'space-around'}
      left={0}
      pos={'fixed'}
      w={'100%'}
    >
      {children}
    </Flex>
  )
}
