import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Client } from "~/interface"
import fetchAPI from './fetch'
import {addToStore, deleteInStore, updateInStore} from './crud-utils'

export const useClientStore = defineStore('client', () => {

    // ************** STATE ************** 
    /**
     * Current named of the user.
     */
    const clients = ref<Array<Client>>([])

    // ************** ACTIONS ************** 

    async function getClients() {
        const clientList = await fetchAPI<Array<Client>>('clients/')
        clients.value = clientList
    }

    async function createClient(client: Client) {
        const newClient = await fetchAPI<Client>('clients/', { method: 'post', data: { ...client } })
        addToStore(clients, newClient)
    }
    async function updateClient(client: Client) {
        const updatedClient = await fetchAPI<Client>(`clients/${client.id}`, { method: 'put', data: { ...client } })
        updateInStore(clients, updatedClient)
    }

    async function deleteClient(clientId: string) {
        const deletedClient = await fetchAPI<Client>(`clients/${clientId}`, { method: 'delete' })
        deleteInStore(clients, deletedClient)
    }

    // ************** GETTERS ************** 

    function getClientByID(id: string): Client | undefined {
        return clients.value.find(x => x.id === id);
    }
    
    function getClientsInAlphabeticalOrder(): Array<Client> {
        return clients.value.sort((a, b) => a.first_name.localeCompare(b.first_name))
    }


    return {
        clients,
        getClients,
        createClient,
        updateClient,
        deleteClient,
        getClientByID,
        getClientsInAlphabeticalOrder
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot))
