import { create } from 'zustand';
import { User, LoginData, RegisterData } from '@/types';
import { authService } from '@/services';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingCompleted: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  onboardingCompleted: false,
  
  login: async (data: LoginData) => {
    set({ isLoading: true });
    try {
      const authResponse = await authService.login(data);
      
      // Get user details
      const user = await authService.getCurrentUser();
      
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
    set({ user: null, isAuthenticated: false, onboardingCompleted: false });
  },
  
  completeOnboarding: () => {
    set({ onboardingCompleted: true });
  },
  
  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));
