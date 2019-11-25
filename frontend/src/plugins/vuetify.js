import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const theme = {
  vermelho: '#E91E63',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
  caribe: '#22f2ff',
  vinho: '#3B125F',
  telha: '#ef9173',
  laranja: '#EF6C00',
  amber: '#FFA000',
  cyan: '#0097A7',
  tertiary: '#495057',

  primary2: '#FF8040',
  secondary2: '#424242',
  accent2: '#82B1FF',
  error: '#FF5252',
  info2: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      dark: theme,
      light: theme
    }
  }
})
