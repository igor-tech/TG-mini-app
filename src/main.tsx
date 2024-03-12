import { App } from '@/App'
import { MantineProvider, createTheme } from '@mantine/core'
import { SDKInitOptions, SDKProvider } from '@tma.js/sdk-react'
import { createRoot } from 'react-dom/client'

import './styles/global.css'
import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/700.css'

const options: SDKInitOptions = {
  acceptCustomStyles: true,
  cssVars: { miniApp: true, themeParams: true, viewport: true },
}

const theme = createTheme({
  /** Put your mantine theme override here */
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <SDKProvider options={options}>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </SDKProvider>
)
