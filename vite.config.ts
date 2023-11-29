import react from '@vitejs/plugin-react'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  plugins: [
    react(),
    AutoImport({
      imports: ['react', 'react-router-dom'],
      dts: './src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
