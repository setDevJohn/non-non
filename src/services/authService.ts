import api, { setAuthToken, clearAuthToken } from './api';
import { LoginData, RegisterData, AuthResponse } from '@/types';
import { showToast } from '@/utils/toast';

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    const { accessToken, userId, email, name } = response.data;
    
    // Store token securely
    await setAuthToken(accessToken);
    
    return { accessToken, userId, email, name };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    const { accessToken, userId, email, name } = response.data;
    
    // Store token securely
    await setAuthToken(accessToken);
    
    showToast.success('Conta criada com sucesso!');
    
    return { accessToken, userId, email, name };
  },

  logout: async (): Promise<void> => {
    await clearAuthToken();
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
