<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import { storeToRefs} from 'pinia'

const userStore = useUserStore()
const {currentUser} = storeToRefs(userStore)
const { logout } = userStore
const router = useRouter()

const isOpen = ref(false)

function onLogout() {
  logout()
  router.push('/auth/login')
}
</script>

<template>

    <div id="dropdown" class="relative inline-block">
        <Button @click="isOpen = true">Account</Button>

      <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0" tabindex="-1"></div>

      <transition 
        enter-class="opacity-0 transform scale-90 transition-all"
        enter-active-class="transition ease-out duration-75"
        enter-to-class="opacity-100 transform scale-100"
        leave-class="opacity-100 transform scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-to-class="opacity-0 transform scale-90">
        
        <div v-if="isOpen" class="absolute right-0 mt-3 text-left z-75 transform origin-top-right">
          <div class="w-64 bg-white rounded-lg shadow-lg">
            <div class="flex items-center px-6 py-4">
              <img
                        class="h-10 w-10 rounded-full"
                        src="https://via.placeholder.com/400x400"
                        alt="profile picture"
                    />
              <div class="ml-4">
                <p class="font-semibold text-gray-900 leading-none">
                  {{currentUser?.first_name}} {{currentUser?.last_name}}
                </p>
                <p>
                  <a href="#" class="text-sm text-gray-600 leading-none hover:underline">View Profile</a>
                </p>
              </div>
            </div>
            <div class="border-t-2 border-gray-200 py-1">
              <a href="#" class="block px-6 py-3 leading-tight hover:bg-gray-200">Paramètres</a>
            </div>
            <form class="border-t-2 border-gray-200 py-1">
              <button @click="onLogout" class="block w-full px-6 py-3 text-left text-red-500 leading-tight hover:bg-gray-200">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </transition>
    </div>

</template>