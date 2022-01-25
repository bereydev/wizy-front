<script setup lang="ts">
import Modal from '../components/Modal.vue'
import ToolForm from '../components/forms/ToolForm.vue'
import { useToolStore } from '~/stores/tool'
import { ACCESS_TOKEN } from '~/stores/fetch'


const toolStore = useToolStore()
const { getTools, getFavTools, getNonFavTools } = toolStore
const router = useRouter()

onMounted(async () => {
    try {
    await getTools
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
const createModal = ref<InstanceType<typeof Modal>>()
const toolForm = ref<InstanceType<typeof ToolForm>>()

</script>

<template>
  <h1>Outils</h1>
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
      <Button @click="createModal?.toggle">Ajouter un outil</Button>
      <Modal ref="createModal">
        <template v-slot:title>
          <h1>Ajouter un nouvel outil</h1>
        </template>
        <ToolForm ref="toolForm"></ToolForm>
        <template v-slot:footer>
          <Button @click="createModal?.toggle">Annuler</Button>
          <Button @click="createModal?.toggle(), toolForm?.submitCreate()">Enregister</Button>
        </template>
      </Modal>
    </div>
  </div>
  <div v-if="getFavTools() && getFavTools().length">
    <h2>Favoris</h2>
    <div class="flex overflow-x-scroll pb-10 hide-scroll-bar">
      <div class="flex flex-nowrap">
        <div v-for="tool in getFavTools()" :key="tool.id" class="inline-block px-3">
          <div class="w-64 max-w-xs">
            <ToolCard :tool="tool" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="getNonFavTools() && getNonFavTools().length">
    <h2>Librairie</h2>
    <div class="flex flex-wrap justify-start">
      <div
        class="w-full px-3 py-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
        v-for="tool in getNonFavTools()"
        :key="tool.id"
        :tool="tool"
      >
        <ToolCard :tool="tool" />
      </div>
    </div>
  </div>
</template>

<style>
.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>