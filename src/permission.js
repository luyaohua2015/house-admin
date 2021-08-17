import router from './router'
import store from './store'
import storage from 'storejs'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const allowList = [
  'login',
  'register',
  'registerResult'
]

const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  storage.set(ACCESS_TOKEN, '1234')
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
    } else {
      // if (store.getters.roles.lenght === 0) {
      //   // store.dispatch()
      // }
      // 根据roles权限生成可访问的路由表
      // 动态添加可访问路由表
      store.dispatch('GenerateRoutes', { token: 1234 }).then(() => {
        debugger
        store.getters.addRouters.forEach(r => {
          router.addRoute(r)
        })
      })
      next()
      // 请求带有 redirect 重定向时，登录自动重定向到该地址
      // const redirect = decodeURIComponent(from.query.redirect || to.path)
      // if (to.path === redirect) {
      //   // set the replace: true so the navigation will not leave a history record
      //   next({ ...to, replace: true })
      // } else {
      //   // 跳转到目的路由
      //   next({ path: redirect })
      // }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
    }
  }
})
