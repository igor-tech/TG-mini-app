import { FC, ReactNode } from 'react'
import { IconType } from 'react-icons'

import { Button } from '@mantine/core'

type Props = {
  children?: ReactNode
  color?: string
  fullWidth?: boolean
  icon?: IconType
  iconVariant?: 'left' | 'right'
  onClick?: () => void
  text?: string
}

export const SharedButton: FC<Props> = ({
  text,
  icon,
  color,
  onClick,
  iconVariant = 'left',
  fullWidth,
  children,
}) => {
  const Icon = icon
  const isLeft = iconVariant === 'left'

  return (
    <Button
      color={color}
      fullWidth={fullWidth}
      leftSection={Icon && isLeft && <Icon size={22} />}
      onClick={onClick}
      radius={'sm'}
      rightSection={Icon && !isLeft && <Icon size={22} />}
      variant={'filled'}
    >
      {text || children}
    </Button>
  )
}
