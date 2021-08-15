import { createStore } from 'vuex'
import routers from './modules/router'
import getters from './getters'

const store = createStore({
  modules: {
    routers
  },
  getters
})

export default store
