import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Tool} from "~/interface"
import fetchAPI from './fetch'

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
    const data = await fetchAPI<Tool>('tools', {method:'post', data:{ ...tool }})
    await getTools()
  }
  async function updateTool(tool: Tool) {
    const data = await fetchAPI<Tool>(`tools/${tool.id}`, {method:'put', data:{ ...tool }})
    await getTools()
  }

  async function deleteTool(toolId: string) {
    const data = await fetchAPI<Tool>(`tools/${toolId}`, {method:'delete'})
    await getTools()
  }

  async function toggleFavTool(tool: Tool) {
    const data = await fetchAPI<Tool>(`tools/${tool.id}/fav`,{method:'put', params: { fav: !tool.fav }})
    await getTools()
  }

  // ************** GETTERS ************** 
  function getToolByID(id: string): Tool | undefined {
    return tools.value.find(x => x.id === id);
  }

  function getFavTools(): Array<Tool> {
    return tools.value.filter(tool => tool.fav == true)
  }

  function getNonFavTools(): Array<Tool> {
    return tools.value.filter(tool => tool.fav == false)
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
