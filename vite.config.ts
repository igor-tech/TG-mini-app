import * as path from 'path'

import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  // server: {
  //   hmr: {
  //     host: 'tg-mini-app.local',
  //     port: 443,
  //   },
  //   host: '0.0.0.0',
  //   https: {
  //     cert: fs.readFileSync('./.cert/localhost.pem'),
  //     key: fs.readFileSync('./.cert/localhost-key.pem'),
  //   },
  //   port: 443,
  // },
})
