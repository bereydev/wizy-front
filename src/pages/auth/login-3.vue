<script setup lang="ts">
// import type { Field } from "~/interface"
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()
const { login } = userStore

// Define a validation schema
const schema = yup.object({
  username: yup.string().required().email(),
  password: yup.string().required().min(8),
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

// Fields definition

// const fieldUsername: Field = {
//   value: username,
//   label: "Adresse e-mail",
//   name: "username",
//   autocomplete: "username",
// }

// const fieldPassword: Field = {
//   type: "password",
//   value: password,
//   name: "password",
//   label: "Mot de passe",
//   autocomplete: "current-password",
// }

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
    <Field name="username" type="email" />
    <ErrorMessage name="username" />
    <Field name="password" type="password" />
    <ErrorMessage name="password" />
    <Button type="submit" class="w-full">Se connecter</Button>
  </Form>
  <div class="text-right w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
    <a class="text-sm font-bold text-teal-500 hover:underline cursor-pointer">Mot de passe oublié ?</a>
  </div>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>
