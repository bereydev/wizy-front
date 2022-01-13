<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const user = useUserStore()

const props = defineProps<{client_id: string }>()

const client = user.getClientByID(props.client_id)
console.log(client)


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