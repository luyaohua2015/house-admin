import storage from 'storejs'

const app = {
	namespaced: true,
	state: {
		layout: 'SideLayout',
		showMenuTab: true
	},
	mutations: {
		SET_LAYOUT(state, layout) {
			state.layout = layout
		},
		SET_MENUTAB(state, showMenuTab) {
			state.showMenuTab = showMenuTab
		}
  },
	actions: {
		setLayout({ commit }, data) {
			commit('SET_LAYOUT', data)
		},
		setMenuTab({ commit }, data) {
			commit('SET_MENUTAB', data)
		}
	},
}

export default app
