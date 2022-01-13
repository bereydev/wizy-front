<script setup lang="ts">
import type { Tool } from "~/interface"
import { useUserStore } from '~/stores/user'
import Modal from '../components/Modal.vue'
import ToolForm from '../components/forms/ToolForm.vue'

interface Props {
  tool: Tool;
}

const user = useUserStore()
const router = useRouter()

const { toggleFavTool, deleteTool } = user

const editModal = ref<InstanceType<typeof Modal>>()
const deleteModal = ref<InstanceType<typeof Modal>>()
const toolForm = ref<InstanceType<typeof ToolForm>>()

const props = defineProps<Props>()

const { tool } = toRefs(props)

const openTool= () => {
    if (tool.value.id)
        router.push(`/tool/${encodeURIComponent(tool.value.id)}`)
}
</script>

<template>
  <div class="relative">
    <div @click="openTool"
      class="shadow-md hover:shadow-xl overflow-hidden rounded-xl transition-shadow duration-200 ease-in-out cursor-pointer"
    >
      <div class="relative">
        <img src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />

        <div class="p-4 bg-white font-bold text-xl">{{ tool.name }}</div>
        <!-- Futur tags integration -->

        <!-- <div class="px-6 py-4">
      <span
        v-for="tag, index in tool.tags?.data"
        :key="index"
        class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2"
      >{{ tag }}</span>
        </div>-->
      </div>
      <div class="absolute top-2 left-2 cursor-pointer" @click.stop="toggleFavTool(tool)">
        <ph:star-fill class="w-10 h-10 text-yellow-400" v-if="tool.fav" />
        <ph:star class="w-10 h-10 text-yellow-400" v-else />
      </div>
      <div class="absolute top-2 right-2 cursor-pointer">
        <div class="dropdown inline-block relative">
          <button @click.stop="" class="flex justify-center items-center w-10 h-10 bg-white rounded-full">
            <majesticons:dots-vertical-line class="w-7 h-7" />
          </button>
          <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 z-50 shadow-md rounded">
            <li class>
              <a
                class="rounded-t bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >Afficher</a>
            </li>
            <li class>
              <a
                class="bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
                @click.stop="editModal?.toggle"
              >Editer</a>
            </li>
            <li class>
              <a
                class="rounded-b bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
                @click.stop="deleteModal?.toggle"
              >Supprimer</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Modal ref="editModal">
      <template v-slot:title>
        <h1>Ajouter un nouvel outil</h1>
      </template>
      <ToolForm :tool_placeholder="tool" ref="toolForm"></ToolForm>
      <template v-slot:footer>
        <Button @click="editModal?.toggle">Annuler</Button>
        <Button @click="editModal?.toggle(), toolForm?.submitUpdate()">Enregister</Button>
      </template>
    </Modal>
    <Modal ref="deleteModal">
      <template v-slot:title>
        <h1>Supprimer un client</h1>
      </template>
      <p>Etes vous sur de vouloir supprimer l'outil {{ tool.name }}?</p>
      <p>La suppression d'un outil entraine la suppriession de tous les docuement qui y sont lié et il ne sera plus accessible pour vos clients</p>
      <template v-slot:footer>
        <Button @click="deleteModal?.toggle">Annuler</Button>
        <Button @click="deleteTool(tool.id!), deleteModal?.toggle()">Supprimer</Button>
      </template>
    </Modal>
  </div>
</template>

<style>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>