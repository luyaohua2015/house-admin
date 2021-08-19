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
      }
      console.log(state.routes)
    }
  },
  actions: {
    set_routes({ commit }, data) {
      commit('SET_ROUTES', data)
    }
  }
}

export default routers
