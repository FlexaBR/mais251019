<template>
    <div class="user-admin">
        <b-table hover striped :items="usuarios" :fields="fields"></b-table>
    </div>
</template>

<script>
export default {
  name: 'UserAdmin',
  data: function () {
    return {
      mode: 'save',
      usuario: {},
      usuarios: [],
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'email', label: 'E-mail', sortable: true },
        { key: 'admin',
          label: 'Administrador',
          sortable: true,
          formatter: value => value ? 'Sim' : 'Não' },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style>

</style>
