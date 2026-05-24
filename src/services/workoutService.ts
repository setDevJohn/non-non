import api from './api';
import { Workout, CreateWorkoutData } from '@/types';

export const workoutService = {
  getWorkouts: async (userId?: string): Promise<Workout[]> => {
    const url = userId ? `/workouts?userId=${userId}` : '/workouts';
    const response = await api.get(url);
    return response.data;
  },

  getTodayWorkout: async (userId: string): Promise<Workout | null> => {
    const response = await api.get(`/workouts/today/${userId}`);
    return response.data;
  },

  createWorkout: async (data: CreateWorkoutData): Promise<Workout> => {
    const response = await api.post('/workouts', data);
    return response.data;
  },
};
