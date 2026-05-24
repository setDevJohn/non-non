import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEventStore } from '@/store';
import { Input, Button, Card } from '@/components/ui';

const createEventSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  startDate: z.string().min(10, 'Data de início inválida'),
  endDate: z.string().min(10, 'Data de fim inválida'),
  entryValue: z.string().min(1, 'Valor de entrada inválido'),
  maxParticipants: z.string().min(1, 'Máximo de participantes inválido'),
  isPublic: z.boolean(),
});

type CreateEventData = z.infer<typeof createEventSchema>;

export default function CreateEventScreen() {
  const router = useRouter();
  const { createEvent, isLoading } = useEventStore();
  
  const { control, handleSubmit, formState: { errors } } = useForm<CreateEventData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      isPublic: true,
    },
  });

  const onSubmit = async (data: CreateEventData) => {
    try {
      await createEvent({
        ...data,
        entryValue: parseFloat(data.entryValue),
        maxParticipants: parseInt(data.maxParticipants),
      });
      router.back();
    } catch (error) {
      console.error('Create event error:', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-zinc-950">
      <View className="p-6">
        <Card className="mb-8">
          <Text className="text-white font-extrabold text-3xl text-center mb-2">
            Criar Evento
          </Text>
          <Text className="text-zinc-400 text-center">
            Organize uma competição fitness
          </Text>
        </Card>

        <Input
          label="Nome do Evento"
          placeholder="Desafio Verão 2024"
          control={control}
          name="name"
          error={errors.name?.message}
        />

        <Input
          label="Descrição"
          placeholder="Descreva o evento..."
          control={control}
          name="description"
          error={errors.description?.message}
          multiline
          numberOfLines={4}
        />

        <Input
          label="Data de Início"
          placeholder="01/01/2024"
          control={control}
          name="startDate"
          error={errors.startDate?.message}
        />

        <Input
          label="Data de Fim"
          placeholder="31/01/2024"
          control={control}
          name="endDate"
          error={errors.endDate?.message}
        />

        <Input
          label="Valor de Entrada (R$)"
          placeholder="50"
          control={control}
          name="entryValue"
          error={errors.entryValue?.message}
          keyboardType="number-pad"
        />

        <Input
          label="Máximo de Participantes"
          placeholder="20"
          control={control}
          name="maxParticipants"
          error={errors.maxParticipants?.message}
          keyboardType="number-pad"
        />

        <Button
          title="Criar Evento"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          className="mt-6"
        />
      </View>
    </ScrollView>
  );
}
