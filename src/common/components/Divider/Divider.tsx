import { FC } from 'react'

import { Divider } from '@mantine/core'

type Props = {
  label: string
}

export const SharedDivider: FC<Props> = ({ label }) => {
  return (
    <Divider
      label={label}
      labelPosition={'center'}
      mb={20}
      mt={20}
      size={'sm'}
      styles={{
        label: { fontSize: '20px' },
        root: { borderColor: 'var(--tg-theme-hint-color)' },
      }}
    />
  )
}
