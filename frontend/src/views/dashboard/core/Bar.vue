<template>
  <v-app-bar
    id="dashboard-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
    style="width: auto;"
  >
    <v-btn
      fab
      small
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">mdi-view-quilt</v-icon>

      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-toolbar-title class="hidden-sm-and-down" v-text="$route.name" />

    <v-spacer />
  </v-app-bar>
</template>

<script>
// Utilities
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DashboardBar',

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState(['drawer'])
  },

  methods: {
    ...mapMutations({
      setDrawer: 'SET_DRAWER'
    })
  }
}
</script>
