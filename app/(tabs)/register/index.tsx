import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { WORKOUT_TYPES } from '@/constants';
import { Button, Card, ControlledInput, SafeScreen, EmptyState, Section } from '@/components/ui';
import { Camera, CheckCircle, Flame } from 'lucide-react-native';
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
      <View className="flex-1 justify-center bg-background px-6">
        <Card className="items-center py-16">
          <View className="bg-primary/20 mb-4 p-4 rounded-full">
            <CheckCircle size={64} color="#10b981" />
          </View>
          <Text className="mb-2 font-bold text-foreground text-2xl">
            Treino Registrado!
          </Text>
          <Text className="text-muted-foreground text-center">
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
          className="flex-1 bg-background"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 pt-6 pb-4">
          {/* Header Card */}
          <Card className="mb-8 p-6">
            <View className="flex-row justify-center items-center mb-3">
              <Flame size={32} color="#facc15" />
              <Text className="ml-3 font-bold text-foreground text-3xl">
                Registrar Treino
              </Text>
            </View>
            <Text className="text-muted-foreground text-center">
              Apenas 1 treino válido por dia
            </Text>
          </Card>

        {/* Workout Type Selection */}
        <Section title="Tipo de Treino">
          <View className="flex-row flex-wrap gap-3">
            {WORKOUT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.value}
                onPress={() => setSelectedType(type.value)}
                activeOpacity={0.7}
                className={`flex-1 min-w-[110px] p-4 rounded-xl border-2 ${
                  selectedType === type.value
                    ? 'border-primary bg-secondary'
                    : 'border-border bg-card'
                }`}
              >
                <Text className={`text-center font-semibold text-sm ${
                  selectedType === type.value ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Section>

        {/* Photo Upload */}
        <TouchableOpacity className="mb-8" activeOpacity={0.7}>
          <Card className="items-center py-10 border-2 border-border border-dashed">
            <View className="bg-secondary mb-3 p-4 rounded-full">
              <Camera size={40} color="#a1a1aa" />
            </View>
            <Text className="font-semibold text-muted-foreground">
              Adicionar Foto (Opcional)
            </Text>
            <Text className="mt-1 text-muted-foreground text-xs">
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
          fullWidth
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  </SafeScreen>
  );
}
