<script setup lang="ts">
import { useClientStore } from '~/stores/client'
import { useUserStore } from '~/stores/user'
import ClientModal from '../components/ClientModal.vue'

const clientStore = useClientStore()
const userStore = useUserStore()
const { getClients, getClientsInAlphabeticalOrder } = clientStore
const { logout } = userStore
const router = useRouter()

onMounted(async () => {
  try {
    await getClients()
  } catch (error: any) {
    // console.error(error.response.status)
    // console.table(error.response.data.detail)
    // if (error.response.status == 403) {
    //   // Unvalidate the access token and redirect to login
    //   logout()
    //   router.push('/auth/login')
    // } else if (error.response.status == 422) {
    //   return
    // }
  }
})

const clientModal = ref<InstanceType<typeof ClientModal>>()

</script>

<template>
  
  <div class="py-2 flex justify-between ">
    <h1>Fichier client</h1>
      <input
        class="bg-gray-200 appearance-none border-2 w-60 max-w-60 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none mr-2 focus:bg-white focus:border-purple-500"
        id="inline-search"
        type="text"
        placeholder="Rechercher"
      />
      <va-button @click="clientModal?.toggle" :rounded="false" class="max-w-max">Ajouter un client</va-button>
  </div>
  <div class="my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
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
    <div
      v-if="getClientsInAlphabeticalOrder()?.length <= 0"
      class="w-full flex flex-col justify-center items-center p-30"
    >
    <h1>🥺</h1>
      <h1 class="font-weight-10 mb-5">Votre fichier client est vide</h1>
      <va-button @click="clientModal?.toggle" :rounded="false">🎉 Ajouter votre premier client 🎉</va-button>
    </div>
  </div>
  <ClientModal ref="clientModal"></ClientModal>
</template>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>