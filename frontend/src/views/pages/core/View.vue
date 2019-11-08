<template>
    <v-content class="grey lighten-3">

      <v-fade-transition mode="out-in">

        <router-view />

      </v-fade-transition>

    </v-content>
</template>

<script>

export default {
  name: 'PagesView'
}
</script>
