import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore, useHydrationStore } from '@/store';
import { ControlledInput, Button, Card, SafeScreen } from '@/components/ui';

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  height: z.string().optional(),
  weight: z.string().optional(),
  birthDate: z.string().optional(),
  hydrationOption: z.enum(['28ml/kg', '35ml/kg']).optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const { register: registerUser, isLoading, onboardingCompleted } = useAuthStore();
  const { calculateDailyGoal } = useHydrationStore();
  const [hydrationOption, setHydrationOption] = useState<'28ml/kg' | '35ml/kg'>('35ml/kg');
  const [estimatedGoal, setEstimatedGoal] = useState(0);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: 'Jhony',
      email: 'jhony00._@hotmail.com',
      password: '123456',
      height: '174',
      weight: '96',
      birthDate: '06-03-2000',
      hydrationOption: '35ml/kg',
    },
  });

  const weight = watch('weight');

  React.useEffect(() => {
    if (weight) {
      const goal = calculateDailyGoal(parseFloat(weight), hydrationOption);
      setEstimatedGoal(goal);
    }
  }, [weight, hydrationOption, calculateDailyGoal]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        ...data,
        height: data.height ? parseFloat(data.height) : undefined,
        weight: data.weight ? parseFloat(data.weight) : undefined,
      });
      
      // Check if onboarding is completed
      if (!onboardingCompleted) {
        router.replace('/(auth)/onboarding');
      } else {
        router.replace('/(tabs)/dashboard');
      }
    } catch (error) {
      console.error('Register error:', error);
    }
  };

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
          <Card className="mb-8">
            <Text className="text-white font-extrabold text-3xl text-center mb-2">
              Crie seu Perfil
            </Text>
            <Text className="text-zinc-400 text-center">
              Comece sua jornada fitness competitiva
            </Text>
          </Card>

          <ControlledInput
            label="Nome"
            placeholder="Seu nome completo"
            control={control}
            name="name"
            error={errors.name?.message}
          />

          <ControlledInput
            label="Email"
            placeholder="seu@email.com"
            control={control}
            name="email"
            error={errors.email?.message}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <ControlledInput
            label="Senha"
            placeholder="••••••••"
            control={control}
            name="password"
            error={errors.password?.message}
            secureTextEntry
          />

          <ControlledInput
            label="Altura (cm)"
            placeholder="175"
            control={control}
            name="height"
            error={errors.height?.message}
            keyboardType="number-pad"
          />

          <ControlledInput
            label="Peso (kg)"
            placeholder="75"
            control={control}
            name="weight"
            error={errors.weight?.message}
            keyboardType="number-pad"
          />

          {estimatedGoal > 0 && (
            <Card className="mb-4 bg-zinc-800">
              <Text className="text-emerald-500 font-semibold text-center">
                Meta diária estimada: {estimatedGoal}ml
              </Text>
            </Card>
          )}

          <ControlledInput
            label="Data de Nascimento"
            placeholder="01/01/1990"
            control={control}
            name="birthDate"
            error={errors.birthDate?.message}
          />

          <Text className="text-white font-semibold mb-3 mt-4">
            Meta de Hidratação
          </Text>

          <TouchableOpacity
            className={`p-4 rounded-2xl border-2 mb-3 ${
              hydrationOption === '28ml/kg'
                ? 'border-emerald-500 bg-zinc-800'
                : 'border-zinc-700 bg-zinc-900'
            }`}
            onPress={() => {
              setHydrationOption('28ml/kg');
              if (weight) {
                setEstimatedGoal(calculateDailyGoal(parseFloat(weight), '28ml/kg'));
              }
            }}
          >
            <Text className="text-white font-semibold">28ml/kg</Text>
            <Text className="text-zinc-400 text-sm">Meta moderada</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-4 rounded-2xl border-2 mb-6 ${
              hydrationOption === '35ml/kg'
                ? 'border-emerald-500 bg-zinc-800'
                : 'border-zinc-700 bg-zinc-900'
            }`}
            onPress={() => {
              setHydrationOption('35ml/kg');
              if (weight) {
                setEstimatedGoal(calculateDailyGoal(parseFloat(weight), '35ml/kg'));
              }
            }}
          >
            <Text className="text-white font-semibold">35ml/kg</Text>
            <Text className="text-zinc-400 text-sm">Recomendado</Text>
          </TouchableOpacity>

          <Button
            title="Criar Conta"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={{ marginBottom: 16 }}
          />

          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-zinc-500 text-center font-medium">
              Já tem conta? Entre
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}
