<script setup lang="ts">

import type { Field } from "~/interface"

interface Props {
    name: string
    label: string
    value: any
    type?: string
    placeholder?: string
    id?: string
    autocomplete?: string
    error?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: "text",
})

const { value, error } = toRefs(props)
let { name, type, label, placeholder, id } = props


placeholder = placeholder == undefined ? label : placeholder
id = id == undefined ? name : id

</script>

<template>
    <label :for="name" class="text-sm font-bold">{{ label }}</label>
    <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        class="field"
        :name="name"
        v-model="value"
    />
    <span class="error">{{ error }}</span>
</template>