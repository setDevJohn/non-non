import api from './api';
import { Workout, CreateWorkoutData } from '@/types';
import { showToast } from '@/utils/toast';

export const workoutService = {
  getMyWorkouts: async (): Promise<Workout[]> => {
    const response = await api.get('/workouts/me');
    return response.data;
  },

  getMyWeeklyStats: async (): Promise<any> => {
    const response = await api.get('/workouts/me/weekly');
    return response.data;
  },

  getEventWorkouts: async (eventId: string): Promise<Workout[]> => {
    const response = await api.get(`/workouts/event/${eventId}`);
    return response.data;
  },

  getWorkoutById: async (id: string): Promise<Workout> => {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  },

  createWorkout: async (data: CreateWorkoutData): Promise<Workout> => {
    const response = await api.post('/workouts', data);
    showToast.success('Treino registrado com sucesso!');
    return response.data;
  },

  deleteWorkout: async (id: string): Promise<void> => {
    await api.delete(`/workouts/${id}`);
    showToast.success('Treino removido.');
  },
};
