<template>
  <div class="user-admin">
    <b-form class="mt-3">
      <input id="user-id" type="hidden" v-model="usuario.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name" label-size="sm" class="mt-n5">
            <b-form-input
              id="user-name"
              type="text"
              v-model="usuario.nome"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome do Usuário..."
              size="sm"
              class="mt-n2"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Atividade:" label-for="user-atividade" label-size="sm" class="mt-n5">
            <b-form-input
              id="user-atividade"
              type="text"
              v-model="usuario.atividade"
              required
              :readonly="mode === 'remove'"
              placeholder="Logista ou Representante"
              size="sm"
              class="mt-n2"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email" label-size="sm" class="mt-n5">
            <b-form-input
              id="user-email"
              type="text"
              v-model="usuario.email"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o E-mail do Usuário..."
              size="sm"
              class="mt-n2"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" v-show="mode === 'save'">
          <b-form-group label="Senha:" label-for="user-password" label-size="sm" class="mt-n5">
            <b-form-input
              id="user-password"
              type="password"
              v-model="usuario.senha"
              required
              placeholder="Informe a Senha do Usuário..."
              size="sm"
              class="mt-n2"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12" class="mt-n3">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>

    <b-table table-class="small" hover striped :items="usuarios" :fields="fields" class="mt-5" small>
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="warning" @click="loadUser(row.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button size="sm" variant="danger" @click="loadUser(row.item, 'remove')">
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
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BTable
} from 'bootstrap-vue'

export default {
  name: 'UserAdmin',
  components: {
    'b-button': BButton,
    'b-col': BCol,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-row': BRow,
    'b-table': BTable
  },
  data: function () {
    return {
      mode: 'save',
      perfis: [],
      usuario: {},
      usuarios: [],
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'nome', label: 'Nome', sortable: true },
        { key: 'email', label: 'E-mail', sortable: true },
        { key: 'atividade', label: 'Atividade', sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
  computed: {
    perfisSelecionados () {
      if (this.usuario.perfis) {
        return this.usuario.perfis.map(id => ({ id }))
      } else {
        return null
      }
    }
  },
  methods: {
    alterarUsuario () {
      this.$api
        .mutate({
          mutation: gql`
            mutation(
              $idFiltro: Int
              $emailFiltro: String
              $nome: String
              $email: String
              $senha: String
              $perfis: [PerfilFiltro]
            ) {
              alterarUsuario(
                filtro: { id: $idFiltro, email: $emailFiltro }
                dados: {
                  nome: $nome
                  email: $email
                  senha: $senha
                  perfis: $perfis
                }
              ) {
                id
                nome
                email
                perfis {
                  nomep
                }
              }
            }
          `,
          variables: {
            idFiltro: this.usuario.id,
            emailFiltro: this.usuario.email,
            nome: this.usuario.nome,
            email: this.usuario.email,
            senha: this.usuario.senha,
            perfis: this.perfisSelecionados
          }
        })
        .then(resultado => {
          this.dados = resultado.data.alterarUsuario
          this.usuario = {}
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    loadUser (usuario, mode = 'save') {
      this.mode = mode
      this.usuario = { ...usuario }
    },
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
        })
        .catch(e => {
          this.usuarios = []
        })
    },
    registrar () {
      this.$api
        .mutate({
          mutation: gql`
            mutation(
              $nome: String!
              $atividade: String!
              $email: String!
              $senha: String!
            ) {
              registrarUsuario(
                dados: {
                  nome: $nome
                  atividade: $atividade
                  email: $email
                  senha: $senha
                }
              ) {
                id
                nome
                atividade
                email
                perfis {
                  nomep
                }
              }
            }
          `,
          variables: {
            nome: this.usuario.nome,
            atividade: this.usuario.atividade,
            email: this.usuario.email,
            senha: this.usuario.senha
          }
        })
        .then(resultado => {
          this.$toasted.global.defaultSuccess()
          this.usuario = {}
          this.reset()
        })
        .catch(showError)
    },
    remove () {
      this.$api
        .mutate({
          mutation: gql`
            mutation($id: Int, $email: String) {
              excluirUsuario(filtro: { id: $id, email: $email }) {
                id
                nome
                email
              }
            }
          `,
          variables: {
            id: this.usuario.id,
            email: this.usuario.email
          }
        })
        .then(resultado => {
          this.dados = resultado.data.excluirUsuario
          this.$toasted.global.defaultSuccess()
          this.filtro = {}
          this.reset()
        })
        .catch(showError)
    },
    reset () {
      this.mode = 'save'
      this.usuario = {}
      this.obterUsuarios()
    },
    save () {
      this.usuario.id ? this.alterarUsuario() : this.registrar()
    }
  },
  mounted () {
    this.obterUsuarios()
  }
}

</script>

<style>
</style>
