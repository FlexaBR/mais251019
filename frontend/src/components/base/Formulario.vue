<template>
  <v-card class="pa-3">
    <div class="d-flex grow flex-wrap">
      <v-sheet
        :color="color"
        :max-height="icon ? 90 : undefined"
        :width="icon ? 'auto' : '100%'"
        class="text-start mb-6 pa-7"
        dark
      >
        <slot v-if="$slots.image" name="image" />

        <div v-else-if="title && !icon" class="display-1 font-weight-light" v-text="title" />

        <v-icon v-else-if="icon" size="32" v-text="icon" />

        <div v-if="text" class="headline font-weight-thin" v-text="text" />
      </v-sheet>

      <slot />
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'BaseFormulario',
  props: {
    color: {
      type: String,
      default: 'success'
    },
    icon: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
