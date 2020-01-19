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
      <b-form-group label="Categoria Pai:" label-for="category-parentId">
        <b-form-select v-if="mode === 'save'"
          id="category-parentId"
          :options="categories" v-model="category.parentId" />
        <b-form-input v-else
          id="category-parentId" type="text"
          v-model="category.path"
          readonly />
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
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BTable
} from 'bootstrap-vue'

export default {
  name: 'CategoryAdmin',
  components: {
    'b-button': BButton,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-form-select': BFormSelect,
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
    loadCategories () {
      const url = `${baseApiUrl}/categories`
      axios.get(url).then(res => {
        // this.categories = res.data
        this.categories = res.data.map(category => {
          return { ...category, value: category.id, text: category.path }
        })
      })
    },
    reset () {
      this.mode = 'save'
      this.category = {}
      this.loadCategories()
    },
    save () {
      const method = this.category.id ? 'put' : 'post'
      const id = this.category.id ? `/${this.category.id}` : ''
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    remove () {
      const id = this.category.id
      axios.delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    loadCategory (category, mode = 'save') {
      this.mode = mode
      this.category = { ...category }
    }
  },
  mounted () {
    this.loadCategories()
  }
}

</script>

<style>
</style>
