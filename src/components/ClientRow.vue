<script setup lang="ts">
import { useClientStore } from '~/stores/client'
import type { Client } from "~/interface"
import Modal from '../components/Modal.vue'
import ClientForm from '../components/forms/ClientForm.vue'

const clientStore = useClientStore()
const { deleteClient } = clientStore
const router = useRouter()

const deleteModal = ref<InstanceType<typeof Modal>>()
const editModal = ref<InstanceType<typeof Modal>>()
const clientForm = ref<InstanceType<typeof ClientForm>>()


interface Props {
    client: Client;
}


const props = defineProps<Props>()
const { client } = toRefs(props)


function onDelete() {
    deleteClient(client.value.id!)
}

function onEdit() {
    clientForm.value?.submitUpdate()
}

const openClient = () => {
    if (client.value.id)
        router.push(`/client/${encodeURIComponent(client.value.id)}`)
}
</script>

<template>
    <tr class="hover:bg-blue-100 cursor-pointer">
        <td @click="openClient" class="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <img
                        class="h-10 w-10 rounded-full"
                        src="https://via.placeholder.com/400x400"
                        alt="profile picture"
                    />
                </div>
            </div>
        </td>
        <td @click="openClient" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div
                class="text-sm leading-5 text-gray-900"
            >{{ client.first_name }} {{ client.last_name }}</div>
        </td>
        <td @click="openClient" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="text-sm leading-5 text-gray-900">{{ client.phone }}</div>
        </td>
        <td @click="openClient" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="text-sm leading-5 text-gray-900">{{ client.mail }}</div>
        </td>
        <td @click="openClient" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="text-sm leading-5 text-gray-900">{{ client.address }}</div>
        </td>
        <td
            @click="openClient" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
        >{{ client.company }}</td>
        <td @click="openClient"
            class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
        >
            <a
                href="#"
                class="text-indigo-600 flow-root hover:underline hover:text-indigo-800 focus:outline-none focus:underline"
                @click.stop="editModal?.toggle"
            >Editer</a>
        </td>
        <Modal ref="editModal">
            <template v-slot:title>
                <h1>Editer {{ client.first_name }} {{ client.last_name }}</h1>
            </template>
            <ClientForm ref="clientForm" :client_placeholder="client" />
            <a
                href="#"
                class="text-red-500 flow-root text-center hover:underline hover:text-red-700 focus:outline-none focus:underline"
                @click="deleteModal?.toggle"
            >Supprimer le client</a>
            <template v-slot:footer>
                <Button @click="editModal?.toggle">Annuler</Button>
                <Button @click="onEdit(), editModal?.toggle()">Enregister</Button>
            </template>
        </Modal>
        <Modal ref="deleteModal">
            <template v-slot:title>
                <h1>Supprimer un client</h1>
            </template>
            <p>Etes vous sur de vouloir supprimer {{ client.first_name }} {{ client.last_name }} ?</p>
            <p>La suppression d'un client entraine la suppriession de toutes ses données et de ses rendez-vous</p>
            <template v-slot:footer>
                <Button @click="deleteModal?.toggle">Annuler</Button>
                <Button @click="onDelete(), deleteModal?.toggle()">Supprimer</Button>
            </template>
        </Modal>
    </tr>
</template>