<template>
  <div :class="[themeClasses]" class="v-testimonial">
    <v-row class="mb-4">
      <v-col class="hidden-sm-and-down shrink">
        <v-icon color="vermelho" x-large>mdi-format-quote-open</v-icon>
      </v-col>
      <v-col class="v-testimonial__blurb body-1" cols="12" md="10" v-text="testimonial.blurb" />
    </v-row>

    <footer class="text-right">
      <v-divider class="vermelho ml-auto mb-3 v-testimonial__divider" />
      <h4 class="headline font-weight-medium" v-text="testimonial.person" />
      <div class="font-weight-light grey--text text--darken-1" v-text="testimonial.title" />
    </footer>
  </div>
</template>

<script>
// Mixins
import Themeable from 'vuetify/lib/mixins/themeable'

export default {
  mixins: [Themeable],

  props: {
    testimonial: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="sass">
  .v-testimonial
    margin: 0 auto
    max-width: 450px

    .v-testimonial__divider
      max-width: 120px
      border-width: 2px

    .v-testimonial__blurb
      line-height: 2

    &.theme--dark
      color: black
</style>
