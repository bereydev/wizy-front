<script setup lang="ts">
import Modal from "../components/Modal.vue"
import QuickEventForm from "../components/forms/QuickEventForm.vue"
const form = ref<InstanceType<typeof QuickEventForm>>()
const modal = ref<InstanceType<typeof Modal>>()

function toggle() {
    modal.value?.toggle()
}

defineExpose({
    toggle
})
</script>
<template>
    <Modal ref="modal">
        <template v-slot:title>
            <h1>Ajouter une séance</h1>
        </template>
        <QuickEventForm ref="form"></QuickEventForm>
        <template v-slot:footer>
            <Button @click="modal?.toggle">Annuler</Button>
            <Button @click="form?.submitCreate(), modal?.toggle()">Ajouter</Button>
        </template>
    </Modal>
</template>