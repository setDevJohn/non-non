import axios from 'axios';

const API_BASE_URL = __DEV__ ? 'http://localhost:3000/api' : 'https://api.gymcompetition.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add token from storage if available
    const token = 'mock-token'; // Will be replaced with actual token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
