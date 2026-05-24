import { create } from 'zustand';
import { HydrationRecord, HydrationLog, AddHydrationData } from '@/types';

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
      // Mock data - will be replaced with API call
      const today = new Date().toISOString().split('T')[0];
      const mockRecord: HydrationRecord = {
        id: '1',
        userId: '1',
        date: today,
        amount: 1500,
        goal: 2625, // 75kg * 35ml/kg
        completed: false,
        records: [
          { id: '1', amount: 500, timestamp: new Date().toISOString() },
          { id: '2', amount: 500, timestamp: new Date().toISOString() },
          { id: '3', amount: 500, timestamp: new Date().toISOString() },
        ],
        createdAt: new Date().toISOString(),
      };
      set({ todayRecord: mockRecord, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  addHydration: async (data: AddHydrationData) => {
    set({ isLoading: true });
    try {
      const state = get();
      if (!state.todayRecord) return;
      
      const newLog: HydrationLog = {
        id: Date.now().toString(),
        amount: data.amount,
        timestamp: new Date().toISOString(),
      };
      
      const newAmount = state.todayRecord.amount + data.amount;
      const completed = newAmount >= state.todayRecord.goal;
      
      set({
        todayRecord: {
          ...state.todayRecord,
          amount: newAmount,
          completed,
          records: [...state.todayRecord.records, newLog],
        },
        isLoading: false,
      });
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
