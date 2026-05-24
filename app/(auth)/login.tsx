import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '@/store';
import { Input, Button, Card } from '@/components/ui';
import { Flame, Dumbbell } from 'lucide-react-native';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <ScrollView 
      className="flex-1 bg-zinc-950"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 justify-center p-6 pt-20">
        {/* Header */}
        <View className="items-center mb-10">
          <View className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 rounded-full mb-6">
            <Dumbbell size={48} color="#fff" />
          </View>
          <Card className="items-center py-6 px-8">
            <Text className="text-white font-extrabold text-3xl text-center mb-2">
              Gym Competition
            </Text>
            <Text className="text-zinc-400 text-center">
              Entre para continuar sua jornada fitness
            </Text>
          </Card>
        </View>

        {/* Form */}
        <Input
          label="Email"
          placeholder="seu@email.com"
          control={control}
          name="email"
          error={errors.email?.message}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
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
          <Text className="text-emerald-500 text-center font-semibold">
            Não tem conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
