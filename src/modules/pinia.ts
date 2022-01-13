import { createPinia } from 'pinia'
import type { UserModule } from '~/types'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia()
  app.use(pinia)
  watch(
    pinia.state,
    (state) => {
      // persist the whole state to the local storage whenever it changes
      localStorage.setItem('wizyState', JSON.stringify(state))
    },
    { deep: true }
  )
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient)
    pinia.state.value = JSON.parse(localStorage.getItem('wizyState')) || {};

  else
    initialState.pinia = pinia.state.value
}
