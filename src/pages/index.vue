<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { useClientStore } from '~/stores/client'
import { useEventStore } from '~/stores/event'
import Modal from '../components/Modal.vue'
import { storeToRefs } from 'pinia'
import { ACCESS_TOKEN } from '~/stores/fetch'

const wizyStarModal = ref<InstanceType<typeof Modal>>()
const userStore = useUserStore()
const eventStore = useEventStore()
const clientStore = useClientStore()
const router = useRouter()

const { events } = storeToRefs(eventStore)
const { clients } = storeToRefs(clientStore)
const { getCurrentUser } = userStore
const { getClients } = clientStore
const { getEvents } = eventStore

// if (isLoggedIn()) {
//   router.push('/auth/login')
// }

onMounted(async () => {
  try {
    await getCurrentUser()
    await getClients()
    await getEvents()
  } catch (error: any) {
    console.error(error.response.status)
    console.table(error.response.data.detail)
    if (error.response.status == 403) {
      // Unvalidate the access token and redirect to login
      localStorage.removeItem(ACCESS_TOKEN)
      router.push('/auth/login')
    } else if (error.response.status == 422) {
      return

    }
  }
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
</template>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>