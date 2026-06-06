import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui';
import { Users, Trophy, Clock, Zap } from 'lucide-react-native';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card 
        className={`mb-4 p-5 ${
          event.status === 'active' ? 'border-l-4 border-l-emerald-500' : ''
        }`}
      >
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className="text-white font-extrabold text-xl mb-1">
              {event.name}
            </Text>
            <Text className="text-zinc-400 text-sm leading-relaxed">
              {event.description}
            </Text>
          </View>
          {event.status === 'active' && (
            <View className="bg-emerald-500/20 p-2 rounded-xl ml-3">
              <Zap size={20} color="#10b981" />
            </View>
          )}
        </View>
        
        <View className="flex-row gap-6 mb-4">
          <View className="flex-row items-center">
            <View className="bg-zinc-800 p-2 rounded-xl mr-2">
              <Users size={18} color="#a1a1aa" />
            </View>
            <View>
              <Text className="text-white font-semibold text-base">
                {event.participants.length}
              </Text>
              <Text className="text-zinc-500 text-xs">
                / {event.maxParticipants}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <View className="bg-zinc-800 p-2 rounded-xl mr-2">
              <Trophy size={18} color="#facc15" />
            </View>
            <View>
              <Text className="text-yellow-400 font-black text-lg">
                R$ {event.prizePool || 0}
              </Text>
              <Text className="text-zinc-500 text-xs">Prêmio</Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center pt-4 border-t border-zinc-800">
          <View className="flex-row items-center">
            <Clock size={16} color="#a1a1aa" />
            <Text className="text-zinc-400 text-sm ml-2">
              {new Date(event.endDate).toLocaleDateString('pt-BR')}
            </Text>
          </View>
          <View
            className={`px-3 py-1 rounded-full ${
              event.status === 'active'
                ? 'bg-emerald-500/20'
                : event.status === 'pending'
                ? 'bg-yellow-500/20'
                : 'bg-zinc-800'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                event.status === 'active'
                  ? 'text-emerald-500'
                  : event.status === 'pending'
                  ? 'text-yellow-400'
                  : 'text-zinc-400'
              }`}
            >
              {event.status === 'active'
                ? 'Em andamento'
                : event.status === 'pending'
                ? 'Aguardando'
                : 'Finalizado'}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
