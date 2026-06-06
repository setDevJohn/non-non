import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '@/store';
import { ControlledInput, Button, Card, SafeScreen } from '@/components/ui';
import { Flame, Dumbbell } from 'lucide-react-native';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, onboardingCompleted } = useAuthStore();
  
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: 'jhony00._@hotmail.com',
      password: '123456',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      
      // Check if onboarding is completed
      if (!onboardingCompleted) {
        router.replace('/(auth)/onboarding');
      } else {
        router.replace('/(tabs)/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
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
          <View className="flex-1 justify-center p-6 pb-4">
          {/* Header */}
          <View className="items-center mt-6 mb-10">
            <Image
              source={require('../../assets/dark-mode-transparent-logo.png')}
              className="w-[220px] h-[220px]"
            />
          </View>

          {/* Form */}
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

          <Button
            title="Entrar"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={{ marginTop: 24 }}
            icon={<Flame size={20} color="#fff" />}
          />

          <TouchableOpacity
            className="mt-6"
            onPress={() => router.push('/(auth)/register')}
            activeOpacity={0.7}
          >
            <Text className="font-semibold text-emerald-500 text-center">
              Não tem conta? Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}
