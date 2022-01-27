import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Tool} from "~/interface"
import fetchAPI from './fetch'
import {addToStore, deleteInStore, updateInStore} from './crud-utils'

export const useToolStore = defineStore('tool', () => {

  // ************** STATE ************** 
  /**
   * Tools of the user
   */
  const tools = ref<Array<Tool>>([])

  // ************** ACTIONS ************** 

  async function getTools() {
    const data = await fetchAPI<Array<Tool>>('tools')
    tools.value = data
  }

  async function createTool(tool: Tool) {
    const newTool = await fetchAPI<Tool>('tools', {method:'post', data:{ ...tool }})
    addToStore(tools, newTool)
  }
  async function updateTool(tool: Tool) {
    const updatedTool = await fetchAPI<Tool>(`tools/${tool.id}`, {method:'put', data:{ ...tool }})
    updateInStore(tools, updatedTool)
  }

  async function deleteTool(toolId: string) {
    const deletedTool = await fetchAPI<Tool>(`tools/${toolId}`, {method:'delete'})
    deleteInStore(tools, deletedTool)
  }

  async function toggleFavTool(tool: Tool) {
    const newFavValue = !tool.fav
    const updatedTool = await fetchAPI<Tool>(`tools/${tool.id}/fav`,{method:'put', params: { fav: newFavValue }})
    const updatedToolIndex = tools.value.findIndex(tool => tool.id == updatedTool.id);
    tools.value[updatedToolIndex].fav = newFavValue;
  }

  // ************** GETTERS ************** 
  function getToolByID(id: string): Tool | undefined {
    return tools.value.find(x => x.id === id);
  }

  function getFavTools(): Array<Tool> {
    return tools.value.filter(tool => tool.fav == true).sort((a, b) => a.name.localeCompare(b.name))
  }

  function getNonFavTools(): Array<Tool> {
    return tools.value.filter(tool => tool.fav == false).sort((a, b) => a.name.localeCompare(b.name))
  }


  return {
    tools,
    getTools,
    createTool,
    updateTool,
    deleteTool,
    toggleFavTool,
    getToolByID,
    getFavTools,
    getNonFavTools,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useToolStore, import.meta.hot))
