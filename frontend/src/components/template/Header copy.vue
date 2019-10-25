<template>
  <header class="header" :class="{'user-off': !usuario}">
    <b-container fluid>
      <b-row align-v="center">
        <b-container fluid v-if="!usuario">
          <b-row align-v="center">
            <b-col cols="auto" class="mr-auto p-3">
              <div class="logoM">
                <a class="logoM-img" href="/home">
                  <img src="@/assets/logoMB.png" alt="logo" />
                </a>
              </div>
            </b-col>
            <b-col cols="auto" class="p-3">
              <b-button-group>
                <b-button variant="primary" squared size="sm">Primary</b-button>
                <b-button variant="success" class="mx">Success</b-button>
                <b-button variant="danger">Danger</b-button>
                <b-button variant="info">Info</b-button>
                <b-button variant="light">Light</b-button>
                <b-button variant="dark">Dark</b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-container>
        <div v-if="usuario">
          <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <i class="fa fa-lg" :class="icon"></i>
          </a>
          <h1 class="title">
            <router-link to="/">{{ title }}</router-link>
          </h1>

          <UserDropdown v-if="!hideUserDropdown" />
        </div>
      </b-row>
    </b-container>
  </header>
</template>

<script>
import UserDropdown from './UserDropdown'
import { mapState } from 'vuex'

export default {
  name: 'Header',
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
