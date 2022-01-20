<script setup lang="ts">

import Modal from "../components/Modal.vue"
import QuickEventForm from "../components/forms/QuickEventForm.vue"
import type { Event } from "~/interface"

import { useEventStore } from '~/stores/event';
import { storeToRefs } from 'pinia';

const createEventModal = ref<InstanceType<typeof Modal>>()
const quickEventForm = ref<InstanceType<typeof QuickEventForm>>()

const eventStore = useEventStore()

const { events } = storeToRefs(eventStore)

const masks = {
  weekdays: 'WWW',
}

function displayTime(date: Date) {
  return `${date.getHours()}h${(date.getMinutes()<10?'0':'') + date.getMinutes()}`
}
function processEvents(event: Event) {
  console.log(event.start)
  return {
    key: event.id,
    customData: {
      titre: `${event.event_model?.name} avec ${event.client_full_name} à ${displayTime(new Date(event.start))}`,
      class: 'm-1',
      style: `background-color: ${event.event_model?.color}`,
    },
    dates: event.start,
  }
}

function attributes() {
  return events.value.map(event => processEvents(event))
}
// const attributes = [
//   {
//     key: 1,
//     customData: {
//       title: 'Lunch with mom.',
//       class: 'bg-red-600 text-white',
//     },
//     dates: new Date(year, month, 1),
//   },
// ]

</script>

<template>
  <h1>Calendrier</h1>
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
      <Button @click="createEventModal?.toggle">Ajouter une séance</Button>
    </div>
  </div>
  <!-- <v-calendar
    class="custom-calendar max-w-full"
    :masks="masks"
    :attributes="attributes()"
    disable-page-swipe
    is-expanded
  >
    <template v-slot:day-content="{ day, attributes }">
      <div class="flex flex-col h-full z-10 overflow-hidden">
        <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
        <div class="flex-grow overflow-y-auto overflow-x-auto">
          <p
            v-for="attr in attributes"
            :key="attr.key"
            class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
            :class="attr.customData.class"
            :style="attr.customData.style"
          >{{ attr.customData.titre }}</p>
        </div>
      </div>
    </template>
  </v-calendar> -->
  <Modal ref="createEventModal">
    <template v-slot:title>
      <h1>Ajouter une séance</h1>
    </template>
    <QuickEventForm ref="quickEventForm"></QuickEventForm>
    <template v-slot:footer>
      <Button @click="createEventModal?.toggle">Annuler</Button>
      <Button @click="quickEventForm?.submitCreate(), createEventModal?.toggle()">Ajouter</Button>
    </template>
  </Modal>
</template>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

deep() .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;

  border-radius: 0;
  width: 100%;

  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>