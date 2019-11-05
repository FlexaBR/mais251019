<template>
  <div v-if="usuario">
    <v-navigation-drawer
      id="template-menu"
      v-model="menu"
      :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
      :expand-on-hover="expandOnHover"
      :right="$vuetify.rtl"
      :src="barImage"
      mobile-break-point="960"
      app
      width="260"
      v-bind="$attrs"
    >
      <template v-slot:img="props">
        <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
      </template>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-uppercase font-weight-regular display-2">
            <span class="logo-mini">MaisRep</span>
            <span class="logo-normal">=Rep</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-1" />

      <v-divider class="mb-2" />

      <v-list expand nav>
        <!-- Style cascading bug  -->
        <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
        <div />

        <!-- Style cascading bug  -->
        <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
        <div />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
// Utilities
import { mapState } from 'vuex'

export default {
  name: 'TemplateMenu',

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
        to: '/'
      },
      {
        group: '/pages',
        icon: 'mdi-image',
        title: 'pages',
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
        group: '/components',
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
          }
        ]
      }
    ]
  }),

  computed: {
    ...mapState(['barColor', 'barImage', 'usuario']),
    menu: {
      get () {
        return this.$store.state.menu
      },
      set (val) {
        this.$store.commit('setMenu', val)
      }
    },
    computedItems () {
      return this.items.map(this.mapItem)
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
        children: item.children ? item.children.map(this.mapItem) : undefined
      }
    }
  }
}
</script>
