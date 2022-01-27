import axios, { AxiosRequestConfig } from 'axios';
import { useUserStore } from './user'

axios.defaults.baseURL = "http://localhost/api/v1/";

export default async function fetchAPI<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const userStore = useUserStore()

  if (!config)
    config = { method: 'GET' }
  config.headers = { Authorization: `Bearer ${userStore.accessToken}` }
  config.url = url

  const response = await axios(config)
  return response.data

}
