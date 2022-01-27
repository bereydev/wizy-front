import { acceptHMRUpdate, defineStore } from 'pinia'
import type { EventModel } from "~/interface"
import fetchAPI from './fetch'

export const useEventModelStore = defineStore('event-model', () => {

    // ************** STATE ************** 
    /**
     * Current named of the user.
     */
    const eventModels = ref<Array<EventModel>>([])

    // ************** ACTIONS ************** 

    async function getEventModels() {
        const eventModelList = await fetchAPI<Array<EventModel>>('event_models')
        eventModels.value = eventModelList
    }

    // ************** GETTERS ************** 


    return {
        eventModels,
        getEventModels
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useEventModelStore, import.meta.hot))
