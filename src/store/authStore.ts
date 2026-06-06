import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginData, RegisterData } from '@/types';
import { authService } from '@/services';
import { getAuthToken } from '@/services/api';

const ONBOARDING_KEY = '@onboarding_completed';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingCompleted: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  checkOnboardingStatus: () => Promise<void>;
  clearOnboardingCache: () => Promise<void>;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  onboardingCompleted: false,
  
  login: async (data: LoginData) => {
    set({ isLoading: true });
    try {
      const authResponse = await authService.login(data);
      
      // Get user details
      const user = await authService.getCurrentUser();
      
      // Check onboarding status
      await get().checkOnboardingStatus();
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  register: async (data: RegisterData) => {
    set({ isLoading: true });
    try {
      const authResponse = await authService.register(data);
      
      // Get user details
      const user = await authService.getCurrentUser();
      
      // Check onboarding status (should be false for new users)
      await get().checkOnboardingStatus();
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    set({ user: null, isAuthenticated: false });
  },
  
  completeOnboarding: async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      set({ onboardingCompleted: true });
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  },
  
  checkOnboardingStatus: async () => {
    try {
      const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
      set({ onboardingCompleted: completed === 'true' });
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      set({ onboardingCompleted: false });
    }
  },

  clearOnboardingCache: async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
      set({ onboardingCompleted: false });
    } catch (error) {
      console.error('Error clearing onboarding cache:', error);
    }
  },
  
  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  checkAuth: async () => {
    try {
      const token = await getAuthToken();
      
      if (!token) {
        set({ isAuthenticated: false, user: null, isLoading: false });
        return;
      }

      // Try to get current user to verify token is valid
      try {
        const user = await authService.getCurrentUser();
        await get().checkOnboardingStatus();
        set({ user, isAuthenticated: true, isLoading: false });
      } catch (error) {
        // Token is invalid or expired
        console.error('Auth check failed:', error);
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },
}));
