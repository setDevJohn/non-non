import { create } from 'zustand';
import { rankingsService } from '@/services';

interface RankingsState {
  weeklyRanking: any[];
  eventRanking: any[];
  userPosition: { position: number | null; points: number } | null;
  isLoading: boolean;
  fetchWeeklyRanking: (eventId?: string) => Promise<void>;
  fetchEventRanking: (eventId: string) => Promise<void>;
  fetchUserPosition: (eventId?: string) => Promise<void>;
}

export const useRankingsStore = create<RankingsState>((set) => ({
  weeklyRanking: [],
  eventRanking: [],
  userPosition: null,
  isLoading: false,

  fetchWeeklyRanking: async (eventId?: string) => {
    set({ isLoading: true });
    try {
      const ranking = await rankingsService.getWeeklyRanking(eventId);
      set({ weeklyRanking: ranking, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchEventRanking: async (eventId: string) => {
    set({ isLoading: true });
    try {
      const ranking = await rankingsService.getEventRanking(eventId);
      set({ eventRanking: ranking, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchUserPosition: async (eventId?: string) => {
    set({ isLoading: true });
    try {
      const position = await rankingsService.getUserPosition(eventId);
      set({ userPosition: position, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
