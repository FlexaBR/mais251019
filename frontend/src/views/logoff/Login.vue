<template>
  <v-container
    id="login"
    tag="section"
    fluid
    class="cyan fill-height"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <v-card
          color="success"
          light
          max-width="100%"
          width="360"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-light">
                Entrar
              </h1>
            </div>
          </template>
          <div v-if="erros">
            <erros :erros="erros" />
          </div>

          <v-card-text class="text-center">
            <v-text-field
              v-model="usuario.email"
              color="secondary"
              class="mt-6"
              label="Email..."
              prepend-icon="mdi-email"
            />

            <v-text-field
              v-model="usuario.senha"
              class="mb-8"
              color="secondary"
              label="Senha..."
              prepend-icon="mdi-lock-outline"
              type="password"
            />

            <btn
              large
              color
              depressed
              class="v-btn--text success--text"
              @click="login"
            >
              Entrar
            </btn>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  import Erros from '../../components/comum/Erros'
  import gql from 'graphql-tag'

  export default {
    name: 'Login',
    components: {
      Erros,
      Btn: () => import('../../components/comum/Btn'),
    },
    data () {
      return {
        usuario: {},
        dados: null,
        erros: null,
      }
    },
    computed: {
      perfis () {
        return (
          this.dados &&
          this.dados.perfis &&
          this.dados.perfis.map(p => p.nome).join(',')
        )
      },
    },
    methods: {
      ...mapActions(['setUsuario']),
      login () {
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
                  nome
                }
              }
            }
          `,
            variables: {
              email: this.usuario.email,
              senha: this.usuario.senha,
            },
          })
          .then(resultado => {
            this.dados = resultado.data.login
            this.usuario = {}
            this.erros = null
            this.setUsuario(this.dados)
            this.$router.push(this.$route.query.redirect || '/dashboard')
          })
          .catch(e => {
            this.erros = e
          })
      },
    },
  }
</script>
