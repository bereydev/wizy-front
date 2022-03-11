<script setup lang="ts">
import { isYesterday, addDays } from 'date-fns'
import { NCalendar } from 'naive-ui'

import Modal from "../components/Modal.vue"
import EventModal from "../components/EventModal.vue"
import ClientModal from "../components/ClientModal.vue"

import { useEventStore } from '~/stores/event';
import { storeToRefs } from 'pinia';
import { useClientStore } from '~/stores/client';

const showDate = ref(new Date())
function setShowDate(d) {
  showDate.value = d;
}

const createEventModal = ref<InstanceType<typeof EventModal>>()
const createClientModal = ref<InstanceType<typeof ClientModal>>()
const noClientModal = ref<InstanceType<typeof Modal>>()
const eventStore = useEventStore()
const clientStore = useClientStore()

const { events } = storeToRefs(eventStore)
const { clients } = storeToRefs(clientStore)

// function displayTime(date: Date) {
//   return `${date.getHours()}h${(date.getMinutes()<10?'0':'') + date.getMinutes()}`
// }

const value = ref(addDays(Date.now(), 1).valueOf())
function handleUpdateValue(
  _: number,
  { year, month, date }: { year: number; month: number; date: number }
) {
  console.log(`${year}-${month}-${date}`)
}
function isDateDisabled(timestamp: number) {
  if (isYesterday(timestamp)) {
    return true
  }
  return false
}

</script>

<template>
  
  <div class="py-2 flex justify-between ">
    <h1>Calendrier</h1>
      <input
        class="bg-gray-200 appearance-none border-2 w-60 max-w-60 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none mr-2 focus:bg-white focus:border-purple-500"
        id="inline-search"
        type="text"
        placeholder="Rechercher"
      />
      <va-button @click="clients && clients.length > 0 ? createEventModal?.toggle() : noClientModal?.toggle()" :rounded="false" class="max-w-max">Ajouter une séance</va-button>
  </div>
  <n-calendar
    v-model:value="value"
    #="{ year, month, date }"
    :is-date-disabled="isDateDisabled"
    @update:value="handleUpdateValue"
  >
    <div class="flex flex-col h-full">
      <div class="flex flex-col space-y-1 pt-2">
        <div
          square
          class="bg-green-400 flex-grow-0 rounded text-gray-800 px-3 truncate"
        >Premier entretient</div>
        <div
          square
          class="bg-red-400 flex-grow-0 rounded text-gray-800 px-3 truncate"
        >Entretient final</div>
        <div
          square
          class="bg-green-400 flex-grow-0 rounded text-gray-800 px-3 truncate"
        >Premier entretient</div>
        <div
          square
          class="bg-red-400 flex-grow-0 rounded text-gray-800 px-3 truncate"
        >Entretient final</div>
        <div
          square
          class="bg-green-400 flex-grow-0 rounded text-gray-800 px-3 truncate"
        >Premier entretient</div>
        <div
          square
          class="bg-red-400 flex-grow-0 rounded text-gray-800 px-3 truncate"
        >Entretient final</div>
      </div>
      
        <PlusButton @click="clients && clients.length > 0 ? createEventModal?.toggle(new Date(year, month, date)) : noClientModal?.toggle()"/>
     
    </div>
  </n-calendar>
  <EventModal ref="createEventModal"></EventModal>
  <ClientModal ref="createClientModal"></ClientModal>
  <Modal ref="noClientModal">
    <template v-slot:title>
      <h1>Pas encore clients ?</h1>
    </template>
    <p>Oups... Votre fichier client est vide 🤷🏼‍♂️</p>
    <p>Avant d'ajouter un évenement ajouter votre premier client 🎉</p>
    <template v-slot:footer>
      <Button
        class="w-full"
        @click="noClientModal?.toggle(), createClientModal?.toggle()"
      >Ajouter mon premier client</Button>
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