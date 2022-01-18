<script setup lang="ts">

import { useUserStore } from '~/stores/user'
import { useClientStore } from '~/stores/client'
import { useEventStore } from '~/stores/event'
import Modal from '../components/Modal.vue'
import { storeToRefs } from 'pinia'

const wizyStarModal = ref<InstanceType<typeof Modal>>()
const userStore = useUserStore()
const eventStore = useEventStore()
const clientStore = useClientStore()

const { events } = storeToRefs(eventStore)
const { clients} = storeToRefs(clientStore)
const {getCurrentUser} = userStore
const {getClients} = clientStore
const {getEvents} = eventStore 

onMounted(async () => {
  getCurrentUser()
  getClients()
  getEvents()
})


</script>

<template>
  <div class="flex flex-row space-x-4 mt-2">
    <div class="flex flex-col w-1/3 h-full space-y-4">
      <div class="bg-indigo-300 rounded-xl shadow-lg px-6 py-4 w-full min-h-30 h-full">
        <h1>Tableau de bord</h1>
        <p>👋 Bienvenu sur le tableau de bord de WizyTime</p>
      </div>
      <div class="bg-indigo-200 rounded-xl shadow-md px-6 py-4 w-full min-h-30 h-full">
        <p>💡 De nouveau éléments et statistique pour votre activité sont en cours de development</p>
      </div>
      <div class="bg-indigo-100 rounded-xl shadow px-6 py-4 w-full min-h-30 h-full">
        <p>
          🤔 Vous pouver consulter la liste des prochaines fonctionnalités ou nous faire des propositions dans la case
          <span
            class="font-bold"
          >WizyStar</span>
        </p>
      </div>
      <div class="bg-indigo-50 rounded-xl shadow-sm px-6 py-4 w-full h-30"></div>
    </div>
    <div class="flex flex-col w-1/3 space-y-1">
      <div class="bg-blue-200 rounded-xl shadow px-6 py-4 w-full">
        <h2>Séances à venir</h2>
      </div>
      <div v-if="events && events.length">
        <Button class="w-full">Ajouter une séance</Button>
        <EventCard :event="event" v-for="event in events" :key="event.id"></EventCard>
      </div>
      <div class="text-center justify-center w-full h-full" v-if="clients && !clients.length">
      <iconoir:add-user class="h-20 w-full text-gray-400" />
        <p class="mb-3">Vous n'avez pas encore de clients</p>
        <Button class="w-full">Ajouter un client</Button>
      </div>
      <div v-if="events && !events.length" class="text-center justify-center w-full h-full">
        <iconoir:calendar class="h-20 w-full text-gray-400" />
        <p class="mb-3">Vous n'avez pas de séances pour le moment</p>
        <Button class="w-full">Ajouter une séance</Button>
      </div>
    </div>
    <div class="flex flex-col w-1/3 space-y-4">
      <div class="bg-white rounded-xl shadow-md px-6 py-4 w-full">
        <h2>WizyStar</h2>
        <h3 class="mb-1">Personnalisez votre WizyTime</h3>
        <Button class="w-full" @click="wizyStarModal?.toggle">J'ai une idée !</Button>
        <Modal ref="wizyStarModal">
          <template v-slot:title>
            <h1>On vous écoute !</h1>
          </template>
          Formulaire pour envoyer un truc
          <input type="textarea" />
          <template v-slot:footer>
            <Button>Annuler</Button>
            <Button>✨Envoyer aux développeurs✨</Button>
          </template>
        </Modal>
      </div>
      <div class="bg-white rounded-xl shadow-md px-6 py-4 w-full h-full">
        <h3 class="mb-1">Janvier 2022</h3>
        <ul class="space-y-1 pl-2">
          <li>
            <p>
              <logos:google-icon class="inline-block" />- Intégration Google Calendar et Contacts
            </p>
          </li>
          <li>
            <p>⏳ - Visualisation de vos séances sous forme de timeline</p>
          </li>
          <li>
            <p>🎉 - Paramétrage du type de séance (couleurs, titre, champs personnalisables, ...)</p>
          </li>
          <li>
            <p>📧 - Relance des clients inacatifs par email</p>
          </li>
        </ul>
        <h3 class="mb-1">Février 2022</h3>
        <ul class="space-y-1 pl-2">
          <li>
            <p>💻 - Statistiques d'activité sur le tableau de bord</p>
          </li>
          <li>
            <p>✍️ - Edition du profil utilisateur</p>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- <div class="w-full">
        <div class="flex flex-row">
          <div
            class="bg-no-repeat bg-red-200 border border-red-300 rounded-xl w-7/12 mr-2 p-6"
            style="background-image: url(https://previews.dropbox.com/p/thumb/AAvyFru8elv-S19NMGkQcztLLpDd6Y6VVVMqKhwISfNEpqV59iR5sJaPD4VTrz8ExV7WU9ryYPIUW8Gk2JmEm03OLBE2zAeQ3i7sjFx80O-7skVlsmlm0qRT0n7z9t07jU_E9KafA9l4rz68MsaZPazbDKBdcvEEEQPPc3TmZDsIhes1U-Z0YsH0uc2RSqEb0b83A1GNRo86e-8TbEoNqyX0gxBG-14Tawn0sZWLo5Iv96X-x10kVauME-Mc9HGS5G4h_26P2oHhiZ3SEgj6jW0KlEnsh2H_yTego0grbhdcN1Yjd_rLpyHUt5XhXHJwoqyJ_ylwvZD9-dRLgi_fM_7j/p.png?fv_content=true&size_mode=5); background-position: 90% center;"
          >
            <p class="text-5xl text-indigo-900">
              Welcome
              <br />
              <strong>Lorem Ipsum</strong>
            </p>
            <span class="bg-red-300 text-xl text-white inline-block rounded-full mt-12 px-8 py-2">
              <strong>01:51</strong>
            </span>
          </div>

          <div
            class="bg-no-repeat bg-orange-200 border border-orange-300 rounded-xl w-5/12 ml-2 p-6"
            style="background-image: url(https://previews.dropbox.com/p/thumb/AAuwpqWfUgs9aC5lRoM_f-yi7OPV4txbpW1makBEj5l21sDbEGYsrC9sb6bwUFXTSsekeka5xb7_IHCdyM4p9XCUaoUjpaTSlKK99S_k4L5PIspjqKkiWoaUYiAeQIdnaUvZJlgAGVUEJoy-1PA9i6Jj0GHQTrF_h9MVEnCyPQ-kg4_p7kZ8Yk0TMTL7XDx4jGJFkz75geOdOklKT3GqY9U9JtxxvRRyo1Un8hOObbWQBS1eYE-MowAI5rNqHCE_e-44yXKY6AKJocLPXz_U4xp87K4mVGehFKC6dgk_i5Ur7gspuD7gRBDvd0sanJ9Ybr_6s2hZhrpad-2WFwWqSNkh/p.png?fv_content=true&size_mode=5); background-position: 100% 40%;"
          >
            <p class="text-5xl text-indigo-900">
              Inbox
              <br />
              <strong>23</strong>
            </p>
            <a
              href="#"
              class="bg-orange-300 text-xl text-white underline hover:no-underline inline-block rounded-full mt-12 px-8 py-2"
            >
              <strong>See messages</strong>
            </a>
          </div>
        </div>
        <div class="flex flex-row h-64 mt-6">
          <div class="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12">a</div>
          <div class="bg-white rounded-xl shadow-lg mx-6 px-6 py-4 w-4/12">b</div>
          <div class="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12">c</div>
        </div>
  </div>-->
</template>
