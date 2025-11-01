import axios from "axios"


export const API_BASE_URL = "https://apirest-java-tomobile.onrender.com"


export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
})


api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error("[API Request Error]", error)
    return Promise.reject(error)
  },
)


api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    if (error.response) {
      console.error(`[API Error] ${error.response.status} ${error.config.url}`, error.response.data)
    } else if (error.request) {
      console.error("[API Error] No response received", error.request)
    } else {
      console.error("[API Error]", error.message)
    }
    return Promise.reject(error)
  },
)
