export type WorkoutType = 'gym' | 'running' | 'walking' | 'home' | 'bike' | 'other';

export interface Workout {
  id: string;
  userId: string;
  eventId?: string;
  photo?: string;
  type: WorkoutType;
  duration: number; // minutes
  notes?: string;
  date: string;
  points: number;
  createdAt: string;
}

export interface CreateWorkoutData {
  photo?: string;
  type: WorkoutType;
  duration: number;
  notes?: string;
  eventId?: string;
}
