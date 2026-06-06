import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore, useEventStore, useHydrationStore } from '@/store';
import { Card, Button, SafeScreen } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { Droplets, Trophy, Calendar, Clock, Flame, CheckCircle, Circle } from 'lucide-react-native';
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
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header />

    <View className="p-6 pb-4">
                  <Card className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-extrabold text-white text-xl">Missões Diárias</Text>
        
            </View>

            {/* Mission Cards */}
            <View className="flex-col gap-3">
              {/* Workout Mission */}
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/register')}
                className="bg-zinc-800/50 p-4 border border-zinc-800 rounded-2xl"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <View className="bg-emerald-500/20 mr-3 p-3 rounded-xl">
                    <Flame size={20} color="#10b981" />
                  </View>
                  <View className="flex-1">
                    <Text className="mb-1 font-semibold text-white text-base">
                      Registrar Treino
                    </Text>
                    <Text className="text-zinc-400 text-xs">
                      Complete seu treino diário
                    </Text>
                  </View>
                  <View className="bg-emerald-500/20 px-3 py-1 rounded-xl">
                    <Text className="font-bold text-emerald-500 text-sm">+2 pts</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Hydration Mission */}
              <TouchableOpacity
                onPress={() => {}}
                className="bg-zinc-800/50 p-4 border border-zinc-800 rounded-2xl"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <View className="bg-blue-500/20 mr-3 p-3 rounded-xl">
                    <Droplets size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="mb-1 font-semibold text-white text-base">
                      Meta de Água
                    </Text>
                    <Text className="text-zinc-400 text-xs">
                      Beba {todayStats?.todayGoal || 0}ml hoje
                    </Text>
                  </View>
                  <View className="bg-blue-500/20 px-3 py-1 rounded-xl">
                    <Text className="font-bold text-blue-400 text-sm">+1 pt</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Current Event Card */}
          {currentEvent ? (
            <Card className="bg-gradient-to-br from-emerald-900/30 to-zinc-900 mb-6 p-6 border border-emerald-500/20">
              {/* Top Section: Status and Name */}
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1">
                  {/* Status Badge */}
                  <View className="self-start bg-emerald-500/20 mb-3 px-3 py-1 rounded-full">
                    <Text className="font-semibold text-emerald-500 text-xs uppercase">
                      {currentEvent.status === 'active' ? 'Em Andamento' : currentEvent.status}
                    </Text>
                  </View>
                  
                  {/* Event Name */}
                  <Text className="font-black text-white text-2xl leading-tight">
                    {currentEvent.name}
                  </Text>
                </View>

                {/* Prize */}
                <View className="bg-yellow-500/10 px-4 py-3 border border-yellow-500/20 rounded-2xl">
                  <Text className="mb-1 font-medium text-zinc-400 text-xs">Entrada</Text>
                  <Text className="font-black text-yellow-400 text-xl">
                    R$ {currentEvent.entryFee || 0}
                  </Text>
                </View>
              </View>

              {/* Metrics Section */}
              <View className="flex-row gap-4 mb-6">
                {/* Days Remaining */}
                <View className="flex-1 bg-zinc-800/60 p-4 rounded-2xl">
                  <View className="flex-row items-center mb-2">
                    <Clock size={16} color="#a1a1aa" className="mr-2" />
                    <Text className="font-medium text-zinc-400 text-xs">Dias Restantes</Text>
                  </View>
                  <Text className="font-black text-white text-2xl">
                    {daysUntilEventEnd}
                  </Text>
                </View>

                {/* Status */}
                <View className="flex-1 bg-zinc-800/60 p-4 rounded-2xl">
                  <View className="flex-row items-center mb-2">
                    <Flame size={16} color="#10b981" className="mr-2" />
                    <Text className="font-medium text-zinc-400 text-xs">Status</Text>
                  </View>
                  <Text className="font-black text-emerald-500 text-2xl">
                    {currentEvent.status === 'active' ? 'Ativo' : currentEvent.status}
                  </Text>
                </View>
              </View>

              {/* Recovery Alert (inside main card) */}
              {showRecoveryCard && (
                <View className="bg-emerald-500/10 mb-4 p-4 border border-emerald-500/20 rounded-2xl">
                  <View className="flex-row items-center">
                    <View className="bg-emerald-500/20 mr-3 p-2 rounded-xl">
                      <Flame size={20} color="#10b981" />
                    </View>
                    <View className="flex-1">
                      <Text className="mb-1 font-bold text-emerald-500 text-sm">
                        Fim de semana disponível!
                      </Text>
                      <Text className="text-zinc-400 text-xs">
                        Você ainda pode recuperar pontos neste fim de semana.
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* View Details Button */}
              <TouchableOpacity
                onPress={() => router.push(`/events/${currentEvent.id}`)}
                className="items-center bg-zinc-800/60 py-3 rounded-2xl"
                activeOpacity={0.7}
              >
                <Text className="font-semibold text-white text-sm">Ver Detalhes do Evento</Text>
              </TouchableOpacity>
            </Card>
          ) : (
            <Card className="items-center mb-6 p-6">
              <Calendar size={48} color="#a1a1aa" className="mb-4" />
              <Text className="mb-2 font-semibold text-white text-lg text-center">
                Você não está participando de nenhum evento no momento
              </Text>
              <Text className="mb-4 text-zinc-400 text-sm text-center">
                Crie um novo evento ou entre em um evento de um amigo
              </Text>
              <Button
                title="Ver Eventos"
                onPress={() => router.push('/events')}
              />
            </Card>
          )}

          {/* Hydration Card */}
          <Card className="bg-zinc-800/50 mb-6 p-5 border border-zinc-800">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <View className="bg-blue-500/20 mr-3 p-2 rounded-xl">
                  <Droplets size={20} color="#3b82f6" />
                </View>
                <Text className="font-extrabold text-white text-lg">Meta de Água</Text>
              </View>
              <Text className="font-bold text-blue-400 text-lg">
                {isNaN(hydrationProgress) ? '0' : hydrationProgress.toFixed(0)}%
              </Text>
            </View>

            {/* Progress Bar */}
            <View className="bg-zinc-950 mb-4 border border-zinc-800 rounded-full w-full h-4 overflow-hidden">
              <Animated.View
                className="bg-gradient-to-r from-blue-400 to-blue-300 rounded-full h-4"
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
              <Text className="flex-1 text-zinc-400 text-sm">
                {todayStats?.todayAmount || 0}ml / {todayStats?.todayGoal || 0}ml
              </Text>

              {/* Quick Actions */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleAddWater(250)}
                  className="items-center bg-blue-500/20 px-4 py-2 border border-blue-500/30 rounded-xl"
                  activeOpacity={0.7}
                >
                  <Text className="font-bold text-blue-400 text-sm">+250ml</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAddWater(500)}
                  className="items-center bg-blue-500/20 px-4 py-2 border border-blue-500/30 rounded-xl"
                  activeOpacity={0.7}
                >
                  <Text className="font-bold text-blue-400 text-sm">+500ml</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          {/* Event Feed Preview */}
          {currentEvent && (
            <Card className="bg-zinc-800/50 mb-6 p-5 border border-zinc-800">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-extrabold text-white text-lg">Feed do Evento</Text>
                <TouchableOpacity onPress={() => router.push(`/events/${currentEvent.id}`)}>
                  <Text className="font-semibold text-emerald-500 text-sm">Ver todos</Text>
                </TouchableOpacity>
              </View>
              
              <View className="items-center bg-zinc-900/50 py-8 rounded-2xl">
                <Text className="text-zinc-400 text-sm text-center">
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
