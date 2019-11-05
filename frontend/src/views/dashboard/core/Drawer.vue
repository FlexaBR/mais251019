<template>
  <v-navigation-drawer
    id="dashboard-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
  >
    <v-row class="ma-0 pa-3 flex-no-wrap">
      <v-btn aria-label="Close" icon @click="toggleDrawer">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-divider />
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
        <v-list-item-title v-text="item.text" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DashboardDrawer',

  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    items: [
      {
        icon: 'mdi-view-dashboard',
        title: 'dashboard',
        to: '/dashboard'
      },
      {
        group: '/admin',
        icon: 'mdi-image',
        title: 'admin',
        children: [
          {
            title: 'pricing',
            to: 'pricing'
          },
          {
            title: 'rtl',
            to: 'rtl'
          }
        ]
      },
      {
        group: '/fabricas',
        icon: 'mdi-view-comfy',
        title: 'components',
        children: [
          {
            title: 'multi',
            group: '',
            children: [
              {
                title: 'example',
                href: '#'
              }
            ]
          },
          {
            title: 'buttons',
            to: 'buttons'
          },
          {
            title: 'grid',
            to: 'grid-system'
          }
        ]
      },
      {
        group: '/forms',
        icon: 'mdi-clipboard-outline',
        title: 'forms',
        children: [
          {
            title: 'rforms',
            to: 'regular'
          },
          {
            title: 'eforms',
            to: 'extended'
          }
        ]
      }
    ]
  }),

  computed: {
    ...mapState(['barColor', 'barImage']),
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('SET_DRAWER', val)
      }
    },
    computedItems () {
      return this.items.map(this.mapItem)
    },
    inputValue: {
      get () {
        return this.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    }
  },

  watch: {
    '$vuetify.breakpoint.smAndDown' (val) {
      this.$emit('update:expandOnHover', !val)
    }
  },

  methods: {
    mapItem (item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title)
      }
    },
    ...mapMutations(['setDrawer', 'toggleDrawer'])
  }
}
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #dashboard-drawer
    &.v-navigation-drawer--mini-variant
      .v-list-item
        justify-content: flex-start !important

      .v-list-group--sub-group
        display: block !important

    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
