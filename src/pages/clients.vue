<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClientStore } from '~/stores/client'
import { useUserStore } from '~/stores/user'
import ClientForm from '../components/forms/ClientForm.vue'
import Modal from '../components/Modal.vue'

const clientStore = useClientStore()
const userStore = useUserStore()
const { getClients, getClientsInAlphabeticalOrder} = clientStore
const { logout } = userStore
const router = useRouter()

onMounted(async () => {
  try {
    await getClients()
  } catch (error: any) {
    console.error(error.response.status)
    console.table(error.response.data.detail)
    if (error.response.status == 403) {
      // Unvalidate the access token and redirect to login
      logout()
      router.push('/auth/login')
    } else if (error.response.status == 422) {
      return
    }
  }
})

const clientForm = ref<InstanceType<typeof ClientForm>>()
const modal = ref<InstanceType<typeof Modal>>()

function onSubmit() {
  clientForm.value?.submitCreate()
}

</script>

<template>
  <h1>Fichier client</h1>
  <div class="-mb-2 py-2 flex flex-wrap flex-grow justify-between">
    <div class="flex items-center py-2">
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id="inline-searcg"
        type="text"
        placeholder="Rechercher"
      />
    </div>
    <div class="flex items-center py-2">
      <Button @click="modal?.toggle">Ajouter un client</Button>
    </div>
  </div>
  <div class="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    <div
      class="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200"
    >
      <table class="min-w-full">
        <!-- HEAD start -->
        <thead>
          <tr
            class="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider"
          >
            <th class="px-6 py-3 text-left font-medium"></th>
            <th class="px-6 py-3 text-left font-medium">Nom prénom</th>
            <th class="px-6 py-3 text-left font-medium">Numéro de téléphone</th>
            <th class="px-6 py-3 text-left font-medium">Email</th>
            <th class="px-6 py-3 text-left font-medium">Adresse</th>
            <th class="px-6 py-3 text-left font-medium">Entreprise</th>
            <th class="px-6 py-3 text-left font-medium"></th>
          </tr>
        </thead>
        <!-- HEAD end -->
        <!-- BODY start -->
        <tbody class="bg-white">
          <ClientRow
            v-for="client, index in getClientsInAlphabeticalOrder()"
            :client="client"
            :key="client.id"
            :class="[index % 2 == 0 ? 'bg-white' : 'bg-gray-100']"
          ></ClientRow>
        </tbody>
        <!-- BODY end -->
      </table>
    </div>
  </div>
  <Modal ref="modal">
    <template v-slot:title>
      <h1>Ajouter un nouveau client</h1>
    </template>

    <ClientForm ref="clientForm"></ClientForm>

    <template v-slot:footer>
      <Button type="submit" @click="modal?.toggle">Annuler</Button>
      <Button type="submit" @click="onSubmit(), modal?.toggle()">Enregistrer</Button>
    </template>
  </Modal>
</template>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>