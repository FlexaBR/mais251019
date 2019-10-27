<template>
  <v-container id="contato" tag="section">
    <v-card color="rgba(0, 151, 167, 0.9)">
      <v-container class="pa-0">
        <v-row>
          <v-col>
            <h2 class="font-weight-light text-center" :class="[$vuetify.breakpoint.smAndUp ? 'display-1' : 'headline']">Contato</h2>

            <v-list class="transparent">
              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon class="elevation-4" dark>mdi-email-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-title :class="[$vuetify.breakpoint.smAndUp ? 'body-1' : 'body-2']">Email: thais@maisrep.com.br</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon class="elevation-4" dark>mdi-phone</v-icon>
                </v-list-item-avatar>
                <v-list-item-title :class="[$vuetify.breakpoint.smAndUp ? 'body-1' : 'body-2']">Celular: (51) 99621-5710</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Contato"
}
</script>