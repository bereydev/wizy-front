<script setup lang="ts">
import type { Event } from "~/interface"
interface Props {
    event: Event
}

const props = defineProps<Props>()
const { event } = props


</script>

<template>
<div class="bg-white rounded-xl shadow-md px-6 py-4 w-full"> Event {{event.start}}
      </div>
</template>