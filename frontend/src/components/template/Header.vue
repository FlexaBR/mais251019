<template>
  <header class="header" :class="{'user-off': !usuario}">
    <div v-if="!usuario">
        <v-container>
          <v-row align="center">
            <v-img
              class="shrink ml-n3"
              max-width="40%"
              :src="require('@/assets/logoMB.png')"
              width="180"
            />

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

    </div>
    <div v-if="usuario">
      <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
        <i class="fa fa-lg" :class="icon"></i>
      </a>
      <h1 class="title">
        <router-link to="/">{{ title }}</router-link>
      </h1>

      <UserDropdown v-if="!hideUserDropdown" />
    </div>
  </header>
</template>

<script>
import UserDropdown from './UserDropdown'
import { mapState } from 'vuex'

export default {
  name: 'Header',

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

  components: { UserDropdown },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  computed: {
    ...mapState(['usuario']),
    icon () {
      return this.$store.state.isMenuVisible
        ? 'fa-angle-left'
        : 'fa-angle-down'
    }
  },
  methods: {
    toggleMenu () {
      this.$store.commit('toggleMenu')
    }
  }
}
// text-decoration: none; para não ficar com cara de link
// display: flex; para centralizar o icone
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);

  display: flex;
  justify-content: center;
  align-items: center;
}
.header.user-off {
  background: transparent;
}
.logoM {
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0px 20px;
}
.logoM-img {
  margin: 0px 10px;
}
.logoM-img > img {
  max-height: 37px;
  border-radius: 5px;
}
.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}
.title a {
  color: #fff;
  text-decoration: none;
}
.title a:hover {
  color: #fff;
  text-decoration: none;
}
header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}
header.header > a.toggle:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
