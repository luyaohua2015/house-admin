import { BasicLayout, BlankLayout, RouteView } from '@/layouts'
import * as userNav from '@/assets/json/userNav.json'
console.log(userNav);

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  '404': import(/* webpackChunkName: "error" */ '@/views/exception/404/index.vue'),

  // 你需要动态引入的页面组件
  Workplace: () => import('@/views/dashboard/workplace/index.vue'),
  Analysis: () => import('@/views/dashboard/analysis/index.vue'),

  // 系统设置
  Role: () => import('@/views/system/role/index.vue'),
  Permission: () => import('@/views/system/permission/index.vue')
}

// 前端未找到页面路由（固定不用改）
const noFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}

// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '',
  component: 'BasicLayout',
  redirect: '/dashboard',
  meta: {
    title: '首页'
  },
  children: []
}

export const generatorDynamicRouter = token => {
  return new Promise((resolve, reject) => {
    const result = {

    }
  })
}
