import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import '@/permission' // permission control
// import store, { key } from '@/store/index.js'
createApp(App).use(router).mount('#app')
