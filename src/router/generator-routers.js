import { BasicLayout, BlankLayout, RouteView } from '@/layouts'
import * as userNav from '@/assets/json/userNav.json'

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
  Permission: () => import('@/views/system/permission/index.vue'),


  // exception
  Exception404: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404/index.vue')
}

// 前端未找到页面路由（固定不用改）
const noFoundRouter = {
  path: '/:pathMatch(.*)*',
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
    menuNav.push(rootRouter)
    console.log('menuNav', menuNav)
    const routers = generator(menuNav)
    // 添加404
    routers.push(noFoundRouter)
    console.log('routers', routers)
    resolve(routers)
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 * @author 陆耀华
 * @date 2021-08-18
 * @param {any} routerMap
 * @param {any} parent
 * @returns {any}
 */
export const generator = function (routerMap, parent) {
  return routerMap.map(item => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: constantRouterComponents[item.component || item.key] || (() => import(`@/views/${item.component}`)),
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name
      }
    }
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildren = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
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
  list.forEach(item => {
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