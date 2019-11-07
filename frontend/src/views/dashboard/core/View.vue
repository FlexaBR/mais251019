<template>
  <v-content style="background-color: #efefef;">
    <router-view />
    <dashboard-footer />
  </v-content>
</template>

<script>
export default {
  name: 'DashboardView',
  components: {
    DashboardFooter: () => import('./Footer')
  }
}
</script>
