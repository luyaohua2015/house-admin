import storage from 'storejs'

const app = {
	namespaced: true,
	state: {
		layout: 'SideLayout'
	},
	mutations: {
		SET_LAYOUT(state, layout) {
			state.layout = layout
		}
  },
	actions: {
		setLayout({ commit }, data) {
			commit('SET_LAYOUT', data)
		}
	},
}

export default app
