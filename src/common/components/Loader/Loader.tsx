import { LoadingOverlay } from '@mantine/core'

export const Loader = () => {
  return (
    <LoadingOverlay
      loaderProps={{ color: 'blue', type: 'oval' }}
      overlayProps={{ radius: 'sm', blur: 2, backgroundOpacity: 0.1, fixed: true }}
      visible
      zIndex={1000}
    />
  )
}
