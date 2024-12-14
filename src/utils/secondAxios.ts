import axios from 'axios'

// Define a function that creates a new Axios instance with custom configuration.
const createCustomInstance = (endpoint: any, token: string | null) => {
  if (!endpoint) {
    endpoint = window.localStorage.getItem('endPointOfClient')
  }
  if (!token) {
    token = window.localStorage.getItem('tokenOfClient')
  }
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  // Create a new Axios instance with the provided endpoint and headers.
  const customInstance = axios.create({
    baseURL: endpoint,
    headers,
    // withCredentials: true,
  })

  // Add an interceptor to set the authorization token if provided.
  customInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // Add response interceptor to handle errors.
  customInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        throw error
      } else {
        throw new Error('Something went wrong')
      }
    },
  )

  return customInstance
}

export default createCustomInstance
