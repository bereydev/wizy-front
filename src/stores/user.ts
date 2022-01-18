import { acceptHMRUpdate, defineStore } from 'pinia'
import type { User } from "~/interface"
import fetchAPI from "./fetch"

export const useUserStore = defineStore('user', () => {

  // ************** STATE ************** 
  /**
   * Current named of the user.
   */
  const currentUser = ref<User>()

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
    const data = await fetchAPI<any>('/login/access-token/')
    localStorage.setItem("access-token", data.access_token)
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
    const params = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    }
    const data = await fetchAPI<User>('/users/open', {method:'post', data: params});
    currentUser.value = data
    login(email, password)

  }

  function logout() {
    currentUser.value = undefined
    localStorage.setItem('access-token', '')
  }

  async function getCurrentUser() {
    const data = await fetchAPI<User>('users/me')
    currentUser.value = data
  }

  // ************** GETTERS ************** 

  function isLoggedIn() {
    const accessToken = localStorage.getItem('access-token')
    return accessToken && accessToken.length > 0
  }


  return {
    currentUser,
    login,
    logout,
    register,
    getCurrentUser,
    isLoggedIn
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
