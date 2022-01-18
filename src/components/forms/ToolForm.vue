<script setup lang="ts">
import type {Tool, Field} from "~/interface"
import { useToolStore } from '~/stores/tool'

interface Props {
    tool_placeholder?: Tool;
}
const toolStore = useToolStore()
const {updateTool, createTool} = toolStore

const props = withDefaults(defineProps<Props>(), {
    tool_placeholder: () => <Tool>{
        name: "",
        tags: {},
        fav: false
    }
})

const tool = reactive(<Tool>{
    ...props.tool_placeholder
})

const { name } = toRefs(tool)

async function submitUpdate() {
    updateTool(tool)
}
async function submitCreate() {
    createTool(tool)
}
defineExpose({
    submitUpdate,
    submitCreate
})

// Fields definition

const fieldToolName: Field = {
      value: name,
      label:"Nom de l'outil",
      name:"name"
}
</script>

<template>
<form>
    <Field :field="fieldToolName"></Field>
</form>
</template>