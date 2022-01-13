import { UserModule } from '~/types'
import VCalendar from 'v-calendar';

export const install: UserModule = ({ app, router, isClient }) => {
      app.use(VCalendar, {})
}