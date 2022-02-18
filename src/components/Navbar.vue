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
  <!-- <nav>
    <div class="w-full mx-auto px-4 bg-white">
      <div class="flex justify-between">
        <div>
          <router-link class="flex items-center py-3 px-2 text-gray-700 hover:text-gray-900" to="/">
<svg
              class="h-6 w-6 mr-1 text-blue-400"
              xmlns="/favicon.svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span class="text-2xl font-semibold">WizyTime</span>
          </router-link>
        </div>

        <div class="hidden md:flex items-center space-x-4">
          <router-link class="nav-item" to="/">Tableau de bord</router-link>
          <router-link class="nav-item" to="/calendar">Calendrier</router-link>
          <router-link class="nav-item" to="/clients">Clients</router-link>
          <router-link class="nav-item" to="/tools">Outils</router-link>
        </div>

        <div v-if="!isLoggedIn()" class="hidden md:flex items-center space-x-1">
          <router-link class="py-3 px-3" to="/auth/login">Se connecter</router-link>
          <router-link
            class="btn"
            to="/auth/register"
          >S'inscrire</router-link>
        </div>

        <div v-if="isLoggedIn()" class="hidden md:flex items-center space-x-1">
          <AccountDropdown></AccountDropdown>
        </div>

        <div class="md:hidden flex items-center">
          <button @click="toggle" class="mobile-menu-button">
            <iconoir:menu />
          </button>
        </div>
      </div>
    </div>

    <div @click="toggle" :class="open? 'block':'hidden'" class="mobile-menu md:hidden">
      <router-link class="nav-item-mobile" to="/">Tableau de bord</router-link>
          <router-link class="nav-item-mobile" to="/calendar">Calendrier</router-link>
          <router-link class="nav-item-mobile" to="/clients">Clients</router-link>
          <router-link class="nav-item-mobile" to="/tools">Outils</router-link>
    </div>
  </nav>-->

  <nav class="flex items-center justify-between flex-wrap p-6 w-full">
    <div class="flex items-center flex-shrink-0 mr-6">
      <object data="/favicon.svg" width="50" height="50"></object>
      <span class="text-2xl font-semibold">WizyTime</span>
    </div>
    <div class="block lg:hidden">
      <button @click="toggle" class="mobile-menu-button">
            <iconoir:menu />
          </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto" id="main-nav" :class="open? 'block':'hidden'">
      <div @click="toggle" v-if="isLoggedIn()"  class="text-sm lg:flex-grow">
        <router-link
          class="hover:underline cursor-pointer py-3 mr-5 block lg:inline-block"
          to="/"
        >Tableau de bord</router-link>
        <router-link
          class="hover:underline cursor-pointer py-3 mr-5 block lg:inline-block"
          to="/calendar"
        >Calendrier</router-link>
        <router-link
          class="hover:underline cursor-pointer py-3 mr-5 block lg:inline-block"
          to="/clients"
        >Clients</router-link>
        <router-link
          class="hover:underline cursor-pointer py-3 mr-5 block lg:inline-block"
          to="/tools"
        >Outils</router-link>
      </div>
      <div v-else class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">

      </div>
      <div v-if="isLoggedIn()">
        <AccountDropdown></AccountDropdown>
      </div>
      <div v-else>
        <router-link
          class="inline-block py-2 leading-none mr-4 mt-4 lg:mt-0"
          to="/auth/login"
        >Se connecter</router-link>
        <router-link
          class="btn inline-block leading-none mt-4 lg:mt-0"
          to="/auth/register"
        >S'inscrire</router-link>
      </div>
    </div>
  </nav>
</template>
