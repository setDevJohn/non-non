import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEventStore } from '@/store';
import { Card, Button, RefreshWrapper, SafeScreen } from '@/components/ui';
import { Calendar, Users, Trophy, Plus, Clock, Zap } from 'lucide-react-native';

export default function EventsScreen() {
  const router = useRouter();
  const { events, fetchEvents, isLoading } = useEventStore();
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'draft' | 'completed'>('active');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchEvents();
    } catch (error) {
      console.error('Error refreshing events:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    switch (activeTab) {
      case 'active':
        return event.status === 'active';
      case 'pending':
        return event.status === 'pending';
      case 'draft':
        return event.status === 'draft';
      case 'completed':
        return event.status === 'completed';
      default:
        return true;
    }
  });

  const tabs = [
    { key: 'active' as const, label: 'Ativos' },
    { key: 'pending' as const, label: 'Pendentes' },
    { key: 'draft' as const, label: 'Rascunhos' },
    { key: 'completed' as const, label: 'Finalizados' },
  ];

  return (
    <SafeScreen>
      <RefreshWrapper
        onRefresh={onRefresh}
        refreshing={refreshing}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6 pb-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-white font-extrabold text-3xl">Eventos</Text>
            <Button
              title="Criar"
              onPress={() => router.push('/(tabs)/events/create')}
              size="sm"
              icon={<Plus size={16} color="#fff" />}
            />
          </View>

        {/* Tabs */}
        <View className="flex-row gap-2 mb-6">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className={`flex-1 py-4 rounded-2xl ${
                activeTab === tab.key
                  ? 'bg-emerald-500'
                  : 'bg-zinc-800'
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === tab.key ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <Card className="items-center py-16">
            <Calendar size={72} color="#3f3f46" />
            <Text className="text-zinc-400 font-semibold text-lg mt-4">
              Nenhum evento encontrado
            </Text>
            <Text className="text-zinc-500 text-sm mt-2">
              Crie um novo evento para começar
            </Text>
          </Card>
        ) : (
          filteredEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              onPress={() => router.push(`/events/${event.id}` as any)}
              activeOpacity={0.7}
            >
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
                        Participantes
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
                        : event.status === 'draft'
                        ? 'bg-zinc-700/50'
                        : 'bg-zinc-800'
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        event.status === 'active'
                          ? 'text-emerald-500'
                          : event.status === 'pending'
                          ? 'text-yellow-400'
                          : event.status === 'draft'
                          ? 'text-zinc-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      {event.status === 'active'
                        ? 'Em andamento'
                        : event.status === 'pending'
                        ? 'Aguardando'
                        : event.status === 'draft'
                        ? 'Rascunho'
                        : 'Finalizado'}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </View>
    </RefreshWrapper>
  </SafeScreen>
  );
}
