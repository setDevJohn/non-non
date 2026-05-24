export interface HydrationRecord {
  id: string;
  userId: string;
  date: string;
  amount: number; // ml
  goal: number; // ml
  completed: boolean;
  records: HydrationLog[];
  createdAt: string;
}

export interface HydrationLog {
  id: string;
  amount: number;
  timestamp: string;
}

export interface AddHydrationData {
  amount: number;
}
