<script setup lang="ts">
import ClientForm from '../components/forms/ClientForm.vue'
import Modal from '../components/Modal.vue'

const form = ref<InstanceType<typeof ClientForm>>()
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
            <h1>Ajouter un nouveau client</h1>
        </template>

        <ClientForm ref="form"></ClientForm>

        <template v-slot:footer>
            <Button type="submit" @click="modal?.toggle">Annuler</Button>
            <Button type="submit" @click="form?.submitCreate(), modal?.toggle()">Enregistrer</Button>
        </template>
    </Modal>
</template>