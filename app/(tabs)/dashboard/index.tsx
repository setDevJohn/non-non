import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore, useEventStore, useHydrationStore } from '@/store';
import { Card, Button, SafeScreen, Badge, Section } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { Droplets, Trophy, Calendar, Clock, Flame } from 'lucide-react-native';
import { hydrationService } from '@/services';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { events, fetchEvents } = useEventStore();
  const { todayStats, fetchTodayStats } = useHydrationStore();
  const [refreshing, setRefreshing] = useState(false);
  const [workoutReminderDone, setWorkoutReminderDone] = useState(false);
  const [waterReminderDone, setWaterReminderDone] = useState(false);
  
  const hydrationProgressAnim = useRef(new Animated.Value(0)).current;

  const currentEvent = events.find((e) => e.status === 'active');
  const hydrationProgress = todayStats?.todayGoal && todayStats.todayGoal > 0
    ? (todayStats.todayAmount || 0) / todayStats.todayGoal * 100
    : 0;

  useEffect(() => {
    fetchEvents();
    fetchTodayStats();
  }, [fetchEvents, fetchTodayStats]);

  useEffect(() => {
    Animated.timing(hydrationProgressAnim, {
      toValue: Math.max(Math.min(hydrationProgress || 0, 100), 0),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [hydrationProgress, hydrationProgressAnim]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchEvents(),
        fetchTodayStats(),
      ]);
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const daysUntilEventEnd = currentEvent
    ? Math.ceil((new Date(currentEvent.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleAddWater = async (amount: number) => {
    try {
      await hydrationService.addHydration({ amountMl: amount });
      await fetchTodayStats();
    } catch (error) {
      console.error('Error adding water:', error);
    }
  };

  // Recovery calculation
  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  };

  const showRecoveryCard = isWeekend();

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header />

    <View className="px-6 pt-6 pb-4">
                  <Section title="Missões Diárias">
            {/* Mission Cards */}
            <View className="flex-col gap-3">
              {/* Workout Mission */}
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/register')}
                className="bg-secondary p-4 border border-border rounded-xl"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <View className="bg-primary/20 mr-3 p-3 rounded-xl">
                    <Flame size={20} color="#10b981" />
                  </View>
                  <View className="flex-1">
                    <Text className="mb-1 font-semibold text-foreground text-base">
                      Registrar Treino
                    </Text>
                    <Text className="text-muted-foreground text-xs">
                      Complete seu treino diário
                    </Text>
                  </View>
                  <View className="bg-primary/20 px-3 py-1 rounded-xl">
                    <Text className="font-bold text-primary text-sm">+2 pts</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Hydration Mission */}
              <TouchableOpacity
                onPress={() => {}}
                className="bg-secondary p-4 border border-border rounded-xl"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <View className="bg-info/20 mr-3 p-3 rounded-xl">
                    <Droplets size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="mb-1 font-semibold text-foreground text-base">
                      Meta de Água
                    </Text>
                    <Text className="text-muted-foreground text-xs">
                      Beba {todayStats?.todayGoal || 0}ml hoje
                    </Text>
                  </View>
                  <View className="bg-info/20 px-3 py-1 rounded-xl">
                    <Text className="font-bold text-info text-sm">+1 pt</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Section>

          {/* Current Event Card */}
          {currentEvent ? (
            <Card variant="elevated" className="mb-6 p-6 border border-primary/20">
              {/* Top Section: Status and Name */}
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1">
                  {/* Status Badge */}
                  <View className="self-start mb-3">
                    <Badge variant="success">
                      {currentEvent.status === 'active' ? 'Em Andamento' : currentEvent.status}
                    </Badge>
                  </View>
                  
                  {/* Event Name */}
                  <Text className="font-bold text-foreground text-2xl leading-tight">
                    {currentEvent.name}
                  </Text>
                </View>

                {/* Prize */}
                <View className="bg-warning/10 px-4 py-3 border border-warning/20 rounded-xl">
                  <Text className="mb-1 font-medium text-muted-foreground text-xs">Entrada</Text>
                  <Text className="font-bold text-warning text-xl">
                    R$ {currentEvent.entryFee || 0}
                  </Text>
                </View>
              </View>

              {/* Metrics Section */}
              <View className="flex-row gap-4 mb-6">
                {/* Days Remaining */}
                <View className="flex-1 bg-secondary p-4 rounded-xl">
                  <View className="flex-row items-center mb-2">
                    <Clock size={16} color="#a1a1aa" className="mr-2" />
                    <Text className="font-medium text-muted-foreground text-xs">Dias Restantes</Text>
                  </View>
                  <Text className="font-bold text-foreground text-2xl">
                    {daysUntilEventEnd}
                  </Text>
                </View>

                {/* Status */}
                <View className="flex-1 bg-secondary p-4 rounded-xl">
                  <View className="flex-row items-center mb-2">
                    <Flame size={16} color="#10b981" className="mr-2" />
                    <Text className="font-medium text-muted-foreground text-xs">Status</Text>
                  </View>
                  <Text className="font-bold text-primary text-2xl">
                    {currentEvent.status === 'active' ? 'Ativo' : currentEvent.status}
                  </Text>
                </View>
              </View>

              {/* Recovery Alert (inside main card) */}
              {showRecoveryCard && (
                <View className="bg-primary/10 mb-4 p-4 border border-primary/20 rounded-xl">
                  <View className="flex-row items-center">
                    <View className="bg-primary/20 mr-3 p-2 rounded-xl">
                      <Flame size={20} color="#10b981" />
                    </View>
                    <View className="flex-1">
                      <Text className="mb-1 font-bold text-primary text-sm">
                        Fim de semana disponível!
                      </Text>
                      <Text className="text-muted-foreground text-xs">
                        Você ainda pode recuperar pontos neste fim de semana.
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* View Details Button */}
              <TouchableOpacity
                onPress={() => router.push(`/events/${currentEvent.id}`)}
                className="items-center bg-secondary py-3 rounded-xl"
                activeOpacity={0.7}
              >
                <Text className="font-semibold text-foreground text-sm">Ver Detalhes do Evento</Text>
              </TouchableOpacity>
            </Card>
          ) : (
            <Card className="items-center mb-6 p-6">
              <Calendar size={48} color="#a1a1aa" className="mb-4" />
              <Text className="mb-2 font-semibold text-foreground text-lg text-center">
                Você não está participando de nenhum evento no momento
              </Text>
              <Text className="mb-4 text-muted-foreground text-sm text-center">
                Crie um novo evento ou entre em um evento de um amigo
              </Text>
              <Button
                title="Ver Eventos"
                onPress={() => router.push('/events')}
              />
            </Card>
          )}

          {/* Hydration Card */}
          <Card className="bg-secondary mb-6 p-5 border border-border">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <View className="bg-info/20 mr-3 p-2 rounded-xl">
                  <Droplets size={20} color="#3b82f6" />
                </View>
                <Text className="font-bold text-foreground text-lg">Meta de Água</Text>
              </View>
              <Text className="font-bold text-info text-lg">
                {isNaN(hydrationProgress) ? '0' : hydrationProgress.toFixed(0)}%
              </Text>
            </View>

            {/* Progress Bar */}
            <View className="bg-background mb-4 border border-border rounded-full w-full h-4 overflow-hidden">
              <Animated.View
                className="bg-info rounded-full h-4"
                style={{ 
                  width: hydrationProgressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                }}
              />
            </View>

            {/* Progress Info and Buttons */}
            <View className="flex-row justify-between items-center gap-4">
              <Text className="flex-1 text-muted-foreground text-sm">
                {todayStats?.todayAmount || 0}ml / {todayStats?.todayGoal || 0}ml
              </Text>

              {/* Quick Actions */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleAddWater(250)}
                  className="items-center bg-info/20 px-4 py-2 border border-info/30 rounded-xl"
                  activeOpacity={0.7}
                >
                  <Text className="font-bold text-info text-sm">+250ml</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAddWater(500)}
                  className="items-center bg-info/20 px-4 py-2 border border-info/30 rounded-xl"
                  activeOpacity={0.7}
                >
                  <Text className="font-bold text-info text-sm">+500ml</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          {/* Event Feed Preview */}
          {currentEvent && (
            <Card className="bg-secondary mb-6 p-5 border border-border">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-bold text-foreground text-lg">Feed do Evento</Text>
                <TouchableOpacity onPress={() => router.push(`/events/${currentEvent.id}`)}>
                  <Text className="font-semibold text-primary text-sm">Ver todos</Text>
                </TouchableOpacity>
              </View>
              
              <View className="items-center bg-background py-8 rounded-xl">
                <Text className="text-muted-foreground text-sm text-center">
                  Atualizações recentes do evento aparecerão aqui
                </Text>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
