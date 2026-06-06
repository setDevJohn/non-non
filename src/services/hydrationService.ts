import api from './api';
import { HydrationRecord, AddHydrationData, HydrationStats, HydrationLog } from '@/types';
import { showToast } from '@/utils/toast';

export const hydrationService = {
  getMyHydration: async (): Promise<HydrationRecord[]> => {
    const response = await api.get('/hydration/me');
    return response.data;
  },

  getTodayHydration: async (): Promise<HydrationStats> => {
    const response = await api.get('/hydration/today');
    return response.data;
  },

  getWeeklyHydration: async (): Promise<HydrationStats> => {
    const response = await api.get('/hydration/weekly');
    return response.data;
  },

  addHydration: async (data: AddHydrationData): Promise<HydrationLog> => {
    const response = await api.post('/hydration', { amountMl: data.amountMl });
    showToast.success('Hidratação registrada!');
    return response.data;
  },

  deleteLog: async (id: string): Promise<void> => {
    await api.delete(`/hydration/${id}`);
    showToast.success('Registro removido.');
  },
};
