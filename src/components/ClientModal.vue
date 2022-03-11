<script setup lang="ts">
import ClientForm from '../components/forms/ClientForm.vue'
import Modal from '../components/Modal.vue'
import { useClientStore } from '~/stores/client';
import type { Client } from "~/interface"


const clientStore = useClientStore()
const { createClient, updateClient } = clientStore

const form = ref<InstanceType<typeof ClientForm>>()
const modal = ref<InstanceType<typeof Modal>>()

const props = defineProps({
    submitType: String
})

function toggle() {
    modal.value?.toggle()
}

async function update(client: Client) {
    updateClient({...client})
}
async function create(client: Client) {
    createClient({ ...client })
}

const submitFunction = props.submitType == "udpate" ? update : create 

defineExpose({
    toggle
})
</script>

<template>
    <ModalForm ref="modal">
        <template v-slot:title>
            <h1>Ajouter un nouveau client</h1>
        </template>

        <ClientForm ref="form" :submitFunction="submitFunction"></ClientForm>

        <template v-slot:footer>
            <Button @click="modal?.toggle">Annuler</Button>
            <Button type="submit" @click="form?.submit(), modal?.toggle()">Enregistrer</Button>
        </template>
    </ModalForm>
</template>