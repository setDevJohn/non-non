import { create } from 'zustand';
import { HydrationRecord, HydrationLog, AddHydrationData, HydrationStats } from '@/types';
import { hydrationService } from '@/services';

interface HydrationState {
  todayStats: HydrationStats | null;
  isLoading: boolean;
  fetchTodayStats: () => Promise<void>;
  addHydration: (data: AddHydrationData) => Promise<void>;
  calculateDailyGoal: (weight: number, option: '28ml/kg' | '35ml/kg') => number;
}

export const useHydrationStore = create<HydrationState>((set, get) => ({
  todayStats: null,
  isLoading: false,
  
  fetchTodayStats: async () => {
    set({ isLoading: true });
    try {
      const stats = await hydrationService.getTodayHydration();
      set({ todayStats: stats, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  addHydration: async (data: AddHydrationData) => {
    set({ isLoading: true });
    try {
      await hydrationService.addHydration(data);
      
      // Refresh the stats
      const stats = await hydrationService.getTodayHydration();
      set({ todayStats: stats, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  calculateDailyGoal: (weight: number, option: '28ml/kg' | '35ml/kg') => {
    const multiplier = option === '28ml/kg' ? 28 : 35;
    return Math.round(weight * multiplier);
  },
}));
