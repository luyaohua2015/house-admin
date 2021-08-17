import { createStore } from 'vuex'
import routers from './modules/router'
// dynamic router permission control (Experimental)
import permission from './modules/async-router'
import getters from './getters'
export const key = Symbol()

export default createStore({
  modules: {
    routers,
    permission
  },
  getters
})
