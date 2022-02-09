<script setup lang="ts">
// import type { Field } from "~/interface"
import { useField, useForm } from 'vee-validate'
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

const {handleSubmit, values} = useForm({validationSchema: schema})

const {value:username, errorMessage: usernameError } = useField('username')
const {value:password, errorMessage: passwordError} = useField('password')

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
      alert(JSON.stringify(values, null, 2));
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
  {{values}}
  <form
    @submit.prevent="onSubmit"
    class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4"
  >
    <div class="w-full mb-2">
      <input name="username" type="email" v-model="username" autocomplete="username" />
      <span class="error">{{usernameError}}</span>
    </div>
    <div class="w-full mb-2">
      <input name="password" type="password" v-model="password" autocomplete="current-password" />
      <span class="error">{{passwordError}}</span>
    </div>

    <Button type="submit" class="w-full">Se connecter</Button>
  </form>
  <div class="text-right w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
    <a class="text-sm font-bold text-teal-500 hover:underline cursor-pointer">Mot de passe oublié ?</a>
  </div>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>
