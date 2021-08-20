const routers = {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    SET_ROUTES(state, data) {
      const index = state.routes.findIndex(item => item.fullPath === data.fullPath)
      if (index === -1) {
        state.routes.push(data)
      } else {
        state.routes[index] = data
      }
    },
    REMOVE_ROUTES(state, fullPath) {
      const index = state.routes.findIndex(item => item.fullPath === fullPath)
      if (index>= 0) {
        state.routes.splice(index, 1)
      }
    }
  },
  actions: {
    set_routes({ commit }, data) {
      commit('SET_ROUTES', data)
    },
    remove_routes({ commit }, fullPath) {
      commit('REMOVE_ROUTES', fullPath)
    }
  }
}

export default routers
