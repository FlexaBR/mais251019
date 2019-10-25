<template>
  <v-card
    v-if="usuario"
    class="ma-3 pa-2"
  >
    <v-row
      class="fill-height"
      align="center"
    >
      <v-col>
        <span class="ml-3 headline">
          <strong>Nome:</strong>
        </span>
        <span class="headline blue--text text--darken-2">{{ usuario.nome }}</span>

        <span class="ml-3 headline">
          <strong>Email:</strong>
        </span>
        <span class="headline blue--text text--darken-2">{{ usuario.email }}</span>

        <span class="ml-3 headline">
          <strong>Perfis:</strong>
        </span>
        <span class="headline red--text text--darken-2">{{ perfis }}</span>
      </v-col>
      <v-col />
      <v-col class="shrink">
        <v-btn
          color="error"
          href="/home"
          @click="setUsuario(null)"
        >
          Sair
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['usuario']),
    perfis () {
      if (!this.usuario && !this.usuario.perfis) return null
      return this.usuario.perfis.map(p => p.nome).join(', ')
    }
  },
  methods: mapActions(['setUsuario'])
}
</script>

<style>
</style>
