import storage from 'storejs'

const app = {
	namespaced: true,
	state: {
		layout: 'SideLayout',
		showMenuTab: true,
		fixedMenuTab: true,
		fixedHeader: true,
		fixedSidebar: true,
    animation: '',
		primaryColor: '#1890FF',
		style: 'dark'
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
		},
		SET_PRIMARY_COLOR(state, color) {
			state.primaryColor = color
		},
		SET_STYLE(state, style) {
			state.style = style
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
		},
		setPrimaryColor({ commit }, data) {
			commit('SET_PRIMARY_COLOR', data)
		},
		setStyle({ commit }, data) {
			commit('SET_STYLE', data)
		}
	},
}

export default app
