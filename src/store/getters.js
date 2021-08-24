const getters = {
  routers: state => state.routers.routes,
  addRouters: state => state.asyncRouter.addRouters,
  roles: state => state.user.roles,
  menus:  state => state.router.routes,
  layout: state => state.app.layout,
  showMenuTab: state => state.app.showMenuTab,
  fixedMenuTab: state => state.app.fixedMenuTab,
  fixedHeader: state => state.app.fixedHeader,
  fixedSidebar: state => state.app.fixedSidebar,
  animation: state => state.app.animation
}

export default getters
