<template>
  <v-content class="grey lighten-3" tag="section" style="background-color: #efefef;">
    <v-container fluid style="min-height: 100%;" class="my-2 ml-3">
      <router-view />
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'DashboardView'
}
</script>

<style>
</style>
