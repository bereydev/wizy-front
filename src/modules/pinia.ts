import { createPinia } from 'pinia'
import type { UserModule } from '~/types'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia()
  app.use(pinia)
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient) {
    watch(
      pinia.state,
      (state) => {
        // persist the whole state to the local storage whenever it changes
        localStorage.setItem('wizy-state', JSON.stringify(state))
      },
      { deep: true }
    )
    const storedState = localStorage.getItem('wizy-state')
    pinia.state.value = storedState == null ? {}: JSON.parse(storedState);
  }
  else
    initialState.pinia = pinia.state.value
}
