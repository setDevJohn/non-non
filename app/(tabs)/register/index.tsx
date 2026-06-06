import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { WORKOUT_TYPES } from '@/constants';
import { Button, Card, ControlledInput, SafeScreen } from '@/components/ui';
import { Dumbbell, Camera, Clock, CheckCircle, Flame } from 'lucide-react-native';
import { workoutService, eventService } from '@/services';
import { useEventStore } from '@/store';

const workoutSchema = z.object({
  workoutType: z.string(),
  duration: z.string().min(1, 'Duração é obrigatória'),
  notes: z.string().optional(),
});

type WorkoutFormData = z.infer<typeof workoutSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const { events, fetchEvents } = useEventStore();
  const [selectedType, setSelectedType] = useState<string>('gym');
  const [hasWorkoutToday, setHasWorkoutToday] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      workoutType: 'gym',
    },
  });

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const currentEvent = events.find((e) => e.status === 'active');

  const onSubmit = async (data: WorkoutFormData) => {
    try {
      await workoutService.createWorkout({
        workoutType: selectedType as any,
        duration: parseInt(data.duration),
        notes: data.notes,
        eventId: currentEvent?.id,
        workoutDate: new Date().toISOString(),
      });
      router.back();
    } catch (error) {
      console.error('Workout registration error:', error);
    }
  };

  if (hasWorkoutToday) {
    return (
      <View className="flex-1 justify-center bg-zinc-950 p-6">
        <Card className="items-center py-16">
          <View className="bg-emerald-500/20 mb-4 p-4 rounded-full">
            <CheckCircle size={64} color="#10b981" />
          </View>
          <Text className="mb-2 font-extrabold text-white text-2xl">
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="p-6 pb-4">
          {/* Header Card */}
          <Card className="mb-8 p-6">
            <View className="flex-row justify-center items-center mb-3">
              <Flame size={32} color="#facc15" />
              <Text className="ml-3 font-extrabold text-white text-3xl">
                Registrar Treino
              </Text>
            </View>
            <Text className="text-zinc-400 text-center">
              Apenas 1 treino válido por dia
            </Text>
          </Card>

        {/* Workout Type Selection */}
        <Text className="mb-4 font-bold text-white text-lg">Tipo de Treino</Text>
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
          <Card className="items-center py-10 border-2 border-zinc-700 border-dashed">
            <View className="bg-zinc-800 mb-3 p-4 rounded-full">
              <Camera size={40} color="#a1a1aa" />
            </View>
            <Text className="font-semibold text-zinc-400">
              Adicionar Foto (Opcional)
            </Text>
            <Text className="mt-1 text-zinc-500 text-xs">
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
    </KeyboardAvoidingView>
  </SafeScreen>
  );
}
