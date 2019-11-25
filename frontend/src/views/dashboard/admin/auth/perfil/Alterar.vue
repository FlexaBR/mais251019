<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Filtrar Perfil</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="ID" v-model.number="filtro.id" />
          <v-text-field label="Nome" v-model="filtro.nomep" />

          <h1 class="mt-4 headline">Alterar Perfil</h1>
          <v-divider class="mb-3" />
          <v-text-field label="Nome" v-model="perfil.nomep" />

          <v-btn color="primary" class="ml-0 mt-3" @click="alterarPerfil">Alterar Perfil</v-btn>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Resultado</h1>
          <v-divider />
          <template v-if="dados">
            <v-text-field label="ID" readonly v-model="dados.id" />
            <v-text-field label="Nome" readonly v-model="dados.nomep" />
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Erros from '@/components/comum/Erros'
import gql from 'graphql-tag'

export default {
  components: { Erros },
  data () {
    return {
      filtro: {},
      perfil: {},
      dados: null,
      erros: null
    }
  },
  methods: {
    alterarPerfil () {
      this.$api
        .mutate({
          mutation: gql`
            mutation($idFiltro: Int, $nomeFiltro: String, $nomep: String) {
              alterarPerfil(
                filtro: { id: $idFiltro, nomep: $nomeFiltro }
                dados: { nomep: $nomep }
              ) {
                id
                nomep
              }
            }
          `,
          variables: {
            idFiltro: this.filtro.id,
            nomeFiltro: this.filtro.nomep,
            nomep: this.perfil.nomep
          }
        })
        .then(resultado => {
          this.dados = resultado.data.alterarPerfil
          this.filtro = {}
          this.perfil = {}
          this.erros = null
        })
        .catch(e => {
          this.erros = e
        })
    }
  }
}
</script>

<style>
</style>
