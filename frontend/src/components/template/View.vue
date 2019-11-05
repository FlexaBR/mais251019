<template>
  <v-content class="grey lighten-3">
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-content>
</template>

<script>
export default {
  name: 'TemplateView',

  data: () => ({
    srcs: {}
  }),

  computed: {
    src () {
      return this.srcs[this.$route.path]
    }
  }
}
</script>

<
<style>
  .bluegrad {
    background: linear-gradient(to right, #1e469a, #49a7c1);
  }
</style>
