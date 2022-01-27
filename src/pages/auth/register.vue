<script setup lang="ts">

import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { register } = userStore
const router = useRouter()

const lastName = ref("")
const firstName = ref("")
const password = ref("")
const email = ref("")

async function onSubmit() {
  try {
    await register(email.value, password.value, firstName.value, lastName.value)
    router.push("/");
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
    <h1 class="text-4xl font-semibold">Hello! Prêt à booster votre activité ?</h1>
    <p
      class="w-10/12 font-semibold text-gray-600 text-sm"
    >Bienvenu chez WizyTime le premier CRM français dédié aux coachs</p>
  </div>
  <form @submit.prevent="onSubmit" class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
    <input
      class="field"
      required
      v-model="firstName"
      placeholder="Prénom"
      type="text"
      autocomplete="given-name"
    />
    <input
      class="field"
      required
      v-model="lastName"
      placeholder="Nom de famille"
      type="text"
      autocomplete="family-name"
    />
    <input
      class="field"
      type="text"
      required
      v-model="email"
      placeholder="Adresse e-mail"
      autocomplete="username"
    />
    <input
      class="field"
      placeholder="Mot de passe"
      required
      v-model="password"
      type="password"
      autocomplete="new-password"
    />
    <input
      class="field"
      placeholder="Répéter le mot de passe"
      required
      type="password"
      autocomplete="new-password"
    />

    <button
      class="ml-auto w-full bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
      type="submit"
    >S'inscrire</button>

    <div class="text-right w-full mt-4">
      <router-link
        class="text-sm font-bold text-teal-500 hover:underline cursor-pointer"
        to="/auth/login"
      >Vous avez déjà un compte ?</router-link>
    </div>
  </form>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>
