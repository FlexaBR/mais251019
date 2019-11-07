<template>
  <v-container fluid class="bluegrad" tag="section">
    <v-row justify="center" class="mt-12">
      <v-col cols="10" class="mt-12">
        <v-slide-y-transition appear>
          <v-card class="pa-3 pa-md-5 mx-auto" light>
            <heading class="text-center display-3">Registro</heading>
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
                    v-model="usuario.nome"
                    color="secondary"
                    label="Nome..."
                    prepend-icon="mdi-face"
                  />
                  <v-select
                    dense
                    v-model="usuario.atividade"
                    color="secondary"
                    label="Sou..."
                    prepend-icon="mdi-help-box"
                    :items="items"
                  />
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
                  <base-btn color="#1e469a" dark @click="registrar">Registrar</base-btn>
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

export default {
  name: 'Register',

  components: {
    Erros,
    Heading: () => import('../../components/comum/Heading')
  },
  data: () => ({
    usuario: {},
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
    items: ['Logista', 'Preposto ou Representante']
  }),
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
                  nome
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
