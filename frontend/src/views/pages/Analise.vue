<template>
  <v-container fluid class="bluegrad" tag="section" fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 md4 lg4 xl4>
        <v-slide-y-transition appear>
          <v-card id="fontTitle" class="mx-auto" color="#26c6da" max-width="400">
            <v-card-title>
              <v-icon large left>mdi-clipboard-check-outline</v-icon>
              <span class="font-weight-light">Obrigado pelo registro!</span>
            </v-card-title>

            <v-card-text
              class="title font-weight-thin"
            >"Faremos uma breve análise para adequar seu perfil ao +APP e em seguida lhe enviaremos um e-mail com todas as instruções de acesso e uso."</v-card-text>
          </v-card>
        </v-slide-y-transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Analise',
  components: {},
  data: () => ({
    sections: [
      {
        icon: 'mdi-clipboard-check-outline',
        iconColor: 'primary',
        title: 'Adequação de Perfil',
        text: `Faremos uma breve análise para adequar seu perfil ao +APP e em seguida lhe enviaremos um e-mail com todas as instruções de acesso e uso.`
      }
    ]
  })
}
</script>

<style lang="sass">

  #fontTitle
    .v-card__title
      color: white
      font-size: 26px
</style>
