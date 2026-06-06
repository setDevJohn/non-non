import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { showToast } from '@/utils/toast';

console.log( process.env.EXPO_PUBLIC_API_URL)

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.6:3000' 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from secure store:', error);
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
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      try {
        await SecureStore.deleteItemAsync('accessToken');
        showToast.error('Sessão expirada. Faça login novamente.');
      } catch (e) {
        console.error('Error clearing token:', e);
      }
    } else if (error.response) {
      // Handle other HTTP errors
      const errorMessage = error.response.data?.message || 'Ocorreu um erro na requisição';
      const errors = error.response.data?.errors;
      
      if (errors && Array.isArray(errors) && errors.length > 0) {
        showToast.error(errors[0]);
      } else {
        showToast.error(errorMessage);
      }
    } else if (error.request) {
      // Network error
      showToast.error('Erro de conexão. Verifique sua internet.');
    } else {
      // Other errors
      showToast.error('Ocorreu um erro inesperado.');
    }
    
    return Promise.reject(error);
  }
);

export const setAuthToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync('accessToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const clearAuthToken = async () => {
  try {
    await SecureStore.deleteItemAsync('accessToken');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync('accessToken');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export default api;
