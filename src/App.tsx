import { useEffect } from 'react'

import { useStore } from '@/app/store/store'
import { ColorScheme } from '@/common/constants/colorScheme'
import { routeTree } from '@/routeTree.gen'
import { useMantineColorScheme } from '@mantine/core'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ClosingBehavior, init, postEvent, retrieveLaunchParams } from '@tma.js/sdk'
import { useMiniApp } from '@tma.js/sdk-react'

export const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const App = () => {
  const { initDataRaw } = init()
  const { setColorScheme } = useMantineColorScheme()
  const miniApp = useMiniApp()

  const launchParams = retrieveLaunchParams()

  const { initializeApp, isDataChanged } = useStore()

  const closingBehaviour = new ClosingBehavior(true, postEvent)

  useEffect(() => {
    miniApp.ready()

    if (initDataRaw) {
      initializeApp({ initDataRaw })
      const theme =
        launchParams.themeParams['backgroundColor'] == '#212121'
          ? ColorScheme.Dark
          : ColorScheme.Light

      setColorScheme(theme)
    }
  }, [initDataRaw])

  useEffect(() => {
    if (isDataChanged) {
      closingBehaviour.enableConfirmation()
    } else {
      closingBehaviour.disableConfirmation()
    }
  }, [isDataChanged])

  return <RouterProvider router={router} />
}
