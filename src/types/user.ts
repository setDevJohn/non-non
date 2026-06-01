export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  height: number; // cm
  weight: number; // kg
  birthDate: string;
  hydrationOption: '28ml/kg' | '35ml/kg';
  photo?: string;
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
  height: number;
  weight: number;
  birthDate: string;
  hydrationOption: '28ml/kg' | '35ml/kg';
  photo?: string;
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
