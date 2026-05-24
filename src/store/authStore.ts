import { create } from 'zustand';
import { User, LoginData, RegisterData } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingCompleted: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
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
      // Mock login - will be replaced with API call
      const mockUser: User = {
        id: '1',
        name: 'Usuário Teste',
        email: data.email,
        password: data.password,
        height: 175,
        weight: 75,
        birthDate: '1990-01-01',
        hydrationOption: '35ml/kg',
        daysTrainedMonth: 15,
        daysTrainedTotal: 120,
        hydrationGoalsCompleted: 45,
        totalPoints: 250,
        currentRanking: 3,
        createdAt: new Date().toISOString(),
      };
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  register: async (data: RegisterData) => {
    set({ isLoading: true });
    try {
      // Mock register - will be replaced with API call
      const mockUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        password: data.password,
        height: data.height,
        weight: data.weight,
        birthDate: data.birthDate,
        hydrationOption: data.hydrationOption,
        photo: data.photo,
        daysTrainedMonth: 0,
        daysTrainedTotal: 0,
        hydrationGoalsCompleted: 0,
        totalPoints: 0,
        createdAt: new Date().toISOString(),
      };
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false, onboardingCompleted: false });
  },
  
  completeOnboarding: () => {
    set({ onboardingCompleted: true });
  },
  
  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));
