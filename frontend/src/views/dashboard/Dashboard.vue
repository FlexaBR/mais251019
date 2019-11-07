<template>
  <v-container v-if="usuario" id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12"></v-col>
      <UsuarioLogado />
    </v-row>
  </v-container>
  <div v-else><h2>Necessário Logar</h2></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    UsuarioLogado: () => import('@/components/comum/UsuarioLogado')
  },
  computed: {
    ...mapGetters(['usuario'])
  }
}
</script>
