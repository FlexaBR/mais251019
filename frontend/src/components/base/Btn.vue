<script>
import { VBtn } from 'vuetify/lib'

export default {
  name: 'BaseBtn',

  extends: VBtn,

  props: {
    color: {
      type: String,
      default: 'success'
    },
    depressed: {
      type: Boolean,
      default: false
    },
    default: {
      type: Boolean,
      default: true
    },
    rounded: {
      type: Boolean,
      default: true
    }
  }
}
</script>
