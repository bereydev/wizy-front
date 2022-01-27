import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = "http://localhost/api/v1/";

export const ACCESS_TOKEN = "access-token";

export default async function fetchAPI<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const state_json: any = localStorage.getItem("wizy-state")
  const state = state_json ? JSON.parse(state_json) : undefined
  const accessToken = state && state.user && state.user.accessToken ? state.user.accessToken : "";

  if (!config)
    config = { method: 'GET' }
  config.headers = { Authorization: `Bearer ${accessToken}` }
  config.url = url

  const response = await axios(config)
  return response.data

}
