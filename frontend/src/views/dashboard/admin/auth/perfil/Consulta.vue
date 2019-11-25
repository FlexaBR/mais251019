<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Consultar Perfis</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="ID" v-model.number="perfil.id" />
          <v-text-field label="Nome" v-model="perfil.nomep" />
          <v-btn color="primary" class="ml-0 mt-3" @click="consultar">Consultar</v-btn>
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
      perfis: [],
      dados: null,
      erros: null
    }
  },
  computed: {
    perfisNomes () {
      return (
        this.dados &&
        this.dados.perfis &&
        this.dados.perfis.map(p => p.nomep).join(', ')
      )
    }
  },
  methods: {
    consultar () {
      this.$api
        .query({
          query: gql`
            query($id: Int, $nomep: String) {
              perfil(filtro: { id: $id, nomep: $nomep }) {
                id
                nomep
              }
            }
          `,
          variables: {
            id: this.perfil.id,
            nomep: this.perfil.nomep
          },
          fetchPolicy: 'network-only'
        })
        .then(resultado => {
          this.dados = resultado.data.perfil
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
