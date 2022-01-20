import { UserModule } from '~/types'
import Multiselect from '@vueform/multiselect'

export const install: UserModule = ({ app }) => {
  app.component('multiselect', Multiselect)
}