import { create } from 'zustand';
import { badgesService } from '@/services';

interface BadgesState {
  allBadges: any[];
  userBadges: any[];
  isLoading: boolean;
  fetchAllBadges: () => Promise<void>;
  fetchUserBadges: () => Promise<void>;
  checkAndAwardBadges: (userId: string) => Promise<void>;
}

export const useBadgesStore = create<BadgesState>((set) => ({
  allBadges: [],
  userBadges: [],
  isLoading: false,

  fetchAllBadges: async () => {
    set({ isLoading: true });
    try {
      const badges = await badgesService.getAllBadges();
      set({ allBadges: badges, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchUserBadges: async () => {
    set({ isLoading: true });
    try {
      const userBadges = await badgesService.getUserBadges();
      set({ userBadges, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  checkAndAwardBadges: async (userId: string) => {
    try {
      const awardedBadges = await badgesService.checkAndAwardBadges(userId);
      set((state) => ({ userBadges: [...state.userBadges, ...awardedBadges] }));
    } catch (error) {
      throw error;
    }
  },
}));
