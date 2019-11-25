<template>
  <div class="user-admin">
    <div v-if="erros" class="mb-4">
      <Erros :erros="erros" />
    </div>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      item-key="id"
      class="elevation-1"
      hide-default-footer>
    </v-data-table>
  </div>
</template>

<script>
import Erros from '@/components/comum/Erros'
import gql from 'graphql-tag'

export default {
  name: 'UserAdmin',
  components: { Erros },
  data: function () {
    return {
      erros: null,
      mode: 'save',
      usuario: {},
      usuarios: [],
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'Nome', value: 'nome' },
        { text: 'Atividade', value: 'atividade' },
        { text: 'e-mail', value: 'email' }
      ]
    }
  },
  methods: {
    obterUsuarios () {
      this.$api
        .query({
          query: gql`
            query {
              usuarios {
                id
                nome
                atividade
                email
              }
            }
          `,
          fetchPolicy: 'network-only'
        })
        .then(resultado => {
          this.usuarios = resultado.data.usuarios
          this.erros = null
          console.log(this.usuarios)
        })
        .catch(e => {
          this.usuarios = []
          this.erros = e
        })
    }
  },
  mounted () {
    this.obterUsuarios()
  }
}
</script>

<style>
</style>
