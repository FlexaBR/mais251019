<template>
  <v-app-bar id="pages-bar" absolute color="transparent" flat height="88">
    <v-container>
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
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PagesBar',

  data: () => ({

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

  methods: {
    ...mapMutations(['toggleDrawer']),
    onClick () {
      this.setDrawer(!this.$store.state.app.drawer)
    }
  }
}
</script>

<style>
/* Fix coming in v2.0.8 */
#pages-bar {
  width: auto;
}

#pages-bar a {
  text-decoration: none;
}
</style>
