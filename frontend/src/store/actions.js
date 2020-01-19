// https://vuex.vuejs.org/en/actions.html

export default {
  setUser ({ commit }, user) {
    if (user && user.token) {
      localStorage.setItem('token', user.token)
    } else {
      localStorage.removeItem('token')
    }
    commit('setUser', user)
  }
}
