<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Excluir Perfil</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="ID" v-model.number="filtro.id" />
          <v-text-field label="Nome" v-model="filtro.nomep" />

          <v-btn color="error" class="ml-0 mt-3" @click="excluirPerfil">Excluir Perfil</v-btn>
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
      dados: null,
      erros: null
    }
  },
  methods: {
    excluirPerfil () {
      this.$api
        .mutate({
          mutation: gql`
            mutation($id: Int, $nomep: String) {
              excluirPerfil(filtro: { id: $id, nomep: $nomep }) {
                id
                nomep
              }
            }
          `,
          variables: {
            id: this.filtro.id,
            nomep: this.filtro.nomep
          }
        })
        .then(resultado => {
          this.dados = resultado.data.excluirPerfil
          this.filtro = {}
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
