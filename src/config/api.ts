import axios from "axios"

// Base URL from the Postman collection
export const API_BASE_URL = "http://10.0.2.2:8080"

// Create axios instance with default configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
})

// Request interceptor for logging
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

// Response interceptor for logging and error handling
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
