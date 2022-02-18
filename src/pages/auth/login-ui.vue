<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()
const { login } = userStore

const schema = yup.object({
  username: yup.string().required("Champ obligatoire").email("Votre nom d'utilisateur doit être une addresse e-mail valide"),
  password: yup.string().required("Champ obligatoire").min(8, "Votre mot de passe doit avoir au moins 8 charactères").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
    "Your password should contain at least one letter, one capital letter and a number"
  )
});

const { handleSubmit } = useForm({ validationSchema: schema })

const { value: username, errorMessage: usernameError } = useField('username')
const { value: password, errorMessage: passwordError } = useField('password')

async function handleLogin(values) {
  try {
    await login(values.username, values.password)
    router.push("/")
  } catch (error: any) {
    if (error.response) {
      console.table(error.response.data.detail)
      if (error.response.status == 400) {
        return
      } else if (error.response.status == 422) {
        return
      }
    }
  }
}

const onSubmit = handleSubmit(values => {
  handleLogin(values)
});
</script>

<template>
  <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
    <h1 class="text-4xl font-semibold">Heureux de vous revoir !</h1>
    <p
      class="font-semibold w-10/12 text-gray-600 text-sm"
    >Bon retour chez WizyTime le premier CRM français dédié aux coachs</p>
  </div>
  <va-form
    class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4"
    ref="form"
    tag="form"
    @submit.prevent="onSubmit"
  >
    <va-input
      v-model="username"
      label="Email address"
      type="email"
      name="username"
      autocomplete="username"
      :error-messages="usernameError"
      :rules="[value => value === 'Ben' || 'Should be Ben']"
    />

    <va-input
      class="mt-2"
      v-model="password"
      type="password"
      label="Password"
      name="password"
      autocomplete="current-password"
      :error-messages="passwordError"
    />

    <va-button type="submit" class="mt-2 w-full">Log in</va-button>
  </va-form>
</template>


<route lang="yaml">
meta:
  layout: auth
</route>