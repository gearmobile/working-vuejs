import store from '../store/'

export default (to, from, next) => {
  if (store.getters.userIsAuthorized) {
    next()
  } else {
    next('/signin')
  }
}
