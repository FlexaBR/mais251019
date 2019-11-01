<template>
   <v-container
    id="login"
    fluid
    tag="section"
    class="cyan fill-height"
  >
    <v-row
      justify="center"
      class="mt-12"
    >
      <v-col>
        <v-slide-y-transition appear>
          <v-card
            class="pa-3 pa-md-5 mx-12"
            light
          >
            <heading class="text-center display-3">
              Entrar
            </heading>
            <div v-if="erros">
              <erros :erros="erros" />
            </div>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <div class="text-center">

                  <v-text-field
                    v-model="usuario.email"
                    color="secondary"
                    label="Email..."
                    prepend-icon="mdi-email"
                  />

                  <v-text-field
                    v-model="usuario.senha"
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
                  />

                  <btn
                    color="success"
                    @click="login"
                  >
                    Entrar
                  </btn>
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
import { mapActions } from 'vuex'
import Erros from '../../components/comum/Erros'
import gql from 'graphql-tag'

export default {
  name: 'Login',
  components: {
    Erros,
    Btn: () => import('../../components/base/Btn'),
    Heading: () => import('../../components/comum/Heading')
  },
  data () {
    return {
      usuario: {},
      dados: null,
      erros: null
    }
  },
  computed: {
    perfis () {
      return (
        this.dados &&
        this.dados.perfis &&
        this.dados.perfis.map(p => p.nome).join(',')
      )
    }
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
            senha: this.usuario.senha
          }
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
    }
  }
}
</script>
