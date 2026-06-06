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
  pointsEarned: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkoutData {
  workoutType: string;
  duration: number;
  notes?: string;
  imageUrl?: string;
  workoutDate?: string;
  eventId?: string;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  totalPoints: number;
  averageDuration: number;
}
