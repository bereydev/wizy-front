import { UserModule } from '~/types'
import Multiselect from '@vueform/multiselect'

export const install: UserModule = ({ app, router, isClient }) => {
  app.component('multiselect', Multiselect)
}