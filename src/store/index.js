import { createStore } from 'vuex'
import routers from './modules/router'
// dynamic router permission control (Experimental)
import asyncRouter from './modules/asyncRouter'
import user from './modules/user'
import router from './modules/router'
import app from './modules/app'
import getters from './getters'
export const key = 'fang-store'
export default createStore({
  modules: {
    routers,
    asyncRouter,
    user,
    router,
    app
  },
  getters
})
