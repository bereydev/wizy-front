<script setup lang="ts">
import Modal from "../components/Modal.vue"
import QuickEventForm from "../components/forms/QuickEventForm.vue"
const form = ref<InstanceType<typeof QuickEventForm>>()
const modal = ref<InstanceType<typeof Modal>>()

const date = ref(new Date())

function toggle(d: Date = new Date()) {
    const now = new Date()
    d.setMinutes(now.getMinutes())
    d.setHours(now.getHours())
    date.value = d
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
        <QuickEventForm ref="form" :date="date"></QuickEventForm>
        <template v-slot:footer>
            <Button @click="modal?.toggle">Annuler</Button>
            <Button @click="form?.submitCreate(), modal?.toggle()">Ajouter</Button>
        </template>
    </Modal>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>