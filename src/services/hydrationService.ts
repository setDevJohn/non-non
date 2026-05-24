import api from './api';
import { HydrationRecord, AddHydrationData } from '@/types';

export const hydrationService = {
  getTodayRecord: async (userId: string): Promise<HydrationRecord> => {
    const response = await api.get(`/hydration/today/${userId}`);
    return response.data;
  },

  addHydration: async (data: AddHydrationData): Promise<HydrationRecord> => {
    const response = await api.post('/hydration/add', data);
    return response.data;
  },
};
