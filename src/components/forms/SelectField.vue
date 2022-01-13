<script setup lang="ts">

interface Props {
    options: Array<string>;
}
const props = defineProps<Props>()

const {options} = toRefs(props)

</script>

<template>

<select class="flex w-full field" name="clients" id="clients">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
    
</template>