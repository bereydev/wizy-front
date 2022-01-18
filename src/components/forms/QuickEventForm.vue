<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import type { Client, EventModel } from "~/interface"

import { useClientStore } from '~/stores/client';
import { useEventStore } from '~/stores/event';
import { storeToRefs } from 'pinia';
import { useEventModelStore } from '~/stores/event-model';

function addHoursToDate(date: Date, hours: number): Date {
    return new Date(new Date(date).setHours(date.getHours() + hours));
}

const startDate = ref(new Date());
const endDate = ref(addHoursToDate(startDate.value, 1));
const client = ref()
const eventModel = ref()
const note = ref("")

const clientStore = useClientStore()
const eventStore = useEventStore()
const eventModelStore = useEventModelStore()

const { clients } = storeToRefs(clientStore)
const { eventModels } = storeToRefs(eventModelStore)
const { createEvent } = eventStore

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
        client_id:client.value
    })
}

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
            <!-- <v-date-picker v-model="startDate">
                <template v-slot="{ inputValue, inputEvents }">
                    <input class="field" :value="inputValue" v-on="inputEvents" />
                </template>
            </v-date-picker> -->
        </div>
        <div class="w-full">
            <label for="start-time" class="form-label">Début</label>
            <!-- <v-date-picker v-model="startDate" mode="time" is24hr>
                <template v-slot="{ inputValue, inputEvents }">
                    <input class="field" :value="inputValue" v-on="inputEvents" />
                </template>
            </v-date-picker> -->
        </div>
        <IconoirArrowRight class="h-20 w-20" />
        <div class="w-full">
            <label for="end-time" class="form-label">Fin</label>
            <!-- <v-date-picker v-model="endDate" mode="time" is24hr>
                <template v-slot="{ inputValue, inputEvents }">
                    <input class="field" :value="inputValue" v-on="inputEvents" />
                </template>
            </v-date-picker> -->
        </div>
    </div>
    <label for="note" class="form-label">Note</label>
    <textarea class="w-full field" rows="9"></textarea>
</template>