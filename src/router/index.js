import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouterMap } from '@/config/router.config.js'

export default createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap
})
