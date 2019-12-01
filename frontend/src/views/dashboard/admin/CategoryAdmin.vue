<template>
  <div class="category-admin">
    <b-form class="mt-3">
      <input id="category-id" type="hidden" v-model="category.id" />
      <b-form-group label="Nome:" label-for="category-name" label-size="sm">
        <b-form-input
          id="category-name"
          type="text"
          v-model="category.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o Nome da Categoria..."
          size="sm"
          class="mb-5"
        />
      </b-form-group>
      <b-button v-if="mode === 'save'" variant="primary" @click="save" class="mt-5">Salvar</b-button>
      <b-button v-if="mode === 'remove'" variant="danger" @click="remove" class="mt-5">Excluir</b-button>
      <b-button class="ml-2 mt-5" @click="reset">Cancelar</b-button>
    </b-form>

    <b-table table-class="small" hover striped :items="categories" :fields="fields" class="mt-5" small>
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="warning" @click="loadCategory(row.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button size="sm" variant="danger" @click="loadCategory(row.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import { showError } from '@/global'
import gql from 'graphql-tag'
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BTable
} from 'bootstrap-vue'

export default {
  name: 'CategoryAdmin',
  components: {
    'b-button': BButton,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-table': BTable
  },
  data: function () {
    return {
      mode: 'save',
      category: {},
      categories: [],
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'path', label: 'Caminho', sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
  methods: {
    alterarCategory () {
      this.$api
        .mutate({
          mutation: gql`
            mutation(
              $idFiltro: Int
              $name: String
            ) {
              alterarCategory(
                filtro: { id: $idFiltro }
                dados: {
                  name: $name
                }
              ) {
                id
                name
              }
            }
          `,
          variables: {
            idFiltro: this.category.id,
            name: this.category.name
          }
        })
        .then(resultado => {
          this.dados = resultado.data.alterarCategory
          this.category = {}
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    loadCategory (category, mode = 'save') {
      this.mode = mode
      this.category = { id: category.id, name: category.name }
    },
    obterCategories () {
      this.$api
        .query({
          query: gql`
            query {
              categories {
                id
                name
              }
            }
          `,
          fetchPolicy: 'network-only'
        })
        .then(resultado => {
          this.categories = resultado.data.categories
        })
        .catch(e => {
          this.categories = []
        })
    },
    registrar () {
      this.$api
        .mutate({
          mutation: gql`
            mutation(
              $name: String!
              $parentId: Int
            ) {
              novoCategory(
                dados: {
                  name: $name
                  parentId: $parentId
                }
              ) {
                id
                name
                parentId
              }
            }
          `,
          variables: {
            name: this.category.name,
            parentId: this.category.parentId
          }
        })
        .then(resultado => {
          this.$toasted.global.defaultSuccess()
          this.category = {}
          this.reset()
        })
        .catch(showError)
    },
    remove () {
      this.$api
        .mutate({
          mutation: gql`
            mutation($id: Int) {
              excluirCategory(filtro: { id: $id }) {
                id
                name
              }
            }
          `,
          variables: {
            id: this.category.id
          }
        })
        .then(resultado => {
          this.dados = resultado.data.excluirCategory
          this.$toasted.global.defaultSuccess()
          this.filtro = {}
          this.reset()
        })
        .catch(showError)
    },
    reset () {
      this.mode = 'save'
      this.category = {}
      this.obterCategories()
    },
    save () {
      this.category.id ? this.alterarCategory() : this.registrar()
    }
  },
  mounted () {
    this.obterCategories()
  }
}

</script>

<style>
</style>
