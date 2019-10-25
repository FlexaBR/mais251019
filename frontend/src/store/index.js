import { set, toggle } from '@/utils/vuex'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuVisible: false,
    usuario: null,
    /* usuario: {
            nome: 'User Mock',
            email: 'mock@user.com'
        }, */
    drawer: null
  },
  mutations: {
    toggleMenu (state, isVisible) {
      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible
      } else {
        state.isMenuVisible = isVisible
      }
    },
    setDrawer: set('drawer'),
    toggleDrawer: toggle('drawer')

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
  },
  actions: {
  },
  modules: {
  }
})
