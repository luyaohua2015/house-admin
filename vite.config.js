import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import { resolve } from 'path'
const pathResolve = dir => resolve(__dirname, '.', dir)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@', replacement: pathResolve('src')
      }
    ]
  },
  server: {
    hmr: true
  },
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [ AntDesignVueResolver() ]
    })
  ]
})
