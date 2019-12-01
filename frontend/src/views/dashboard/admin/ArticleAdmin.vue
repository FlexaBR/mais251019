<template>
  <div class="article-admin">
    <b-form class="mt-3">
      <input id="article-id" type="hidden" v-model="article.id" />
      <b-form-group label="Nome:" label-for="article-name" label-size="sm">
        <b-form-input
          id="article-name"
          type="text"
          v-model="article.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o Nome do Artigo..."
          size="sm"
          class="mb-5"
        />
      </b-form-group>
      <b-form-group
        v-if="mode === 'save'"
        label="Categoria-Pai:"
        label-for="article-parentId">
          <b-form-select id="article-parentId"
            :readonly="mode === 'remove'"
            :options="categories"
            v-model="article.parentId" />
      </b-form-group>
      <b-form-group label="Conteúdo" label-for="article-content">
        <VueEditor v-model="article.content" placeholder="Informe o conteúdo do artigo" />
      </b-form-group>
      <b-button v-if="mode === 'save'" variant="primary" @click="save" class="mt-5">Salvar</b-button>
      <b-button v-if="mode === 'remove'" variant="danger" @click="remove" class="mt-5">Excluir</b-button>
      <b-button class="ml-2 mt-5" @click="reset">Cancelar</b-button>
    </b-form>

    <b-table table-class="small" hover striped :items="articles" :fields="fields" class="mt-5" small>
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
import { VueEditor } from 'vue2-editor'
import { showError } from '@/global'
import gql from 'graphql-tag'
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BTable
} from 'bootstrap-vue'

export default {
  name: 'ArticleAdmin',
  components: {
    'b-button': BButton,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-form-select': BFormSelect,
    'b-table': BTable,
    VueEditor
  },
  data: function () {
    return {
      mode: 'save',
      article: {},
      articles: [],
      categories: [],
      usuarios: [],
      page: 1,
      limit: 0,
      count: 0,
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
