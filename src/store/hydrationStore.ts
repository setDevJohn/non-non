import { create } from 'zustand';
import { HydrationRecord, HydrationLog, AddHydrationData } from '@/types';
import { hydrationService } from '@/services';

interface HydrationState {
  todayRecord: HydrationRecord | null;
  isLoading: boolean;
  fetchTodayRecord: () => Promise<void>;
  addHydration: (data: AddHydrationData) => Promise<void>;
  calculateDailyGoal: (weight: number, option: '28ml/kg' | '35ml/kg') => number;
}

export const useHydrationStore = create<HydrationState>((set, get) => ({
  todayRecord: null,
  isLoading: false,
  
  fetchTodayRecord: async () => {
    set({ isLoading: true });
    try {
      const record = await hydrationService.getTodayHydration();
      set({ todayRecord: record, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  addHydration: async (data: AddHydrationData) => {
    set({ isLoading: true });
    try {
      await hydrationService.addHydration(data);
      
      // Refresh the record
      const record = await hydrationService.getTodayHydration();
      set({ todayRecord: record, isLoading: false });
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
