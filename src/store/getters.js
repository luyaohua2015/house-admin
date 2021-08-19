const getters = {
  routers: state => state.routers.routes,
  addRouters: state => state.asyncRouter.addRouters,
  roles: state => state.user.roles
}

export default getters
