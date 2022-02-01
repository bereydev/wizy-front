<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import type { Client, EventModel } from "~/interface"

import { useClientStore } from '~/stores/client';
import { useEventStore } from '~/stores/event';
import { storeToRefs } from 'pinia';
import { useEventModelStore } from '~/stores/event-model';

const startDate = computed(() => new Date(`${startDateString.value} ${startTimeString.value}`));
const endDate = computed<Date>(() => new Date(`${startDateString.value} ${endTimeString.value}`));
const now = new Date()
function completeZero(value: number) {
    return (value < 10 ? '0' : '') + value
}
const startDateString = ref(`${now.getFullYear()}-${completeZero(now.getMonth() + 1)}-${completeZero(now.getDate())}`)
const startTimeString = ref(`${completeZero(now.getHours())}:${completeZero(now.getMinutes())}`)
const endTimeString = ref(`${completeZero(now.getHours() + 1)}:${completeZero(now.getMinutes())}`)

const client = ref()
const eventModel = ref()
const note = ref("")

const clientStore = useClientStore()
const eventStore = useEventStore()
const eventModelStore = useEventModelStore()

const { clients } = storeToRefs(clientStore)
const { eventModels } = storeToRefs(eventModelStore)
const { createEvent } = eventStore
const { getClients } = clientStore
const { getEventModels } = eventModelStore

function createClientChoice(client: Client) {
    return {
        value: client.id,
        label: `${client.first_name} ${client.last_name}`
    }
}

function createEventModelChoice(eventModel: EventModel) {
    return {
        value: eventModel.id,
        label: eventModel.name
    }
}
const clientOptions = clients.value.map(client => createClientChoice(client))
const eventModelOptions = eventModels.value.map(eventModel => createEventModelChoice(eventModel))

async function submitCreate() {
    createEvent({
        start: startDate.value,
        end: endDate.value,
        summary: note.value,
        event_model_id: eventModel.value,
        client_id: client.value
    })
}

onMounted(async () => {
    await getClients()
    await getEventModels()
})
defineExpose({
    submitCreate
})


</script>

<template>
    <div class="flex w-full space-x-2 mb-2">
        <div class="w-full">
            <label for="event-model" class="form-label">Choisir un type de séance</label>
            <Multiselect v-model="eventModel" :searchable="true" :options="eventModelOptions" />
        </div>
        <div class="w-full">
            <label for="client" class="form-label">Choisir un client</label>
            <Multiselect v-model="client" :searchable="true" :options="clientOptions" />
        </div>
    </div>
    <div class="flex w-full space-x-2">
        <div class="w-full">
            <label for="date" class="form-label">Date</label>
            <input type="date" class="field" v-model="startDateString" />
        </div>
        <div class="w-full">
            <label for="start-time" class="form-label">Début</label>
            <input type="time" class="field" v-model="startTimeString" step="300" />
        </div>
        <IconoirArrowRight class="h-20 w-20" />
        <div class="w-full">
            <label for="end-time" class="form-label">Fin</label>
            <input type="time" class="field" v-model="endTimeString" step="300" />
        </div>
    </div>
    <label for="note" class="form-label">Note</label>
    <textarea class="w-full field" rows="9"></textarea>
</template>