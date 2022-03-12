<script setup lang="ts">
import { EventModel } from '~/interface';
import EventModelModal from '../components/EventModelModal.vue'
const eventModelModal = ref<InstanceType<typeof EventModelModal>>()

// rechercer la liste des eventModels, revoir interface eventModel pour confidentiality
  let seance1 = <EventModel>{name: "Séance Yoga", description:"c'est une séance détente", color:"bg-purple-500", section:[{name:"Section 11" , confidentiality:"Confidentiel" },{name:"Section 12" , confidentiality:"Public" }]};
  let seance2 = <EventModel>{name: "Séance meditation", description:"c'est une séance tranquille", color:"bg-green-500", section:[{name:"Section 21" , confidentiality:"Public"}, {name:"Section 22" , confidentiality:"Confidentiel" }]};
  let seance3 = <EventModel>{name: "Séance relax", description:"c'est une séance difficile", color:"bg-red-500", section:[{name:"Section 31" , confidentiality:"Confidentiel"}, {name:"Section 32" , confidentiality:"Public" }]};
  let eventModels = {seance1, seance2, seance3};

  const activeEventModel = ref<EventModel>();

  function setActiveEventModel(eventModel: EventModel) {
    activeEventModel.value = eventModel
    console.log("setActiveEventModel")
    console.log(activeEventModel.value)
  }
  
</script>

<template>

<div class="flex">
    <h1>Vos type de séance</h1>
    <va-button @click="eventModelModal?.toggle" :rounded="false" class="w-10 max-w-60">  Ajouter un type de séance </va-button>
</div>

<div class="row">
    <li v-for="eventModel in eventModels" class="list-none">
      <a @click="setActiveEventModel(eventModel), eventModelModal?.toggle()"> 
        <EventModelCard :name="eventModel.name" :description="eventModel.description" :color="eventModel.color"></EventModelCard>
      </a>
    </li>
</div>

<div class="min-w-70rem">
  <EventModelModal ref="eventModelModal" :eventModel="activeEventModel"></EventModelModal>
</div>

</template>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>




