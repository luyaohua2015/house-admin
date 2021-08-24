import { createApp } from 'vue'
// import 'ant-design-vue/lib/notification/style'
import App from './App.vue'
import router from '@/router/index.js'
import '@/style/animate/index.less'
// import i18n from './locales/index.js'
import '@/permission' // permission control
import store from '@/store/index.js'
import { message, notification } from 'ant-design-vue'

const app = createApp(App)

app.use(router).use(store).mount('#app')
app.config.globalProperties.$message = message
app.config.globalProperties.$notification = notification
