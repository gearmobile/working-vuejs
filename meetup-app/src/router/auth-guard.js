import store from '../store/'

export default (to, from, next) => {
  if (store.getters.getExistingUser) {
    next()
  } else {
    next('/signin')
  }
}
