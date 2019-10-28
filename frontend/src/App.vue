<template>
  <v-app>
    <AppBar />
    <HomeDrawer />
    <v-content class="white">
      <router-view />
    </v-content>
    <div class="divulgacao">
      <a>Mais Representações Buddemeyer Delrio</a>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "App",
  components: {
    AppBar: () => import("./components/template/AppBar"),
    Footer: () => import("./components/template/Footer"),
    HomeDrawer: () => import("./components/template/Drawer")
  },
  data: () => ({
    //
  }),
  created() {
    this.$vuetify.theme.dark = true;
    this.setUsuario(null)
  },
  beforeDestroy() {
    this.$vuetify.theme.dark = false
  },
  methods: mapActions(['setUsuario'])
}
</script>


<style>
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
div.divulgacao {
  background-color: white;
}
div.divulgacao a {
  color: white;
}
</style>