const routers = {
  namespace: true,
  state: {
    routes: []
  },
  mutations: {
    SET_ROUTES(state, data) {
      state.routes = data
    }
  },
  actions: {
    set_routes({ commit }, data) {
      commit('SET_ROUTES', data)
    }
  }
}

export default routers
