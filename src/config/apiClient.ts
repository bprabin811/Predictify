// src/api/apiClient.ts
import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8000",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add the token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Retrieve the token from local storage
    const token = localStorage?.getItem('token'); 

    if (token) {
      // Ensure headers are defined and add the token
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      } as any; // Cast to `any` to satisfy type constraints
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default apiClient;
