import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from "axios";
import type { Client, Tool, Event, EventModel } from "~/interface"
import { start } from 'nprogress';

export const useUserStore = defineStore('user', () => {

  // ************** STATE ************** 
  /**
   * Current named of the user.
   */
  const currentUser = ref({})
  const isLoggedIn = ref(false)
  const clients = ref<Array<Client>>([])
  const accessToken = ref<string>("")
  const tools = ref<Array<Tool>>([])
  const events = ref<Array<Event>>([])
  const eventModels = ref<Array<EventModel>>([])

  // ************** ACTIONS ************** 
  /**
     * Login the user.
     * @username
     * @password
     */
  async function login(username: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    const response = await axios.post("/login/access-token/", params);
    isLoggedIn.value = true
    accessToken.value = response.data.access_token
    await getCurrentUser()
  }

  /**
   * Register the user.
   * @email
   * @password
   * @firstName
   * @lastName
   */
  async function register(email: string, password: string, firstName: string, lastName: string) {
    const response = await axios.post("/users/open", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    currentUser.value = response.data
    login(email, password)

  }

  function logout() {
    currentUser.value = {}
    isLoggedIn.value = false
    clients.value = []
    accessToken.value = ""
    tools.value = []
  }

  async function getCurrentUser() {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.get("users/me", config)
    currentUser.value = response.data
    await getClients()
    await getTools()
    await getEvents()
    await getEventModels()
  }

  async function getClients() {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.get("clients/", config)
    clients.value = response.data
  }

  async function createClient(client: Client) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.post("clients", { ...client }, config)
    await getClients()
  }
  async function updateClient(client: Client) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.put(`clients/${client.id}`, { ...client }, config)
    await getClients()
    console.table(response.data)
  }

  async function deleteClient(clientId: string) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.delete(`clients/${clientId}`, config)
    await getClients()
  }

  async function getTools() {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` },
    };
    const response = await axios.get("/tools", config)
    tools.value = response.data
    console.table(response.data)
  }

  async function createTool(tool: Tool) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.post("/tools", { ...tool }, config);
    await getTools()
    console.table(response.data)
  }
  async function updateTool(tool: Tool) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.put(`tools/${tool.id}`, { ...tool }, config);
    await getTools()
    console.table(response.data)
  }

  async function deleteTool(toolId: string) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.delete(`tools/${toolId}`, config);
    await getTools()
    console.table(response.data)
  }

  async function toggleFavTool(tool: Tool) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.put(`tools/${tool.id}`, { fav: !tool.fav }, config)
    await getTools()
    console.table(response.data)
  }

  async function getEventModels() {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.get("event_models/", config)
    eventModels.value = response.data
  }

  async function getEvents() {
    const config = {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    };
    const response = await axios.get("events/", config)
    let eventList = response.data

    eventList.forEach(event => {
      event.start = new Date(event.start)
      event.end = new Date(event.end)
    })
    events.value = eventList
    
  }


  async function createEvent(event: Event) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
      params: {
        event_model_id: event.event_model_id,
        client_id: event.client_id,
      }
    };
    const response = await axios.post("events", { ...event }, config)
    console.log("###### EVENT")
    console.table(response.data)
    await getEvents()
  }

  // ************** GETTERS ************** 

  function getClientByID(id: string): Client | undefined {
    return clients.value.find(x => x.id === id);
  }

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
    currentUser,
    clients,
    tools,
    isLoggedIn,
    accessToken,
    events,
    eventModels,
    login,
    logout,
    register,
    getCurrentUser,
    getClients,
    createClient,
    updateClient,
    deleteClient,
    getTools,
    createTool,
    updateTool,
    deleteTool,
    toggleFavTool,
    getClientByID,
    getToolByID,
    getFavTools,
    getNonFavTools,
    getEvents,
    createEvent
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
