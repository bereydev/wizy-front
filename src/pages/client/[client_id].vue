<script setup lang="ts">
import { useClientStore } from '~/stores/client'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const clientStore = useClientStore()
const userStore = useUserStore()
const { isLoggedIn } = userStore
const {getClientByID} = clientStore

if (isLoggedIn()) {
  router.push('/auth/login')
}

const props = defineProps<{client_id: string }>()

const client = getClientByID(props.client_id)


</script>

<template>
<header class="flex w-full bg-blue-300">
 Header
</header>
<div class="flex w-full bg-red-400 space-x-2">
  <div class="flex w-full bg-light-50">
    First event
  </div>
  <div class="flex w-full bg-light-50">
    First event
  </div>
  <div class="flex w-full  bg-light-50">
    First event
  </div>
</div>
<footer class="flex w-full bg-gray-200">
<FreeTimeline />
</footer>
</template>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>