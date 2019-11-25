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
      style="color: #b6b0b0; margin-top: -5px "
      class="mr-3"
      id="btnDrawer"
      fab
      small
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">mdi-view-quilt</v-icon>

      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-toolbar-title
      style="color: #555555; font-size: 18px; margin-left: 1px;"
      class="headline font-weight-thin hidden-sm-and-down"
      v-text="$route.name"
    />
    <v-spacer />
    <div class="mx-3" />
    <v-toolbar-items>
      <v-btn min-height="48" text href="/home" @click="setUsuario(null)">
        <v-icon left size="20">mdi-account </v-icon>
      </v-btn>
    </v-toolbar-items>
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
