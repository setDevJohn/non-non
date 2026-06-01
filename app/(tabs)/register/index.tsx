import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { WORKOUT_TYPES } from '@/constants';
import { Button, Card, ControlledInput, SafeScreen } from '@/components/ui';
import { Dumbbell, Camera, Clock, CheckCircle, Flame } from 'lucide-react-native';
import { workoutService } from '@/services';

const workoutSchema = z.object({
  type: z.string(),
  duration: z.string().min(1, 'Duração é obrigatória'),
  notes: z.string().optional(),
});

type WorkoutFormData = z.infer<typeof workoutSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>('gym');
  const [hasWorkoutToday, setHasWorkoutToday] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      type: 'gym',
    },
  });

  const onSubmit = async (data: WorkoutFormData) => {
    try {
      await workoutService.createWorkout({
        type: selectedType as any,
        duration: parseInt(data.duration),
        notes: data.notes,
      });
      router.back();
    } catch (error) {
      console.error('Workout registration error:', error);
    }
  };

  if (hasWorkoutToday) {
    return (
      <View className="flex-1 bg-zinc-950 justify-center p-6">
        <Card className="items-center py-16">
          <View className="bg-emerald-500/20 p-4 rounded-full mb-4">
            <CheckCircle size={64} color="#10b981" />
          </View>
          <Text className="text-white font-extrabold text-2xl mb-2">
            Treino Registrado!
          </Text>
          <Text className="text-zinc-400 text-center">
            Você já treinou hoje. Volte amanhã!
          </Text>
        </Card>
      </View>
    );
  }

  return (
    <SafeScreen>
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6">
          {/* Header Card */}
          <Card className="mb-8 p-6">
            <View className="flex-row items-center justify-center mb-3">
              <Flame size={32} color="#facc15" />
              <Text className="text-white font-extrabold text-3xl ml-3">
                Registrar Treino
              </Text>
            </View>
            <Text className="text-zinc-400 text-center">
              Apenas 1 treino válido por dia
            </Text>
          </Card>

        {/* Workout Type Selection */}
        <Text className="text-white font-bold text-lg mb-4">Tipo de Treino</Text>
        <View className="flex-row flex-wrap gap-3 mb-8">
          {WORKOUT_TYPES.map((type) => (
            <TouchableOpacity
              key={type.value}
              onPress={() => setSelectedType(type.value)}
              activeOpacity={0.7}
              className={`flex-1 min-w-[110px] p-4 rounded-2xl border-2 ${
                selectedType === type.value
                  ? 'border-emerald-500 bg-zinc-800'
                  : 'border-zinc-700 bg-zinc-900'
              }`}
            >
              <Text className={`text-center font-semibold text-sm ${
                selectedType === type.value ? 'text-white' : 'text-zinc-400'
              }`}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Photo Upload */}
        <TouchableOpacity className="mb-8" activeOpacity={0.7}>
          <Card className="items-center py-10 border-2 border-dashed border-zinc-700">
            <View className="bg-zinc-800 p-4 rounded-full mb-3">
              <Camera size={40} color="#a1a1aa" />
            </View>
            <Text className="text-zinc-400 font-semibold">
              Adicionar Foto (Opcional)
            </Text>
            <Text className="text-zinc-500 text-xs mt-1">
              Toque para selecionar
            </Text>
          </Card>
        </TouchableOpacity>

        {/* Duration Input */}
        <ControlledInput
          label="Duração (minutos)"
          placeholder="60"
          control={control}
          name="duration"
          error={errors.duration?.message}
          keyboardType="number-pad"
        />

        {/* Notes Input */}
        <ControlledInput
          label="Observações (Opcional)"
          placeholder="Como foi seu treino?"
          control={control}
          name="notes"
          error={errors.notes?.message}
          multiline
          numberOfLines={4}
        />

        {/* Submit Button */}
        <Button
          title="Registrar Treino"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 24 }}
        />
      </View>
    </ScrollView>
  </SafeScreen>
  );
}
