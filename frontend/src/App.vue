<template>
  <v-app>
    <AppBar />
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
      Footer: () => import('./components/template/Footer')
    },
    data: () => ({
      //
    }),/* 
    created () {
        this.setUsuario(null)
    },
    methods: mapActions(['setUsuario']) */
  }
</script>
