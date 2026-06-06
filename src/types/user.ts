export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  heightCm: number; // cm
  weightKg: number; // kg
  birthDate: string;
  hydrationMode: '28ml' | '35ml';
  photoUrl?: string;
  daysTrainedMonth: number;
  daysTrainedTotal: number;
  hydrationGoalsCompleted: number;
  totalPoints: number;
  currentRanking?: number;
  createdAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  heightCm?: number;
  weightKg?: number;
  birthDate?: string;
  hydrationOption?: '28ml/kg' | '35ml/kg';
  photoUrl?: string;
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
