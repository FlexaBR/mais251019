<template>
  <v-alert
    color='cyan'
    dark
    dense
    tile
    height="68"
  >
    <v-container>
      <v-row
        align="center"
        justify="center"
        class="mt-n4"
      >
        <v-col class="grow hidden-sm-and-down">
          <h2 class="subtitle-1 font-weight-light">
            Facilite suas consultas, orçamentos e pedidos.
          </h2>
        </v-col>
        <v-col class="shrink">
          <v-btn
            outlined
            to="/register"
          >
            APP+Rep
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-alert>
</template>
