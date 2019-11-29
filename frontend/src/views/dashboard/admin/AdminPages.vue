<template>
  <div class="admin-pages">
    <base-page-title icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros & Cia" />
    <div class="admin-pages-tabs">
      <b-card no-body class="mt-5">
        <b-tabs card small class="mt-n2">
          <b-tab title="Artigos" active>
            <ArticleAdmin />
          </b-tab>
          <b-tab title="Categorias">
            <CategoryAdmin />
          </b-tab>
          <b-tab title="Usuários">
            <UserAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import { BCard, BTabs, BTab } from 'bootstrap-vue'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'

export default {
  name: 'AdminPages',
  components: { ArticleAdmin, CategoryAdmin, UserAdmin, 'b-card': BCard, 'b-tab': BTab, 'b-tabs': BTabs }
}
</script>

<style>
</style>
