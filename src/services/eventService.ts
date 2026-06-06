import api from './api';
import { Event, CreateEventData, UpdateEventStatusData, InviteParticipantData } from '@/types';
import { showToast } from '@/utils/toast';

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get('/events');
    return response.data;
  },

  getEventById: async (id: string): Promise<Event> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  getActiveEvent: async (): Promise<Event | null> => {
    const response = await api.get('/events');
    const events = response.data;
    const activeEvent = events.find((e: Event) => e.status === 'active');
    return activeEvent || null;
  },

  createEvent: async (data: CreateEventData): Promise<Event> => {
    const activeEvent = await eventService.getActiveEvent();
    if (activeEvent) {
      throw new Error('Você já está participando de um evento ativo. Saia do evento atual antes de criar um novo.');
    }
    const response = await api.post('/events', data);
    showToast.success('Evento criado com sucesso!');
    return response.data;
  },

  inviteParticipants: async (eventId: string, data: InviteParticipantData): Promise<void> => {
    await api.post(`/events/${eventId}/invite`, data);
    showToast.success('Convites enviados com sucesso!');
  },

  confirmParticipation: async (eventId: string): Promise<void> => {
    const activeEvent = await eventService.getActiveEvent();
    if (activeEvent && activeEvent.id !== eventId) {
      throw new Error('Você já está participando de um evento ativo. Saia do evento atual antes de participar de outro.');
    }
    await api.post(`/events/${eventId}/confirm`);
    showToast.success('Participação confirmada!');
  },

  updateStatus: async (eventId: string, data: UpdateEventStatusData): Promise<void> => {
    await api.patch(`/events/${eventId}/status`, data);
    showToast.success('Status do evento atualizado.');
  },
};
