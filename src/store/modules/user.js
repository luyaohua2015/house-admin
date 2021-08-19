import storage from 'storejs'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
	namespaced: true,
	state: {
		roles: [],
		token: ''
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token
		},
		SET_ROLES(state, data) {
			state.roles = data
		},	},
	actions: {
		login({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
				storage.set(ACCESS_TOKEN, '123456', 7 * 24 * 60 * 60 * 1000)
				commit('SET_TOKEN', 12345)
				resolve()
			})
		},
		getUserInfo({ commit }) {
			return new Promise((resolve, reject) => {
				const role = [1, 2]
				commit('SET_ROLES', role)
				resolve()
			})
		},

		// 登出
		logout ({ commit, state }) {
			return new Promise((resolve) => {
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				storage.remove(ACCESS_TOKEN)
				resolve()
			})
		}
	},
}

export default user
