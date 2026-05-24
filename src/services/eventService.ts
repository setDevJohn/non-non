import api from './api';
import { Event, CreateEventData } from '@/types';

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get('/events');
    return response.data;
  },

  getEventById: async (id: string): Promise<Event> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (data: CreateEventData): Promise<Event> => {
    const response = await api.post('/events', data);
    return response.data;
  },

  joinEvent: async (eventId: string): Promise<void> => {
    await api.post(`/events/${eventId}/join`);
  },

  leaveEvent: async (eventId: string): Promise<void> => {
    await api.post(`/events/${eventId}/leave`);
  },

  removeParticipant: async (eventId: string, userId: string): Promise<void> => {
    await api.delete(`/events/${eventId}/participants/${userId}`);
  },
};
