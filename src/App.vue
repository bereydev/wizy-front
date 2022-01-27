<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,

import { useUserStore } from './stores/user';

// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'WizyTime',
  meta: [
    { name: 'WizyTime Betâ', content: 'CRM for coaches' },
  ],
})
const userStore = useUserStore()
const { isLoggedIn } = userStore
const router = useRouter()
router.beforeEach((to, from) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) return '/auth/login'
  }
})
</script>

<template>
  <router-view />
</template>
