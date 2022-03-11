<script setup lang="ts">
import EventModelModal from '../components/EventModelModal.vue'
const eventModelModal = ref<InstanceType<typeof EventModelModal>>()

// rechercer la liste des eventModels 
  let seance1 = {title: "Séance Yoga", description:"c'est une séance détente", color:"bg-purple-500", modal:eventModelModal };
  let seance2 = {title: "Séance meditation", description:"c'est une séance détente", color:"bg-green-500", modal:eventModelModal.value };
  let seance3 = {title: "Séance relax", description:"c'est une séance détente", color:"bg-red-500", modal:eventModelModal.value };
  let eventModels = {seance1, seance2, seance3};
  
</script>

<template>

<div class="flex">
    <h1>Vos type de séance</h1>
    <va-button @click="eventModelModal?.toggle" :rounded="false" class="w-10 max-w-60">  Ajouter un type de séance </va-button>
</div>

<!--créer un composant card et lui passer titre, description couleurs puis créer un composant modal avec le 
formulaire et lui passer les données titre, descritpion, section, confidentialité, couleur-->
<div class="row">
    <li v-for="eventModel in eventModels" class="list-none">
      <a @click="eventModelModal?.toggle"> 
        <EventModelCard :title="eventModel.title" :description="eventModel.description" :color="eventModel.color" :modal="eventModel.modal"></EventModelCard>
     </a>
    </li>
  </div>

<div class="min-w-70rem">
  <EventModelModal ref="eventModelModal"></EventModelModal>
</div>


</template>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>




