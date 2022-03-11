<script setup lang="ts">
import Modal from '../components/Modal.vue'
import ToolForm from '../components/forms/ToolForm.vue'
import { useToolStore } from '~/stores/tool'
import { useUserStore } from '~/stores/user';


const toolStore = useToolStore()
const userStore = useUserStore()
const { logout } = userStore
const { getTools, getFavTools, getNonFavTools } = toolStore
const router = useRouter()

onMounted(async () => {
  try {
    await getTools()
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
const createModal = ref<InstanceType<typeof Modal>>()
const toolForm = ref<InstanceType<typeof ToolForm>>()

</script>

<template>
  <div class="py-2 flex justify-between">
    <h1>Outils</h1>
    <input
      class="bg-gray-200 appearance-none border-2 w-60 max-w-60 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight mr-2 focus:outline-none focus:bg-white focus:border-purple-500"
      id="inline-search"
      type="text"
      placeholder="Rechercher"
    />
    <va-button @click="createModal?.toggle" :rounded="false" class="max-w-max">Ajouter un outil</va-button>
  </div>
  <div v-if="getFavTools() && getFavTools().length">
    <h2>Favoris</h2>
    <div class="flex overflow-x-scroll py-4 hide-scroll-bar">
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
        class="w-full px-3 max-w-xs py-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
        v-for="tool in getNonFavTools()"
        :key="tool.id"
        :tool="tool"
      >
        <ToolCard :tool="tool" />
      </div>
    </div>
  </div>
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