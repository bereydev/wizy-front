import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = "http://localhost/api/v1/";

export default async function fetchAPI<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const accessToken = localStorage.getItem('access-token') ? localStorage.getItem('access-token') : '';

  if (config)
    config.headers = { Authorization: `Bearer ${accessToken}` }
  else
    config = {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}`}
    }
    
  config.url = url

  const response = await axios(config)
  return response.data
}