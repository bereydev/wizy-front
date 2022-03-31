<script setup lang="ts">
// import type { Field } from "~/interface"
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()
const { login } = userStore

// Define a validation schema
const schema = yup.object({
  username: yup.string().required("Champ obligatoire").email("Votre nom d'utilisateur doit être une addresse e-mail valide"),
  password: yup.string().required("Champ obligatoire").min(8, "Votre mot de passe doit avoir au moins 8 charactères").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
    "Votre mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un nombre"
  )
});

async function onSubmit(values) {

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


</script>

<template>
  <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
    <h1 class="text-4xl font-semibold">Heureux de vous revoir !</h1>
    <p
      class="font-semibold w-10/12 text-gray-600 text-sm"
    >Bon retour chez WizyTime le premier CRM français dédié aux coachs</p>
  </div>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4"
  >
    <div class="w-full mb-2">
      <Field name="username" type="email" autocomplete="username" />
    </div>
    <div class="w-full mb-2">
      <Field name="password" type="password" autocomplete="current-password" />
    </div>

    <va-button :rounded="false" class="w-full" type="submit">Se connecter</va-button>
  </Form>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>
