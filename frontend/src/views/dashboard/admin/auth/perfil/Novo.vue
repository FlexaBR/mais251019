<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Novo Perfil</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="Nome" v-model="perfil.nomep" />
          <v-btn color="primary" class="ml-0 mt-3" @click="novoPerfil">Novo Perfil</v-btn>
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
      perfil: {},
      dados: null,
      erros: null
    }
  },
  methods: {
    novoPerfil () {
      this.$api
        .mutate({
          mutation: gql`
            mutation($nomep: String) {
              novoPerfil(dados: { nomep: $nomep }) {
                id
                nomep
              }
            }
          `,
          variables: {
            nomep: this.perfil.nomep
          }
        })
        .then(resultado => {
          this.dados = resultado.data.novoPerfil
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
