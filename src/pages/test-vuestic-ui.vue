<script setup lang="ts">
const message = "Hello, world!"
const basic = ref([])
const basic2 = ref([])
</script>

<template>
    <va-button>Button</va-button>
    <va-file-upload v-model="basic" type="gallery" file-types="image/*" />
    <va-file-upload v-model="basic2" multiple dropzone/>
</template>