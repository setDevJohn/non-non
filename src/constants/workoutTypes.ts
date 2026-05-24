export const WORKOUT_TYPES = [
  { value: 'gym', label: 'Academia', icon: 'Dumbbell' },
  { value: 'running', label: 'Corrida', icon: 'PersonStanding' },
  { value: 'walking', label: 'Caminhada', icon: 'Footprints' },
  { value: 'home', label: 'Casa', icon: 'Home' },
  { value: 'bike', label: 'Bike', icon: 'Bike' },
  { value: 'other', label: 'Outro', icon: 'MoreHorizontal' },
] as const;

export type WorkoutTypeValue = typeof WORKOUT_TYPES[number]['value'];
