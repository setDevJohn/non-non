import React from 'react';
import { View, Text } from 'react-native';
import { ControlledInput } from '@/components/ui';
import { CreateWorkoutData } from '@/types/workout';

interface WorkoutFormProps {
  control: any;
  errors: any;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ control, errors }) => {
  const workoutTypes = [
    { label: 'Academia', value: 'gym' },
    { label: 'Corrida', value: 'running' },
    { label: 'Caminhada', value: 'walking' },
    { label: 'Casa', value: 'home' },
    { label: 'Bike', value: 'cycling' },
    { label: 'Outro', value: 'other' },
  ];

  return (
    <View className="gap-4">
      <ControlledInput
        name="workoutType"
        control={control}
        label="Tipo de Treino"
        placeholder="Selecione o tipo"
        error={errors.workoutType?.message}
      />

      <ControlledInput
        name="duration"
        control={control}
        label="Duração (minutos)"
        placeholder="Ex: 45"
        keyboardType="numeric"
        error={errors.duration?.message}
      />

      <ControlledInput
        name="notes"
        control={control}
        label="Observações (opcional)"
        placeholder="Como foi seu treino?"
        multiline
        numberOfLines={3}
        error={errors.notes?.message}
      />
    </View>
  );
};
