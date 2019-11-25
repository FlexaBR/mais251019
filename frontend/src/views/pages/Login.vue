<template>
  <v-img
    :src="require('@/assets/budd9.jpg')"
    gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .1)"
    min-height="100%"
    max-height="600px"
  >
    <v-container id="login" tag="section" :class="[$vuetify.breakpoint.smAndUp ? 'mt-12' : 'mt-9']">
      <v-layout justify-center align-center :class="[$vuetify.breakpoint.smAndUp ? 'mt-12' : 'mt-6']">
        <v-flex xs9 sm5 md4 lg3 xl3 :class="[$vuetify.breakpoint.smAndUp ? 'mt-12' : 'mt-6']">
          <v-card class="elevation-12" light :class="[$vuetify.breakpoint.smAndUp ? 'mt-12' : 'mt-6']">
            <v-toolbar class="bluegrad" dark>
              <v-toolbar-title>Entrar</v-toolbar-title>
              <v-spacer></v-spacer>
              <div v-if="erros">
                <Erros :erros="erros" />
              </div>
              <v-progress-circular v-show="isLoading" indeterminate color="white" width="2"></v-progress-circular>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-email"
                  name="email"
                  label="Email..."
                  type="email"
                  :error-messages="emailErrors"
                  :success="!$v.usuario.email.$invalid"
                  v-model.trim="$v.usuario.email.$model"
                  color="black"
                ></v-text-field>
                <v-text-field
                  name="password"
                  :error-messages="passwordErrors"
                  :success="!$v.usuario.senha.$invalid"
                  v-model.trim="$v.usuario.senha.$model"
                  label="Senha..."
                  type="password"
                  prepend-icon="mdi-lock-outline"
                ></v-text-field>
              </v-form>
              <v-btn block depressed @click="login" color="#1e469a" dark>Entrar</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
import { mapActions } from 'vuex'
import Erros from '../../components/comum/Erros'
import gql from 'graphql-tag'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  components: {
    Erros
  },
  data () {
    return {
      usuario: {
        email: '',
        senha: ''
      },
      dados: null,
      erros: null,
      isLoading: false
    }
  },
  validations () {
    const validations = {
      usuario: {
        email: {
          required,
          email
        },
        senha: {
          required,
          minLength: minLength(4)
        }
      }
    }
    return validations
  },
  computed: {
    perfis () {
      return (
        this.dados &&
        this.dados.perfis &&
        this.dados.perfis.map(p => p.nomep).join(',')
      )
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
    }
  },
  methods: {
    ...mapActions(['setUsuario']),
    login () {
      this.isLoading = true
      this.$api
        .query({
          query: gql`
            query($email: String!, $senha: String!) {
              login(dados: { email: $email, senha: $senha }) {
                id
                nome
                email
                token
                perfis {
                  nomep
                }
              }
            }
          `,
          variables: {
            email: this.usuario.email,
            senha: this.usuario.senha
          }
        })
        .then(resultado => {
          this.dados = resultado.data.login
          this.usuario = {}
          this.erros = null
          this.setUsuario(this.dados)
          this.isLoading = false
          this.$router.push(this.$route.query.redirect || '/dashboard')
        })
        .catch(e => {
          this.erros = e
        })
    }
  }
}
</script>
