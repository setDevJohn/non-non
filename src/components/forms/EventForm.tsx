import React from 'react';
import { View } from 'react-native';
import { ControlledInput } from '@/components/ui';
import { CreateEventData } from '@/types/event';

interface EventFormProps {
  control: any;
  errors: any;
}

export const EventForm: React.FC<EventFormProps> = ({ control, errors }) => {
  return (
    <View className="gap-4">
      <ControlledInput
        name="name"
        control={control}
        label="Nome do Evento"
        placeholder="Ex: Desafio de Julho"
        error={errors.name?.message}
      />

      <ControlledInput
        name="description"
        control={control}
        label="Descrição"
        placeholder="Descreva o evento..."
        multiline
        numberOfLines={3}
        error={errors.description?.message}
      />

      <ControlledInput
        name="startDate"
        control={control}
        label="Data de Início"
        placeholder="DD/MM/YYYY"
        error={errors.startDate?.message}
      />

      <ControlledInput
        name="endDate"
        control={control}
        label="Data de Término"
        placeholder="DD/MM/YYYY"
        error={errors.endDate?.message}
      />

      <ControlledInput
        name="entryValue"
        control={control}
        label="Valor de Entrada (R$)"
        placeholder="0.00"
        keyboardType="numeric"
        error={errors.entryValue?.message}
      />

      <ControlledInput
        name="maxParticipants"
        control={control}
        label="Máximo de Participantes"
        placeholder="Ex: 10"
        keyboardType="numeric"
        error={errors.maxParticipants?.message}
      />
    </View>
  );
};
