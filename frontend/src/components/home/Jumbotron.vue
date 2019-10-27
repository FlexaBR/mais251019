<template>
  <v-sheet
    :height="$vuetify.breakpoint.smAndUp ? '62vh' : '78vh'"
    color="white"
    tile
  >
    <v-img
      :class="{
        'v-image--sm': this.$vuetify.breakpoint.smAndDown,
        'v-image--md': this.$vuetify.breakpoint.mdAndDown
      }"
      src="@/assets/home/index_1.jpg"
      gradient="to top, rgba(0, 0, 0, .0), rgba(0, 0, 0, .4)"
      height="100%"
    >
      <v-container
        class="fill-height white--text"
      >
        <v-slide-x-transition appear>
          <v-col
            align="center"
            justify="center"
          >
            <h1
              :class="$vuetify.breakpoint.smAndUp ? 'display-3' : 'display-1 font-weight-light'"
              class="mb-2"
            >
              Bom é Comprar Certo e Vender Tudo
            </h1>
            <div :class="$vuetify.breakpoint.smAndUp ? 'title font-weight-light' : 'title font-weight-thin'">
              Mais Representações a melhor assessoria para as compras de sua loja no Rio Grande do Sul.
            </div>
          </v-col>
        </v-slide-x-transition>
      </v-container>
    </v-img>
  </v-sheet>
</template>

<script>
  export default {
  }
</script>
