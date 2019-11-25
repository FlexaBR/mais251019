<template>
  <div class="admin-auth">
    <base-page-title icon="fa fa-cogs" main="Administração de Autenticação" sub="Registro & Cia" />
    <div class="admin-auth-tabs">
      <v-layout column mx-8>
        <v-flex>
          <UsuarioLogado />
        </v-flex>
        <v-flex>
          <v-tabs centered icons-and-text>
            <v-tabs-slider color="white"></v-tabs-slider>

            <v-tab>
              Autenticação
              <v-icon>mdi-fingerprint</v-icon>
            </v-tab>

            <v-tab>
              Usuários
              <v-icon>mdi-account-multiple</v-icon>
            </v-tab>

            <v-tab>
              Perfis
              <v-icon>mdi-account-check</v-icon>
            </v-tab>

            <v-tab-item>
              <AutenticacaoAbas />
            </v-tab-item>

            <v-tab-item>
              <UsuarioAbas />
            </v-tab-item>

            <v-tab-item>
              <PerfilAbas />
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import AutenticacaoAbas from './autenticacao/Abas'
import UsuarioAbas from './usuario/Abas'
import UsuarioLogado from './autenticacao/UsuarioLogado'
import PerfilAbas from './perfil/Abas'

export default {
  name: 'AdminAuth',
  components: {
    AutenticacaoAbas,
    UsuarioLogado,
    UsuarioAbas,
    PerfilAbas
  }
}
</script>

<style>
</style>
