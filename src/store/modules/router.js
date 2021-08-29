import cloneDeep from 'lodash.clonedeep'

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
    },
    SET_RIGHT_ROUTES(state, index) {
      state.routes = state.routes.slice(0, index + 1)
    },
    SET_LEFT_ROUTES(state, index) {
      const items = cloneDeep(state.routes).slice(0, index)
      items.forEach(subItem => {
        state.routes.forEach((item, key) => {
          if (item.fullPath === subItem.fullPath) {
            state.routes.splice(key, 1)
            return false
          }
        })
      })
    },
    SET_OTHER_ROUTES(state, data) {
      state.routes = [data]
    }
  },
  actions: {
    setRoutes({ commit }, data) {
      commit('SET_ROUTES', data)
    },
    removeRoutes({ commit }, fullPath) {
      commit('REMOVE_ROUTES', fullPath)
    },
    removeRightRoutes({ commit }, data) {
      return new Promise((resolve) => {
        commit('SET_RIGHT_ROUTES', data)
        resolve(data)
      })
    },
    removeLeftRoutes({ commit }, data) {
      return new Promise((resolve) => {
        commit('SET_LEFT_ROUTES', data)
        resolve(data)
      })
    },
    otherRoutes({ commit }, data) {
      return new Promise((resolve) => {
        commit('SET_OTHER_ROUTES', data)
        resolve(data)
      })
    },
  }
}

export default routers
