<script setup lang="ts">

import type {Field} from "~/interface"

interface Props {
    field: Field
}

const props = withDefaults(defineProps<Props>(), {
    field: () => <Field>{
        type: "text",
    }
})

let { name, value, type, label, placeholder, id } = props.field


placeholder = placeholder == undefined ? label : placeholder
id = id == undefined ? name : id

</script>

<template>
    <label for="first-name" class="form-label">{{ label }}</label>
    <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        class="field"
        :name="name"
        v-model="value"
    />
</template>