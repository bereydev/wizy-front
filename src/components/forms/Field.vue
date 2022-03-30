<template>
    <div>
        <label :for="name">{{ label }}</label>
        <input
            class="py-2 px-2 mt-1 appearance-none border-2 block w-full border-gray-200 bg-white placeholder-gray-500 rounded focus:outline-none hover:border-indigo-400 hover:bg-indigo-100 focus:bg-white focus:border-indigo-700"
            :id="name"
            :name="name"
            :type="type ?? 'text'"
            :placeholder="placeholder ?? label"
            :autocomplete="autocomplete"
            v-model="value"
        />
        <span class="text-sm text-red-600" v-show="errorMessage">{{ errorMessage }}</span>
    </div>
</template>


<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
    name: String,
    type : String,
    label: String,
    autocomplete : String,
    placeholder : String,
})

console.log(props.name)

const { value, errorMessage } = useField(props.name!);

</script>