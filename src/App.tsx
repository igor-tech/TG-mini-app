import { useEffect } from 'react'

import { useStore } from '@/app/store/store'
import { routeTree } from '@/routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ClosingBehavior, init, postEvent } from '@tma.js/sdk'
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

  const miniApp = useMiniApp()

  const { initializeApp, setIsDataChanged, isDataChanged } = useStore()

  const closingBehaviour = new ClosingBehavior(true, postEvent)

  useEffect(() => {
    miniApp.ready()

    if (initDataRaw) {
      initializeApp({ initDataRaw })
      setIsDataChanged(false)
    }
  }, [])

  useEffect(() => {
    if (isDataChanged) {
      closingBehaviour.enableConfirmation()
    }
  }, [isDataChanged])

  return <RouterProvider router={router} />
}
