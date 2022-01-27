<script setup lang="ts">
import { useToolStore } from '~/stores/tool';

const toolStore = useToolStore()

const props = defineProps<{ tool_id: string }>()

const { getToolByID } = toolStore

const tool = getToolByID(props.tool_id)


</script>

<template>{{ tool }}</template>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>