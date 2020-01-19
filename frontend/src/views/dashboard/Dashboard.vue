<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12"></v-col>
      <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento" />
        <div class="stats">
          <Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color="#d54d50" />
          <Stat title="Artigos" :value="stat.articles" icon="fa fa-file" color="#3bc480" />
          <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd" />
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
  name: 'Dashboard',
  components: {
    Stat: () => import('./Stat'),
    PageTitle: () => import('../../components/base/PageTitle')
  },
  data: function () {
    return {
      stat: {}
    }
  },
  methods: {
    getStats () {
      // eslint-disable-next-line no-return-assign
      axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
    }
  },
  mounted () {
    this.getStats()
  }
}
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
