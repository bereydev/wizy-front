<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import type { Client, EventModel } from "~/interface"

import { useClientStore } from '~/stores/client';
import { useEventStore } from '~/stores/event';
import { storeToRefs } from 'pinia';
import { useEventModelStore } from '~/stores/event-model';
import RangeField from '~/components/RangeField.vue'

const client = ref()
const eventModel = ref()
const note = ref("")

const clientStore = useClientStore()
const eventStore = useEventStore()
const eventModelStore = useEventModelStore()

const rangeField = ref<InstanceType<typeof RangeField>>()

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
        start: rangeField.value!.start,
        end: rangeField.value!.end,
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
    <RangeField ref="rangeField"></RangeField>
    <label for="note" class="form-label">Note</label>
    <textarea class="w-full field" rows="9"></textarea>
</template>