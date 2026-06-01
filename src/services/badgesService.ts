import api from './api';
import { showToast } from '@/utils/toast';

export const badgesService = {
  getAllBadges: async (): Promise<any> => {
    const response = await api.get('/badges');
    return response.data;
  },

  getUserBadges: async (): Promise<any> => {
    const response = await api.get('/badges/me');
    return response.data;
  },

  getBadgeById: async (id: string): Promise<any> => {
    const response = await api.get(`/badges/${id}`);
    return response.data;
  },

  checkAndAwardBadges: async (userId: string): Promise<any> => {
    const response = await api.post(`/badges/check/${userId}`);
    return response.data;
  },
};
