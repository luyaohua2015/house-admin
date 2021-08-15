import { constantRouterMap } from '@/config/router.config'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data)  {
      
    }
  }
}