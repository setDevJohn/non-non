export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  heightCm?: number; // cm
  weightKg?: number; // kg
  hydrationMode: '28ml' | '35ml';
  hydrationGoalMl: number;
  birthDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  name?: string;
  photoUrl?: string;
  heightCm?: number;
  weightKg?: number;
  hydrationMode?: '28ml' | '35ml';
  birthDate?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  height?: number;
  weight?: number;
  birthDate?: string;
  hydrationOption?: '28ml/kg' | '35ml/kg';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  userId: string;
  email: string;
  name: string;
}

export interface UserStats {
  totalWorkouts: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  badgesEarned: number;
  totalHydrationMl: number;
  hydrationGoalsMet: number;
}
