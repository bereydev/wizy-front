<script setup lang="ts">

import { useUserStore } from '~/stores/user'
const user = useUserStore()
const { isLoggedIn } = user
const open = ref(false)

function toggle() {
  open.value = !open.value
}

</script>

<template>

  <nav class="flex items-center justify-between flex-wrap py-4 px-8 w-full">
    <div class="inline-flex items-center mr-6">
      <object data="/favicon.svg" width="50" height="50"></object>
      <span class="text-2xl font-semibold hidden lg:block">WizyTime</span>
    </div>
    <div
      class="w-full block flex-grow md:flex md:items-center md:w-auto"
      id="main-nav"
      :class="open ? 'block' : 'hidden'"
    >
      <div @click="toggle" v-if="isLoggedIn()" class="text-sm md:flex-grow">
        <router-link
          class="hover:underline cursor-pointer py-3 mr-5 block md:inline-block"
          to="/"
        >Tableau de bord</router-link>
        <router-link
          class="hover:underline cursor-pointer py-3 mr-5 block md:inline-block"
          to="/calendar"
        >Calendrier</router-link>
        <router-link
          class="hover:underline cursor-pointer py-3 mr-5 block md:inline-block"
          to="/clients"
        >Clients</router-link>
        <router-link
          class="hover:underline cursor-pointer py-3 mr-5 block md:inline-block"
          to="/tools"
        >Outils</router-link>
      </div>
      <div v-else class="w-full block flex-grow md:flex md:items-center lg:w-auto"></div>
      <div v-if="isLoggedIn()">
        <AccountDropdown></AccountDropdown>
      </div>
      <div v-else>
        <router-link
          class="inline-block py-2 leading-none mr-4 mt-4 md:mt-0"
          to="/auth/login"
        >Se connecter</router-link>
        <router-link
          class="btn inline-block leading-none mt-4 md:mt-0"
          to="/auth/register"
        >S'inscrire</router-link>
      </div>
    </div>
  </nav>
</template>
