<template>
  <v-img
    class="login"
    :src="require('@/assets/budd9.jpg')"
    gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .1)"
    min-height="100%"
    max-height="600px"
  >
    <v-container id="login" tag="section" :class="[$vuetify.breakpoint.smAndUp ? 'mt-12' : 'mt-6']">
      <v-layout justify-center align-center :class="[$vuetify.breakpoint.smAndUp ? 'mt-12' : 'mt-6']">
        <v-flex xs12 sm6 md4 lg3 xl3 :class="[$vuetify.breakpoint.smAndUp ? 'mt-12' : 'mt-6']">
          <v-card class="elevation-12" light :class="[$vuetify.breakpoint.smAndUp ? 'mt-12' : 'mt-3']">
            <v-toolbar color="cyan" dark>
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
                  v-model="usuario.email"
                  color="black"
                ></v-text-field>
                <v-text-field
                  name="password"
                  label="Senha..."
                  type="password"
                  v-model="usuario.senha"
                  prepend-icon="mdi-lock-outline"
                ></v-text-field>
              </v-form>
              <v-btn block depressed @click="login" color="cyan" dark>Entrar</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
import { mapActions } from "vuex";
import Erros from "../../components/comum/Erros";
import gql from "graphql-tag";

export default {
  name: "Login",
  components: {
    Erros
  },
  data() {
    return {
      usuario: {},
      dados: null,
      erros: null,
      isLoading: false
    };
  },
  computed: {
    perfis() {
      return (
        this.dados &&
        this.dados.perfis &&
        this.dados.perfis.map(p => p.nome).join(",")
      );
    }
  },
  methods: {
    ...mapActions(["setUsuario"]),
    login() {
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
          this.dados = resultado.data.login;
          this.usuario = {};
          this.erros = null;
          this.setUsuario(this.dados);
          this.$router.push(this.$route.query.redirect || "/dashboard");
        })
        .catch(e => {
          this.erros = e;
        });
    }
  }
};
</script>
