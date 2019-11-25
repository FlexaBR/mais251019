<template>
  <div class="admin-pages">
    <base-page-title icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros & Cia" />
    <div class="admin-pages-tabs ml-2 mr-2">
      <v-tabs class="elevation-2 mt-5" background-color="#e6e1e1">
        <v-tabs-slider color="blue"></v-tabs-slider>
        <v-tab active-class style="font-size: 14px;">Artigos</v-tab>
        <v-tab style="font-size: 14px;">Categorias</v-tab>
        <v-tab style="font-size: 14px;">Usuários</v-tab>
        <v-tab-item>
          <ArticleAdmin />
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <CategoryAdmin />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <UserAdmin />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'

export default {
  name: 'AdminPages',
  components: { ArticleAdmin, CategoryAdmin, UserAdmin }
}
</script>

<style>
</style>
