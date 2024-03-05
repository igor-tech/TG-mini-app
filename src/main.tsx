import { App } from '@/App'
import { SDKProviderError } from '@/common/components/sdk/SDKError'
import { SDKInitialState } from '@/common/components/sdk/SDKInit'
import { SDKProviderLoading } from '@/common/components/sdk/SDKLoading'
import { MantineProvider, createTheme } from '@mantine/core'
import { DisplayGate, SDKInitOptions, SDKProvider } from '@tma.js/sdk-react'
import { createRoot } from 'react-dom/client'

import './styles/global.css'
import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/700.css'

const options: SDKInitOptions = {
  acceptCustomStyles: true,
  async: true,
  cssVars: { miniApp: true, themeParams: true, viewport: true },
}

const theme = createTheme({
  /** Put your mantine theme override here */
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <SDKProvider options={options}>
    <DisplayGate error={SDKProviderError} initial={SDKInitialState} loading={SDKProviderLoading}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </DisplayGate>
  </SDKProvider>
)
