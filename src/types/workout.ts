export type WorkoutType = 'gym' | 'running' | 'walking' | 'home' | 'bike' | 'other';

export interface Workout {
  id: string;
  userId: string;
  eventId?: string;
  imageUrl?: string;
  workoutType: WorkoutType;
  duration: number; // minutes
  notes?: string;
  workoutDate?: string;
  date: string;
  points: number;
  createdAt: string;
}

export interface CreateWorkoutData {
  imageUrl?: string;
  workoutType: WorkoutType;
  duration: number;
  notes?: string;
  workoutDate?: string;
  eventId?: string;
}
