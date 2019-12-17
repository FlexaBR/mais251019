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
      <b-form-group label="Descrição" label-for="article-description">
        <b-form-input
          id="article-description"
          type="text"
          v-model="article.description"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe a Descrição do Artigo..."
          size="sm"
        />
      </b-form-group>
      <b-form-group v-if="mode === 'save'"
        label="Conteúdo" label-for="article-content">
        <VueEditor v-model="article.content"
          placeholder="Informe o Conteúdo do Artigo..." />
      </b-form-group>
      <b-button variant="primary" v-if="mode === 'save'" @click="save" class="mt-5">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove" class="mt-5">Excluir</b-button>
      <b-button class="ml-2 mt-5" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
    <b-table
      hover
      striped
      :items="articles"
      :fields="fields"
      class="mt-5"
      small
      table-class="small"
    >
      <template slot="actions" slot-scope="data">
        <b-button size="sm" variant="warning" @click="loadArticle(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button size="sm" variant="danger" @click="loadArticle(data.item, 'remove')">
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
  BTable
} from 'bootstrap-vue'

export default {
  name: 'ArticleAdmin',
  components: {
    'b-button': BButton,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-table': BTable,
    VueEditor
  },
  data: function () {
    return {
      mode: 'save',
      article: {},
      articles: [],
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'description', label: 'Descrição', sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
  methods: {
    obterArticles () {
      this.$api
        .query({
          query: gql`
            query {
              articles {
                id
                name
                description
              }
            }
          `,
          fetchPolicy: 'network-only'
        })
        .then(resultado => {
          this.articles = resultado.data.articles
        })
        .catch(e => {
          this.articles = []
        })
    },
    reset () {
      this.mode = 'save'
      this.article = {}
      this.obterArticles()
    },
    save () {
      this.article.id ? this.alterarArticle() : this.registrar()
    },
    alterarArticle () {
      this.$api
        .mutate({
          mutation: gql`
            mutation(
              $idFiltro: Int
              $name: String
            ) {
              alterarArticle(
                filtro: { id: $idFiltro }
                dados: {
                  name: $name
                  description: $description
                }
              ) {
                id
                name
                description
              }
            }
          `,
          variables: {
            idFiltro: this.article.id,
            name: this.article.name,
            description: this.article.description
          }
        })
        .then(resultado => {
          this.dados = resultado.data.alterarArticle
          this.article = {}
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    registrar () {
      this.$api
        .mutate({
          mutation: gql`
            mutation(
              $name: String!
              $description: String!
            ) {
              novoArticle(
                dados: {
                  name: $name
                  description: $description
                }
              ) {
                id
                name
                description
              }
            }
          `,
          variables: {
            name: this.article.name,
            description: this.article.description
          }
        })
        .then(resultado => {
          this.$toasted.global.defaultSuccess()
          this.article = {}
          this.reset()
        })
        .catch(showError)
    },
    remove () {
      this.$api
        .mutate({
          mutation: gql`
            mutation($id: Int) {
              excluirArticle(filtro: { id: $id }) {
                id
                name
              }
            }
          `,
          variables: {
            id: this.article.id
          }
        })
        .then(resultado => {
          this.dados = resultado.data.excluirArticle
          this.$toasted.global.defaultSuccess()
          this.filtro = {}
          this.reset()
        })
        .catch(showError)
    },
    loadArticle (article, mode = 'save') {
      this.mode = mode
      this.article = { ...article }
    }
  },
  watch: {
    page () {
      this.obterArticles()
    }
  },
  mounted () {
    this.obterArticles()
  }
}
</script>

<style>
</style>
