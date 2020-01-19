import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App.vue'

import store from './store'
import router from './router'

import './plugins'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// temporarário
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlJpY2FyZG8iLCJlbWFpbCI6InJpY2FyZG9AZW1haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU3ODc3MzE3MCwiZXhwIjoxNTc5MDMyMzcwfQ.9GCnUWwDJmQQu5f9HK2-gUJ134QE68UNAuP0J5tknKE'

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
