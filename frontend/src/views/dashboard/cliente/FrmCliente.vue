<template>
  <v-container id="frmCliente" fluid tag="section">
    <v-row>
      <v-col cols="12" md="6">
        <base-material-card color="success" icon="mdi-account-card-details-outline" title="Cadastro Cliente" class="px-5 py-6">
          <v-form class="mt-5">
            <v-text-field label="Email Address" />

            <v-text-field type="password" label="Password" class="pt-0" />
            <v-checkbox label="Subscribe to newsletter" class="mt-0" />
          </v-form>

          <v-card-actions class="pl-0">
            <v-btn color="success" min-width="100">Submit</v-btn>
          </v-card-actions>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FrmCliente',
  computed: {
    ...mapGetters(['usuario'])
  }
}
</script>
