import type { UserModule } from '~/types'
import { VuesticPlugin } from 'vuestic-ui'

export const install: UserModule = ({ app, router, isClient }) => {
    app.use(VuesticPlugin)
}