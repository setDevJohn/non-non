import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore, useHydrationStore } from '@/store';
import { ControlledInput, Button, Card, SafeScreen, Section } from '@/components/ui';

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
          className="flex-1 bg-background"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 pt-6 pb-4">
          <Card className="mb-8">
            <Text className="text-foreground font-bold text-3xl text-center mb-2">
              Crie seu Perfil
            </Text>
            <Text className="text-muted-foreground text-center">
              Comece sua jornada fitness competitiva
            </Text>
          </Card>

          <Section title="Informações Pessoais">
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
          </Section>

          <Section title="Dados Físicos">
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
              <Card className="mb-4 bg-secondary">
                <Text className="text-primary font-semibold text-center">
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
          </Section>

          <Section title="Meta de Hidratação">
            <TouchableOpacity
              className={`p-4 rounded-xl border-2 mb-3 ${
                hydrationOption === '28ml/kg'
                  ? 'border-primary bg-secondary'
                  : 'border-border bg-card'
              }`}
              onPress={() => {
                setHydrationOption('28ml/kg');
                if (weight) {
                  setEstimatedGoal(calculateDailyGoal(parseFloat(weight), '28ml/kg'));
                }
              }}
              activeOpacity={0.7}
            >
              <Text className="text-foreground font-semibold">28ml/kg</Text>
              <Text className="text-muted-foreground text-sm">Meta moderada</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-4 rounded-xl border-2 mb-6 ${
                hydrationOption === '35ml/kg'
                  ? 'border-primary bg-secondary'
                  : 'border-border bg-card'
              }`}
              onPress={() => {
                setHydrationOption('35ml/kg');
                if (weight) {
                  setEstimatedGoal(calculateDailyGoal(parseFloat(weight), '35ml/kg'));
                }
              }}
              activeOpacity={0.7}
            >
              <Text className="text-foreground font-semibold">35ml/kg</Text>
              <Text className="text-muted-foreground text-sm">Recomendado</Text>
            </TouchableOpacity>
          </Section>

          <Button
            title="Criar Conta"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            fullWidth
          />

          <TouchableOpacity onPress={() => router.back()} className="mt-6">
            <Text className="text-muted-foreground text-center font-medium">
              Já tem conta? Entre
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}
