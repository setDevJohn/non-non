import api from './api';
import { User } from '@/types';
import { showToast } from '@/utils/toast';

export const userService = {
  getMe: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateMe: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch('/users/me', data);
    showToast.success('Perfil atualizado com sucesso!');
    return response.data;
  },

  getMyStats: async (): Promise<any> => {
    const response = await api.get('/users/me/stats');
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};
