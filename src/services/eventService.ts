import api from './api';
import { Event, CreateEventData } from '@/types';
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

  inviteParticipants: async (eventId: string, userIds: string[]): Promise<void> => {
    await api.post(`/events/${eventId}/invite`, { userIds });
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

  removeParticipant: async (eventId: string, participantId: string): Promise<void> => {
    await api.delete(`/events/${eventId}/participants/${participantId}`);
    showToast.success('Participante removido.');
  },

  updateStatus: async (eventId: string, status: string): Promise<void> => {
    await api.patch(`/events/${eventId}/status`, { status });
    showToast.success('Status do evento atualizado.');
  },

  promoteAdmin: async (eventId: string, userId: string): Promise<void> => {
    await api.post(`/events/${eventId}/promote`, { userId });
    showToast.success('Administrador promovido com sucesso!');
  },
};
