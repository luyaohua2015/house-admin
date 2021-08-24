import storage from 'storejs'

const app = {
	namespaced: true,
	state: {
		layout: 'SideLayout',
		showMenuTab: true,
		fixedMenuTab: true,
		fixedHeader: true,
		fixedSidebar: true,
    animation: ''
	},
	mutations: {
		SET_LAYOUT(state, layout) {
			state.layout = layout
		},
		SET_MENUTAB(state, showMenuTab) {
			state.showMenuTab = showMenuTab
		},
		SET_FIXED_MENUTAB(state, fixedMenuTab) {
			state.fixedMenuTab = fixedMenuTab
		},
		SET_FIXED_HEADER(state, fixedHeader) {
			state.fixedHeader = fixedHeader
		},
		SET_FIXED_SIDEBAR(state, fixedSidebar) {
			state.fixedSidebar = fixedSidebar
		},
		SET_ANIMATION(state, animation) {
			state.animation = animation
		}
  },
	actions: {
		setLayout({ commit }, data) {
			commit('SET_LAYOUT', data)
		},
		setMenuTab({ commit }, data) {
			commit('SET_MENUTAB', data)
		},
		setFixedMenuTab({ commit }, data) {
			commit('SET_FIXED_MENUTAB', data)
		},
		setFixedHeader({ commit }, data) {
			commit('SET_FIXED_HEADER', data)
		},
		setFixedSidebar({ commit }, data) {
			commit('SET_FIXED_SIDEBAR', data)
		},
		setAnimation({ commit }, data) {
			commit('SET_ANIMATION', data)
		}
	},
}

export default app
