<template>
  <v-app>
    <AppBar />
    <HomeDrawer />
    <template-view />
    <Footer />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    AppBar: () => import('./components/template/AppBar'),
    Footer: () => import('./components/template/Footer'),
    HomeDrawer: () => import('./components/template/Drawer'),
    TemplateView: () => import('./components/template/View')
  },
  data: () => ({
    //
  }),
  created () {
    this.$vuetify.theme.dark = true
    this.setUsuario(null)
  },
  beforeDestroy () {
    this.$vuetify.theme.dark = false
  },
  methods: mapActions(['setUsuario'])
}
</script>

<style>
</style>
