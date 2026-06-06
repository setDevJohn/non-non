import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEventStore } from '@/store';
import { ControlledInput, Button, Card, SafeScreen } from '@/components/ui';
import { Calendar, Trophy, Users, DollarSign, Info, X } from 'lucide-react-native';

const createEventSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  startDate: z.string().min(10, 'Data de início inválida'),
  endDate: z.string().min(10, 'Data de fim inválida'),
  entryFee: z.string().optional(),
});

type CreateEventData = z.infer<typeof createEventSchema>;

export default function CreateEventScreen() {
  const router = useRouter();
  const { createEvent, isLoading } = useEventStore();
  
  const { control, handleSubmit, formState: { errors } } = useForm<CreateEventData>({
    resolver: zodResolver(createEventSchema),
  });

  const convertDateToISO = (dateString: string): string => {
    // Convert from dd/mm/yyyy to ISO format
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}T00:00:00Z`;
  };

  const onSubmit = async (data: CreateEventData) => {
    try {
      await createEvent({
        name: data.name,
        description: data.description,
        startDate: convertDateToISO(data.startDate),
        endDate: convertDateToISO(data.endDate),
        entryFee: data.entryFee ? parseFloat(data.entryFee) : undefined,
      });
      router.back();
    } catch (error) {
      console.error('Create event error:', error);
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
          {/* Header */}
          <View className="p-6 pb-4">
            <View className="flex-row items-center justify-between mb-6">
              <TouchableOpacity onPress={() => router.back()} className="p-2">
                <X size={24} color="#a1a1aa" />
              </TouchableOpacity>
              <Text className="text-white font-extrabold text-xl">Criar Evento</Text>
              <View className="w-8" />
            </View>

            {/* Hero Card */}
            <Card className="mb-6 p-6 bg-gradient-to-br from-emerald-900/30 to-zinc-900 border border-emerald-500/20">
              <View className="flex-row items-center mb-3">
                <View className="bg-emerald-500/20 p-3 rounded-2xl mr-4">
                  <Trophy size={28} color="#10b981" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-extrabold text-2xl mb-1">
                    Novo Evento
                  </Text>
                  <Text className="text-zinc-400 text-sm">
                    Organize uma competição fitness
                  </Text>
                </View>
              </View>
            </Card>

            {/* Informações Básicas */}
            <Card className="mb-4 p-5 bg-zinc-800/50 border border-zinc-700">
              <View className="flex-row items-center mb-4">
                <Text className="text-white font-bold text-lg">Informações Básicas</Text>
              </View>

              <ControlledInput
                label="Nome do Evento"
                placeholder="Desafio Verão 2024"
                control={control}
                name="name"
                error={errors.name?.message}
              />

              <ControlledInput
                label="Descrição"
                placeholder="Descreva o evento..."
                control={control}
                name="description"
                error={errors.description?.message}
                multiline
                numberOfLines={4}
              />
            </Card>

            {/* Datas */}
            <Card className="mb-4 p-5 bg-zinc-800/50 border border-zinc-700">
              <View className="flex-row items-center mb-4">
                <Text className="text-white font-bold text-lg">Configurações</Text>
              </View>

              <ControlledInput
                label="Data de Início"
                placeholder="01/01/2024"
                control={control}
                name="startDate"
                error={errors.startDate?.message}
              />

              <ControlledInput
                label="Data de Fim"
                placeholder="31/01/2024"
                control={control}
                name="endDate"
                error={errors.endDate?.message}
              />

              <ControlledInput
                label="Valor de Entrada (R$)"
                placeholder="50"
                control={control}
                name="entryFee"
                error={errors.entryFee?.message}
                keyboardType="number-pad"
              />
            </Card>

            <Button
              title="Criar Evento"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}
