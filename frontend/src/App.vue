<template>
  <v-app>
    <AppBar />
    <HomeDrawer />
    <v-content class="white">
      <router-view />
    </v-content>
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
      HomeDrawer: () => import('./components/template/Drawer')
    },
    data: () => ({
      //
    }),/* 
    created () {
        this.setUsuario(null)
    },
    methods: mapActions(['setUsuario']) */

    created () {
      this.$vuetify.theme.dark = true
    },
    beforeDestroy () {
      this.$vuetify.theme.dark = false
    }
  }
</script>
