import React from 'react';
import { View, Text } from 'react-native';
import { EventStatus } from '@/types/event';

interface EventStatusBadgeProps {
  status: EventStatus;
}

export const EventStatusBadge: React.FC<EventStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-emerald-500/20',
          text: 'text-emerald-500',
          label: 'Em andamento',
        };
      case 'waiting_confirmation':
        return {
          bg: 'bg-yellow-500/20',
          text: 'text-yellow-400',
          label: 'Aguardando Confirmação',
        };
      case 'ready':
        return {
          bg: 'bg-blue-500/20',
          text: 'text-blue-400',
          label: 'Pronto',
        };
      case 'draft':
        return {
          bg: 'bg-zinc-700/50',
          text: 'text-zinc-400',
          label: 'Rascunho',
        };
      case 'finished':
        return {
          bg: 'bg-zinc-800',
          text: 'text-zinc-400',
          label: 'Finalizado',
        };
      case 'cancelled':
        return {
          bg: 'bg-red-500/20',
          text: 'text-red-500',
          label: 'Cancelado',
        };
      default:
        return {
          bg: 'bg-zinc-800',
          text: 'text-zinc-400',
          label: status,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View className={`px-3 py-1 rounded-full ${config.bg}`}>
      <Text className={`text-xs font-semibold ${config.text}`}>
        {config.label}
      </Text>
    </View>
  );
};
