// https://vuex.vuejs.org/en/actions.html

export default {
  setUsuario ({ commit }, usuario) {
    if (usuario && usuario.token) {
      localStorage.setItem('token', usuario.token)
    } else {
      localStorage.removeItem('token')
    }
    commit('setUsuario', usuario)
  }
}
