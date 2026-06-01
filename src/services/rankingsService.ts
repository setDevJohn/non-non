import api from './api';

export const rankingsService = {
  getWeeklyRanking: async (eventId?: string): Promise<any> => {
    const url = eventId ? `/rankings/weekly?eventId=${eventId}` : '/rankings/weekly';
    const response = await api.get(url);
    return response.data;
  },

  getEventRanking: async (eventId: string): Promise<any> => {
    const response = await api.get(`/rankings/event/${eventId}`);
    return response.data;
  },

  getUserPosition: async (eventId?: string): Promise<any> => {
    const url = eventId ? `/rankings/position/me?eventId=${eventId}` : '/rankings/position/me';
    const response = await api.get(url);
    return response.data;
  },
};
