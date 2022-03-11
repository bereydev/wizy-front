<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { currentUser } = userStore
const { logout } = userStore
const router = useRouter()

const isOpen = ref(false)
const hovered = ref(false)

const initials = `${currentUser?.first_name[0]}${currentUser?.last_name[0]}`

function toggle() {
  isOpen.value = !isOpen.value
}

function onLogout() {
  logout()
  router.push('/auth/login')
}
</script>

<template>
  <div id="dropdown" class="relative inline-block">
    <va-hover v-model="hovered">
      <va-avatar @click="toggle" :color="hovered ? '#5fa9fa':'primary'">{{ initials}}</va-avatar>
    </va-hover>

    <div v-if="isOpen" @click="toggle" class="fixed inset-0" tabindex="-1"></div>

    <transition
      enter-class="opacity-0 transform scale-90 transition-all"
      enter-active-class="transition ease-out duration-75"
      enter-to-class="opacity-100 transform scale-100"
      leave-class="opacity-100 transform scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-to-class="opacity-0 transform scale-90"
    >
      <div v-if="isOpen" class="absolute right-0 mt-3 text-left z-75 transform origin-top-right">
        <div class="w-70 bg-white rounded-lg shadow-lg">
          <div class="border-t-2 border-gray-200">
            <a href="#" class="block px-6 py-3 leading-tight hover:bg-gray-200">Mon profile</a>
          </div>
          <div class="border-t-2 border-gray-200">
            <router-link
            @click="toggle"
          class="block px-6 py-3 leading-tight hover:bg-gray-200"
          to="/event-model"
        >Editer les types de séances</router-link>
          </div>
          <div class="flex">
            <va-button @click="onLogout" outline :rounded="false" color="danger" class="m-2">Se déconnecter</va-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>