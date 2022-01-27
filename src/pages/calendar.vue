<script setup lang="ts">

import Modal from "../components/Modal.vue"
import EventModal from "../components/EventModal.vue"

import { useEventStore } from '~/stores/event';
import { storeToRefs } from 'pinia';
import { useClientStore } from '~/stores/client';

const createEventModal = ref<InstanceType<typeof EventModal>>()
const noClientModal = ref<InstanceType<typeof Modal>>()
const router = useRouter()
const eventStore = useEventStore()
const clientStore = useClientStore()

const { events } = storeToRefs(eventStore)
const {clients } = storeToRefs(clientStore)

// function displayTime(date: Date) {
//   return `${date.getHours()}h${(date.getMinutes()<10?'0':'') + date.getMinutes()}`
// }

</script>

<template>
  <h1>Calendrier</h1>
  {{events}}
  <div class="-mb-2 py-2 flex flex-wrap flex-grow justify-between">
    <div class="flex items-center py-2">
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-700"
        id="inline-searcg"
        type="text"
        placeholder="Rechercher"
      />
    </div>
    <div class="flex items-center py-2">
      <Button @click="clients && clients.length > 0? createEventModal?.toggle() : noClientModal?.toggle()">Ajouter une séance</Button>
    </div>
  </div>
  <EventModal ref="createEventModal"></EventModal>
  <Modal ref="noClientModal">
    <template v-slot:title>
      <h1>Pas encore clients ?</h1>
    </template>
    <p>Oups... Votre fichier client est vide 🤷🏼‍♂️</p>
    <p>Avant d'ajouter un évenement ajouter votre premier client 🎉</p>
    <template v-slot:footer>
      <Button class="w-full" @click="router.push('/clients'), createEventModal?.toggle()">Ajouter mon premier client</Button>
    </template>
  </Modal>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>