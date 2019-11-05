<template>
  <v-app>
    <pages-bar />

    <pages-drawer />

    <pages-view />

    <pages-footer />
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'
  
  export default {
    name: 'PagesIndex',

    components: {
      PagesBar: () => import('./core/Bar'),
      PagesDrawer: () => import('./core/Drawer'),
      PagesFooter: () => import('./core/Footer'),
      PagesView: () => import('./core/View')
    },

    created () {
      this.$vuetify.theme.dark = true
    },

    beforeDestroy () {
      this.$vuetify.theme.dark = false
    }
  }
</script>

<style>
  .bluegrad {
    background: linear-gradient(to right, #1e469a, #49a7c1);
  }
</style>

