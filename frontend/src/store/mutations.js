// https://vuex.vuejs.org/en/mutations.html
import { set, toggle } from '@/utils/vuex'

export default {
  setUser (state, user) {
    state.user = user
  },
  setDrawer: set('drawer'),
  toggleDrawer: toggle('drawer'),

  SET_DRAWER (state, payload) {
    state.drawer = payload
  }
  /* toggleMenu (state, isVisible) {
    if (!state.usuario) {
      state.isMenuVisible = false
      return
    }
    if (isVisible === undefined) {
      state.isMenuVisible = !state.isMenuVisible
    } else {
      state.isMenuVisible = isVisible
    }
  },
  setUsuario ({ commit }, usuario) {
    state.usuario = usuario
    if (usuario && usuario.token) {
      localStorage.setItem('token', usuario.token)
      state.isMenuVisible = true
    } else {
      localStorage.removeItem('token')
      state.isMenuVisible = false
    }
    commit('setUsuario', usuario)
  } */
}
