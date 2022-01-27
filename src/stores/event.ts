import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Event } from "~/interface"
import fetchAPI from './fetch'
import {addToStore, deleteInStore, updateInStore} from './crud-utils'

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

        //Convert response content to JS dates
        eventList.forEach(event => {
            event.start = new Date(event.start)
            event.end = new Date(event.end)
        })
        events.value = eventList

    }

    async function createEvent(event: Event) {
        const newEvent = await fetchAPI<Event>("events", { method: 'post', data: { ...event } })
        addToStore(events, newEvent)
    }

    async function updateEvent(event: Event) {
        const updatedEvent = await fetchAPI<Event>(`events/${event.id}`, { method: 'put', data: { ...event } })
        updateInStore(events, updatedEvent)
    }

    async function deleteEvent(eventId: string) {
        const deletedEvent = await fetchAPI<Event>(`events/${eventId}`, { method: 'delete'})
        deleteInStore(events, deletedEvent)
    }

    // ************** GETTERS ************** 


    return {
        events,
        getEvents,
        createEvent,
        updateEvent,
        deleteEvent
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useEventStore, import.meta.hot))
