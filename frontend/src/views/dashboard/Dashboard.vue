<template>
  <v-container v-if="usuario" id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12"></v-col>
      <Stat />
    </v-row>
  </v-container>
  <div v-else><h2>Necessário Logar</h2></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Stat: () => import('./Stat')
  },
  data: function () {
    return {
      stat: {}
    }
  },
  computed: {
    ...mapGetters(['usuario'])
  }
}
</script>
