<template>
  <v-navigation-drawer
    id="dashboard-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :src="require('@/assets/dashboard/Dual.jpg')"
    mobile-break-point="960"
    app
    width="240"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="font-weight-light">
          <span v-if="expandOnHover" class="title font-weight-light">+Rep</span>
          <span v-else class="headline font-weight-light">MaisRep</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <base-item-group :item="profile" />
    </v-list>

    <v-divider class="mb-2" />
    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState, mapGetters, mapMutations } from 'vuex'

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
        title: 'Dashboard',
        to: '/dashboard'
      },
      {
        group: '',
        icon: 'fa fa-cogs',
        title: 'Admin',
        children: [
          {
            title: 'Adm Auth',
            to: 'dashboard/admin/adminAuth'
          },
          {
            title: 'Adm Pages',
            to: 'dashboard/admin/adminPages'
          }
        ]
      },
      {
        group: '',
        icon: 'mdi-account-card-details-outline',
        title: 'Cliente',
        children: [
          {
            title: 'Cadastro',
            to: 'dashboard/cliente/cadastro'
          }
        ]
      }
    ]
  }),

  computed: {
    ...mapState(['barColor']),
    ...mapGetters(['usuario']),
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
    profile () {
      return {
        avatar: true,
        group: '',
        title: this.usuario.nome,
        children: [
          {
            href: '',
            title: 'Meu Perfil'
          }
        ]
      }
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
        title: item.title
      }
    },
    ...mapMutations(['setDrawer', 'toggleDrawer'])
  }
}
</script>
