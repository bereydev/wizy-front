import { UserModule } from '~/types'
import vSelect from 'vue-select'

export const install: UserModule = ({ app, router, isClient }) => {
  app.component('v-select', vSelect)
}