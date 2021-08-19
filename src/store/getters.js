const getters = {
  routers: state => state.routers.routes,
  addRouters: state => state.asyncRouter.addRouters,
  roles: state => state.user.roles,
  menus:  state => state.router.routes
}

export default getters
