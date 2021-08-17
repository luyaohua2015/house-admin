import { constantRouterMap } from '@/config/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers.js'
const permission = {
  namespace: true,
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data)  {
      const { token } = data
      generatorDynamicRouter().then(routers => {
        commit('SET_ROUTERS', routers)
        resolve()
      })
    }
  }
}

export default permission
