<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const user = useUserStore()

const props = defineProps<{ tool_id: string }>()

const { getToolByID } = user

const tool = getToolByID(props.tool_id)
console.log(tool)


</script>

<template>{{ tool }}</template>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>