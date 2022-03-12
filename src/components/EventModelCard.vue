<script setup lang="ts">

interface Props {
    name: String;
    description: String;
    color: String;
}
// Rajouter props pour lien modal 

const props = defineProps<Props>() 

</script>

<template>
<div class="flex mr-6 mt-4">
    <va-card class="w-60">
        <div class="rounded-t w-full h-4 mt-1" :class="props.color"></div>
        <va-card-title><h3>{{props.name}}</h3></va-card-title>
        <va-card-content><p>{{props.description}}</p></va-card-content>
    </va-card>
</div>
</template>