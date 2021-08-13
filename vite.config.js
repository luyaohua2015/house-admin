import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      entries: [
        {
          find: '@', replacement: 'src/'
        }
      ]
    }
  },
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [ AntDesignVueResolver() ]
    })
  ]
})
