import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Client } from "~/interface"
import fetchAPI from './fetch'


export const useClientStore = defineStore('client', () => {

    // ************** STATE ************** 
    /**
     * Current named of the user.
     */
    const clients = ref<Array<Client>>([])

    // ************** ACTIONS ************** 

    async function getClients() {
        const data = await fetchAPI<Array<Client>>('clients/')
        clients.value = data
    }

    async function createClient(client: Client) {
        const data = await fetchAPI<Array<Client>>('clients/', { method: 'post', data: { ...client } })
        await getClients()
    }
    async function updateClient(client: Client) {
        const data = await fetchAPI<Array<Client>>(`clients/${client.id}`, { method: 'put', data: { ...client } })
        await getClients()
    }

    async function deleteClient(clientId: string) {
        const data = await fetchAPI<Array<Client>>(`clients/${clientId}`, { method: 'delete' })
        await getClients()
    }

    // ************** GETTERS ************** 

    function getClientByID(id: string): Client | undefined {
        return clients.value.find(x => x.id === id);
    }


    return {
        clients,
        getClients,
        createClient,
        updateClient,
        deleteClient,
        getClientByID,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot))
