<template>
  <v-container fluid class="bluegrad" tag="section" style="min-height: 100%;">
    <v-row justify="center" class="mt-12">
      <v-col cols="10" class="mt-12">
        <v-slide-y-transition appear>
          <v-card class="pa-3 pa-md-5 mx-auto" light>
            <base-heading class="text-center display-3">Registro</base-heading>
            <div v-if="erros">
              <erros :erros="erros" />
            </div>

            <v-row>
              <v-col cols="12" md="6">
                <v-row no-gutters>
                  <v-col v-for="(section, i) in sections" :key="i" cols="12">
                    <v-list-item three-line>
                      <v-list-item-icon class="mr-4 mt-5 mt-md-4">
                        <v-icon
                          :large="$vuetify.breakpoint.mdAndUp"
                          :color="section.iconColor"
                          v-text="section.icon"
                        />
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          class="font-weight-light mb-4 mt-3"
                          v-text="section.title"
                        />

                        <v-list-item-subtitle v-text="section.text" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" md="6">
                <div class="text-center">
                  <v-text-field
                    name="name"
                    type="text"
                    :error-messages="nameErrors"
                    :success="!$v.usuario.nome.$invalid"
                    v-model.trim="$v.usuario.nome.$model"
                    color="secondary"
                    label="Nome..."
                    prepend-icon="mdi-face"
                  />
                  <!-- v-model.trim remove os espaços do inicio e do fim da string-->
                  <!-- $v estancia vuelidate-->
                  <v-select
                    name="atividade"
                    dense
                    v-model="usuario.atividade"
                    color="secondary"
                    label="Sou..."
                    prepend-icon="mdi-help-box"
                    :items="items"
                    :error-messages="atividadeErrors"
                    :success="!$v.usuario.atividade.$invalid"
                  />
                  <v-text-field
                    name="email"
                    type="email"
                    :error-messages="emailErrors"
                    :success="!$v.usuario.email.$invalid"
                    v-model.trim="$v.usuario.email.$model"
                    color="secondary"
                    label="Email..."
                    prepend-icon="mdi-email"
                  />
                  <v-text-field
                    name="password"
                    :error-messages="passwordErrors"
                    :success="!$v.usuario.senha.$invalid"
                    v-model.trim="$v.usuario.senha.$model"
                    color="secondary"
                    label="Senha..."
                    prepend-icon="mdi-lock-outline"
                    type="password"
                  />
                  <v-text-field
                    name="confirmPassword"
                    color="secondary"
                    label="Confirme a senha..."
                    prepend-icon="mdi-lock-outline"
                    type="password"
                    :error-messages="confirmPasswordErrors"
                    :success="!$v.usuario.confirmPassword.$invalid"
                    v-model.trim="$v.usuario.confirmPassword.$model"
                   />
                  <base-btn color="#1e469a" dark @click="registrar" :disabled="$v.$invalid">Registrar</base-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Erros from '../../components/comum/Erros'
import gql from 'graphql-tag'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Register',

  components: {
    Erros
  },
  data: () => ({
    usuario: {
      nome: '',
      email: '',
      atividade: '',
      senha: '',
      confirmPassword: ''
    },
    erros: null,
    sections: [
      {
        icon: 'mdi-briefcase-search-outline',
        iconColor: 'success',
        title: 'Pesquisa de Produtos',
        text: `Consulte produtos e preços.`
      },
      {
        icon: 'mdi-clipboard-check-outline',
        iconColor: 'primary',
        title: 'Orçamentos e Pedidos',
        text: `Monte e avalie rapidamente orçamentos e pedidos.`
      },
      {
        icon: 'mdi-calendar-check',
        iconColor: 'vinho',
        title: 'Programação de Pedido',
        text: 'Estime uma data para novos pedidos que lembramos você.'
      }
    ],
    items: ['Logista', 'Representante']
  }),
  validations () {
    const validations = {
      usuario: {
        nome: {
          required,
          minLength: minLength(6)
        },
        email: {
          required,
          email
        },
        senha: {
          required,
          minLength: minLength(4)
        },
        confirmPassword: {
          required,
          minLength: minLength(4),
          sameAs: sameAs('senha')
        },
        atividade: {
          required
        }
      }
    }
    return validations
  },
  computed: {
    nameErrors () {
      const errors = []
      const name = this.$v.usuario.nome
      if (!name.$dirty) { return errors }
      !name.required && errors.push('Nome é obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)
      return errors
    },
    emailErrors () {
      const errors = []
      const email = this.$v.usuario.email
      if (!email.$dirty) { return errors }
      !email.required && errors.push('Email é obrigatório!')
      !email.email && errors.push('Insira um email válido!')
      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.usuario.senha
      if (!password.$dirty) { return errors }
      !password.required && errors.push('Senha é obrigatória!')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres!`)
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      const confirmPassword = this.$v.usuario.confirmPassword
      if (!confirmPassword.$dirty) { return errors }
      !confirmPassword.required && errors.push('Repita a senha!')
      !confirmPassword.minLength && errors.push(`Insira pelo menos ${confirmPassword.$params.minLength.min} caracteres!`)
      !confirmPassword.sameAs && errors.push('Senha deve ser identica!')
      return errors
    },
    atividadeErrors () {
      const errors = []
      const atividade = this.$v.usuario.atividade
      if (!atividade.$dirty) { return errors }
      !atividade.required && errors.push('Atividade é obrigatória!')
      return errors
    }
  },
  methods: {
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
          this.usuario = {}
          this.erros = null
          this.$router.push(this.$route.query.redirect || '/analise')
        })
        .catch(e => {
          this.erros = e
        })
    }
  }
}
</script>
