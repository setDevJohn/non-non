import { create } from 'zustand';
import { Event, CreateEventData, Participant } from '@/types';
import { eventService } from '@/services';

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<void>;
  createEvent: (data: CreateEventData) => Promise<void>;
  inviteParticipants: (eventId: string, userIds: string[]) => Promise<void>;
  confirmParticipation: (eventId: string) => Promise<void>;
  removeParticipant: (eventId: string, userId: string) => Promise<void>;
  setCurrentEvent: (event: Event | null) => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  currentEvent: null,
  isLoading: false,
  
  fetchEvents: async () => {
    set({ isLoading: true });
    try {
      const events = await eventService.getEvents();
      set({ events, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  fetchEventById: async (id: string) => {
    set({ isLoading: true });
    try {
      const event = await eventService.getEventById(id);
      set({ currentEvent: event, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  createEvent: async (data: CreateEventData) => {
    set({ isLoading: true });
    try {
      const newEvent = await eventService.createEvent(data);
      set((state) => ({ events: [...state.events, newEvent], isLoading: false }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  inviteParticipants: async (eventId: string, userIds: string[]) => {
    set({ isLoading: true });
    try {
      await eventService.inviteParticipants(eventId, userIds);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  confirmParticipation: async (eventId: string) => {
    set({ isLoading: true });
    try {
      await eventService.confirmParticipation(eventId);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  removeParticipant: async (eventId: string, userId: string) => {
    set({ isLoading: true });
    try {
      await eventService.removeParticipant(eventId, userId);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  setCurrentEvent: (event) => {
    set({ currentEvent: event });
  },
}));
