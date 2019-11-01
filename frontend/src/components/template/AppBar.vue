<template>
  <v-app-bar id="template-app-bar" absolute color="transparent" flat height="88">
    <v-container>
      <div v-if="!usuario">
        <v-row align="center">
          <v-img class="shrink" max-width="40%" :src="require('@/assets/logoMB.png')" width="180" />
          <v-spacer />
          <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
            <v-btn v-for="(item, i) in items" :key="i" :to="item.to" min-height="48" text>
              <v-icon left size="20" v-text="item.icon" />
              <span v-text="item.text" />
            </v-btn>
          </v-toolbar-items>
          <v-app-bar-nav-icon v-else aria-label="Open Navigation Drawer" @click="toggleDrawer" />
        </v-row>
      </div>

      <div v-if="usuario">
        <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
          <v-btn v-if="responsive" dark icon @click.stop="onClick">
            <v-icon>mdi-view-list</v-icon>
          </v-btn>
          {{ title }}
        </v-toolbar-title>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'AppBar',

  data: () => ({
    title: null,
    responsive: false,

    items: [
      {
        icon: 'mdi-home',
        text: 'Home',
        to: '/home'
      },
      {
        icon: 'mdi-account-multiple-plus',
        text: 'Registro',
        to: '/register'
      },
      {
        icon: 'mdi-fingerprint',
        text: 'Entrar',
        to: '/login'
      }
    ]
  }),

  watch: {
    $route (val) {
      this.title = val.name
    }
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  computed: {
    ...mapState(['usuario'])
  },

  methods: {
    ...mapMutations(['toggleDrawer']),
    onClick () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style>
  /* Fix coming in v2.0.8 */
  #template-app-bar {
    width: auto;
  }

  #template-app-bar a {
    text-decoration: none;
  }
</style>
