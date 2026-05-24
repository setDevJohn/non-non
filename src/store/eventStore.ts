import { create } from 'zustand';
import { Event, CreateEventData, Participant } from '@/types';

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<void>;
  createEvent: (data: CreateEventData) => Promise<void>;
  joinEvent: (eventId: string) => Promise<void>;
  leaveEvent: (eventId: string) => Promise<void>;
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
      // Mock data - will be replaced with API call
      const mockEvents: Event[] = [
        {
          id: '1',
          name: 'Desafio Verão 2024',
          description: 'Competição de verão para ficar em forma',
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          entryValue: 50,
          maxParticipants: 20,
          isPublic: true,
          status: 'active',
          participants: [
            { userId: '1', userName: 'João Silva', points: 150, ranking: 1 },
            { userId: '2', userName: 'Maria Santos', points: 140, ranking: 2 },
            { userId: '3', userName: 'Pedro Costa', points: 130, ranking: 3 },
          ],
          admins: ['1'],
          createdBy: '1',
          prizePool: 1000,
          createdAt: '2023-12-01T00:00:00Z',
        },
        {
          id: '2',
          name: 'Desafio Corporativo',
          description: 'Competição entre empresas',
          startDate: '2024-02-01',
          endDate: '2024-02-28',
          entryValue: 100,
          maxParticipants: 50,
          isPublic: false,
          status: 'pending',
          participants: [],
          admins: ['1'],
          createdBy: '1',
          createdAt: '2024-01-15T00:00:00Z',
        },
      ];
      set({ events: mockEvents, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  fetchEventById: async (id: string) => {
    set({ isLoading: true });
    try {
      // Mock data - will be replaced with API call
      const mockEvent: Event = {
        id,
        name: 'Desafio Verão 2024',
        description: 'Competição de verão para ficar em forma',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        entryValue: 50,
        maxParticipants: 20,
        isPublic: true,
        status: 'active',
        participants: [
          { userId: '1', userName: 'João Silva', points: 150, ranking: 1 },
          { userId: '2', userName: 'Maria Santos', points: 140, ranking: 2 },
          { userId: '3', userName: 'Pedro Costa', points: 130, ranking: 3 },
        ],
        admins: ['1'],
        createdBy: '1',
        prizePool: 1000,
        createdAt: '2023-12-01T00:00:00Z',
      };
      set({ currentEvent: mockEvent, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  createEvent: async (data: CreateEventData) => {
    set({ isLoading: true });
    try {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...data,
        status: 'pending',
        participants: [],
        admins: [],
        createdBy: '1',
        createdAt: new Date().toISOString(),
      };
      set((state) => ({ events: [...state.events, newEvent], isLoading: false }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  joinEvent: async (eventId: string) => {
    set({ isLoading: true });
    try {
      // Mock implementation
      set((state) => ({
        events: state.events.map((event) =>
          event.id === eventId
            ? { ...event, participants: [...event.participants] }
            : event
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  leaveEvent: async (eventId: string) => {
    set({ isLoading: true });
    try {
      // Mock implementation
      set((state) => ({
        events: state.events.map((event) =>
          event.id === eventId
            ? { ...event, participants: event.participants.filter((p) => p.userId !== '1') }
            : event
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  removeParticipant: async (eventId: string, userId: string) => {
    set({ isLoading: true });
    try {
      set((state) => ({
        events: state.events.map((event) =>
          event.id === eventId
            ? { ...event, participants: event.participants.filter((p) => p.userId !== userId) }
            : event
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  setCurrentEvent: (event) => {
    set({ currentEvent: event });
  },
}));
