<template>
  <v-app>
    <dashboard-bar v-model="expandOnHover" />

    <dashboard-drawer :expand-on-hover.sync="expandOnHover" />

    <dashboard-view />
    <dashboard-footer />

  </v-app>
</template>

<script>
export default {
  name: 'DashboardIndex',

  components: {
    DashboardBar: () => import('./core/Bar'),
    DashboardDrawer: () => import('./core/Drawer'),
    DashboardView: () => import('./core/View'),
    DashboardFooter: () => import('./core/Footer')
  },

  data: () => ({
    expandOnHover: false
  })
}
</script>
