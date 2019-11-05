<template>
  <v-navigation-drawer
    v-model="inputValue"
    fixed
    right
    temporary
    :style="'background: linear-gradient(to right, #1e469a, #49a7c1)'"
  >
    <v-row class="ma-0 pa-3 flex-no-wrap">
      <v-btn aria-label="Close" icon @click="toggleDrawer">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-divider />
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
        <v-list-item-title v-text="item.text" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PagesDrawer',
  data: () => ({
    items: [
      {
        to: '/',
        text: 'Home'
      },
      {
        to: '/register',
        text: 'Registro'
      },
      {
        to: '/login',
        text: 'Entrar'
      }
    ]
  }),

  computed: {
    ...mapState(['drawer']),
    inputValue: {
      get () {
        return this.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    }
  },

  methods: {
    ...mapMutations(['setDrawer', 'toggleDrawer'])
  }
}
</script>
