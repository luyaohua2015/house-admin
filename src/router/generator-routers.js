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
    const result = userNav.default
    const menuNav = []
    const childrenNav = [] // 树形结构数据
    // 后端数据, 根级树数组,  根级 PID
    listToTree(result, childrenNav, 0)
    rootRouter.children = childrenNav
    const routers = generator(menuNav)
    console.log(childrenNav)
  })
}

/**
 * 描述
 * @author 陆耀华
 * @date 2021-08-18
 * @param {any} routerMap
 * @param {any} parent
 * @returns {any}
 */
export const generator = function (routerMap, parent) {
  return routerMap.map(item => {
    const { title, show, hideChildren, target, icon } = item.meta || {}
    const currentRouter = {
      
    }
  })
}

/**
 * 描述
 * @author 陆耀华
 * @date 2021-08-18
 * @param {any} list 源数组
 * @param {any} tree 树形
 * @param {any} parentId 父ID
 * @returns {any}
 */
function listToTree(list, tree, parentId) {
  list.forEach(item =>  {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入树形中
      tree.push(child)
    }
  })
}