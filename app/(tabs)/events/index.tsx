import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEventStore } from '@/store';
import { Card, Button, RefreshWrapper, SafeScreen, Badge, EmptyState } from '@/components/ui';
import { Calendar, Plus, Clock, Zap } from 'lucide-react-native';

export default function EventsScreen() {
  const router = useRouter();
  const { events, fetchEvents, isLoading } = useEventStore();
  const [activeTab, setActiveTab] = useState<'active' | 'waiting_confirmation' | 'ready' | 'draft' | 'finished' | 'cancelled'>('draft');
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
      case 'waiting_confirmation':
        return event.status === 'waiting_confirmation';
      case 'ready':
        return event.status === 'ready';
      case 'draft':
        return event.status === 'draft';
      case 'finished':
        return event.status === 'finished';
      case 'cancelled':
        return event.status === 'cancelled';
      default:
        return true;
    }
  });

  const tabs = [
    { key: 'active' as const, label: 'Ativos' },
    { key: 'waiting_confirmation' as const, label: 'Confirmação' },
    { key: 'ready' as const, label: 'Prontos' },
    { key: 'draft' as const, label: 'Rascunhos' },
    { key: 'finished' as const, label: 'Finalizados' },
    { key: 'cancelled' as const, label: 'Cancelados' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Em andamento</Badge>;
      case 'waiting_confirmation':
        return <Badge variant="warning">Aguardando Confirmação</Badge>;
      case 'ready':
        return <Badge variant="neutral">Pronto</Badge>;
      case 'draft':
        return <Badge variant="neutral">Rascunho</Badge>;
      case 'finished':
        return <Badge variant="neutral">Finalizado</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <SafeScreen>
      <RefreshWrapper
        onRefresh={onRefresh}
        refreshing={refreshing}
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-6 pb-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-foreground font-bold text-3xl">Eventos</Text>
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
              className={`flex-1 py-4 rounded-xl ${
                activeTab === tab.key
                  ? 'bg-primary'
                  : 'bg-secondary'
              }`}
              activeOpacity={0.7}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === tab.key ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <EmptyState
            icon={<Calendar size={72} color="#3f3f46" />}
            title="Nenhum evento encontrado"
            description="Crie um novo evento para começar"
          />
        ) : (
          filteredEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              onPress={() => router.push(`/events/${event.id}` as any)}
              activeOpacity={0.7}
            >
              <Card 
                variant="interactive"
                className={`mb-4 p-5 ${
                  event.status === 'active' ? 'border-l-4 border-l-primary' : ''
                }`}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-foreground font-bold text-xl mb-1">
                      {event.name}
                    </Text>
                    <Text className="text-muted-foreground text-sm leading-relaxed">
                      {event.description}
                    </Text>
                  </View>
                  {event.status === 'active' && (
                    <View className="bg-primary/20 p-2 rounded-xl ml-3">
                      <Zap size={20} color="#10b981" />
                    </View>
                  )}
                </View>
                
                <View className="flex-row gap-6 mb-4">
                  <View className="flex-row items-center">
                    <View className="bg-secondary p-2 rounded-xl mr-2">
                      <Text className="text-warning font-bold text-lg">
                        R$ {event.entryFee || 0}
                      </Text>
                    </View>
                    <Text className="text-muted-foreground text-xs">Entrada</Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center pt-4 border-t border-border">
                  <View className="flex-row items-center">
                    <Clock size={16} color="#a1a1aa" />
                    <Text className="text-muted-foreground text-sm ml-2">
                      {new Date(event.endDate).toLocaleDateString('pt-BR')}
                    </Text>
                  </View>
                  {getStatusBadge(event.status)}
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
