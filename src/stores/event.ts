import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Event } from "~/interface"
import fetchAPI from './fetch'

export const useEventStore = defineStore('event', () => {

    // ************** STATE ************** 
    /**
     * Current named of the user.
     */
    const events = ref<Array<Event>>([])

    // ************** ACTIONS ************** 
    async function getEvents() {
        const data = await fetchAPI<Array<Event>>('events')
        let eventList = data

        eventList.forEach(event => {
            event.start = new Date(event.start)
            event.end = new Date(event.end)
        })
        events.value = eventList

    }

    async function createEvent(event: Event) {
        const data = await fetchAPI<Event>("events", { method: 'post', data: { ...event } })
        await getEvents()
    }

    // ************** GETTERS ************** 


    return {
        events,
        getEvents,
        createEvent
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useEventStore, import.meta.hot))
