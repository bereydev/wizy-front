import { acceptHMRUpdate, defineStore } from 'pinia'
import type { User } from "~/interface"
import fetchAPI from "./fetch"
import qs from "qs"

export const useUserStore = defineStore('user', () => {

  // ************** STATE ************** 
  /**
   * Current named of the user.
   */
  const currentUser = ref<User>()
  const accessToken = ref("")

  // ************** ACTIONS ************** 
  /**
     * Login the user.
     * @username
     * @password
     */
  async function login(username: string, password: string) {
    const credentials = {
      "username": username,
      "password": password
    }
    const data = await fetchAPI<any>('/login/access-token/',
      {
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(credentials),
      })
    console.log(data)
    accessToken.value = data.access_token
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
    const newUser = await fetchAPI<User>('/users/open', { method: 'post', data: params });
    currentUser.value = newUser
    console.log(email)
    console.log(password)
    await login(email, password)

  }

  function logout() {
    currentUser.value = undefined
    accessToken.value = ""
  }

  async function getCurrentUser() {
    const data = await fetchAPI<User>('users/me')
    currentUser.value = data
  }

  // ************** GETTERS ************** 

  function isLoggedIn() {
    return accessToken.value && accessToken.value.length > 0
  }


  // Handle the redirect of the user if he is not logged in


  return {
    currentUser,
    accessToken,
    login,
    logout,
    register,
    getCurrentUser,
    isLoggedIn
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
