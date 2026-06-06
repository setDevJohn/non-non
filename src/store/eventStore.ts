import { create } from 'zustand';
import { Event, CreateEventData, InviteParticipantData, UpdateEventStatusData } from '@/types';
import { eventService } from '@/services';

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<void>;
  createEvent: (data: CreateEventData) => Promise<void>;
  inviteParticipants: (eventId: string, data: InviteParticipantData) => Promise<void>;
  confirmParticipation: (eventId: string) => Promise<void>;
  updateStatus: (eventId: string, data: UpdateEventStatusData) => Promise<void>;
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
  
  inviteParticipants: async (eventId: string, data: InviteParticipantData) => {
    set({ isLoading: true });
    try {
      await eventService.inviteParticipants(eventId, data);
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
  
  updateStatus: async (eventId: string, data: UpdateEventStatusData) => {
    set({ isLoading: true });
    try {
      await eventService.updateStatus(eventId, data);
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
