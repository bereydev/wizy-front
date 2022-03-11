<script setup lang="ts">
import EventModelForm from './forms/EventModelForm.vue'
import Modal from './Modal.vue'

const form = ref<InstanceType<typeof EventModelForm>>()
const modal = ref<InstanceType<typeof Modal>>()

function toggle() {
    modal.value?.toggle()
}

defineExpose({
    toggle
})
</script>

<template>
    <Modal ref="modal" size="max-w-5xl">
        <template v-slot:title>
            <h1>Ajouter un nouveau nouveau type de séance</h1>
        </template>

        <EventModelForm ref="form"></EventModelForm>

        <template v-slot:footer>
            <Button type="submit" @click="modal?.toggle">Annuler</Button>
            <Button type="submit">Enregistrer</Button>
        </template>
    </Modal>
</template>