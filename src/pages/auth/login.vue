<script setup lang="ts">
import type {Field} from "~/interface"

import { useUserStore } from '~/stores/user'

const user = useUserStore()
const router = useRouter()

const username = ref("")
const password = ref("")

async function onSubmit() {
  try {
    await user.login(username.value, password.value)
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

const fieldUsername: Field = {
      value: username,
      label:"Adresse e-mail",
      name:"username",
      autocomplete:"username",
}

const fieldPassword: Field = {
      type:"password",
      value:password,
      name:"password",
      label:"Mot de passe",
      autocomplete:"current-password",
}

</script>

<template>
  <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
    <h1 class="text-4xl font-semibold">Heureux de vous revoir !</h1>
    <p
      class="font-semibold w-10/12 text-gray-600 text-sm"
    >Bon retour chez WizyTime le premier CRM français dédié aux coachs</p>
  </div>
  <form @submit.prevent="onSubmit" class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
    <Field :field="fieldUsername"></Field>
    <Field :field="fieldPassword"></Field>
    <div class="flex items-center">
      <div class="w-1/2 flex items-center">
        <input id="remember-me" type="checkbox" class="mt-1 mr-2" />
        <label for="remember-me">Se souvenir de moi !</label>
      </div>
      <button
        class="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
        type="submit"
      >Se connecter</button>
    </div>
  </form>
  <div class="text-right w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
    <a class="text-sm font-bold text-teal-500 hover:underline cursor-pointer">Mot de passe oublié ?</a>
  </div>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>
