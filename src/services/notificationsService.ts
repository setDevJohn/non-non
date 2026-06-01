import api from './api';
import { showToast } from '@/utils/toast';

export const notificationsService = {
  getUserNotifications: async (page = 1, limit = 20): Promise<any> => {
    const response = await api.get(`/notifications/me?page=${page}&limit=${limit}`);
    return response.data;
  },

  markAsRead: async (notificationId: string): Promise<any> => {
    const response = await api.post(`/notifications/${notificationId}/read`);
    return response.data;
  },

  markAllAsRead: async (): Promise<any> => {
    const response = await api.post('/notifications/read-all');
    showToast.success('Todas as notificações marcadas como lidas');
    return response.data;
  },

  deleteNotification: async (notificationId: string): Promise<any> => {
    const response = await api.delete(`/notifications/${notificationId}`);
    showToast.success('Notificação removida');
    return response.data;
  },
};
