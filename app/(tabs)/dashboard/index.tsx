import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore, useEventStore, useHydrationStore } from '@/store';
import { Card, Button } from '@/components/ui';
import { Droplets, Trophy, TrendingUp, Bell, Plus, Flame, Zap } from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { events, fetchEvents } = useEventStore();
  const { todayRecord, fetchTodayRecord } = useHydrationStore();

  useEffect(() => {
    fetchEvents();
    fetchTodayRecord();
  }, [fetchEvents, fetchTodayRecord]);

  const currentEvent = events.find((e) => e.status === 'active');
  const hydrationProgress = todayRecord
    ? (todayRecord.amount / todayRecord.goal) * 100
    : 0;

  return (
    <ScrollView 
      className="flex-1 bg-zinc-950"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6 pt-12">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <View>
            <Text className="text-white font-extrabold text-3xl mb-1">
              Olá, {user?.name?.split(' ')[0]}!
            </Text>
            <Text className="text-zinc-400 font-medium text-base">
              Vamos treinar hoje?
            </Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/notifications')}
            className="bg-zinc-900 p-3 rounded-2xl"
          >
            <Bell size={24} color="#a1a1aa" />
          </TouchableOpacity>
        </View>

        {/* Today's Summary Card */}
        <Card className="mb-6 p-5">
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-white font-extrabold text-xl">Seu Dia</Text>
            <Flame size={20} color="#facc15" />
          </View>
          
          <View className="flex-row justify-between mb-6">
            <View className="items-center flex-1">
              <View className="bg-zinc-800 p-3 rounded-2xl mb-3">
                <Trophy size={28} color="#facc15" />
              </View>
              <Text className="text-white font-black text-2xl">
                {user?.totalPoints || 0}
              </Text>
              <Text className="text-zinc-400 text-sm font-medium">Pontos</Text>
            </View>
            
            <View className="items-center flex-1">
              <View className="bg-zinc-800 p-3 rounded-2xl mb-3">
                <Droplets size={28} color="#3b82f6" />
              </View>
              <Text className="text-white font-black text-2xl">
                {todayRecord?.amount || 0}
              </Text>
              <Text className="text-zinc-400 text-sm font-medium">ml</Text>
            </View>
            
            <View className="items-center flex-1">
              <View className="bg-zinc-800 p-3 rounded-2xl mb-3">
                <TrendingUp size={28} color="#10b981" />
              </View>
              <Text className="text-white font-black text-2xl">
                #{user?.currentRanking || '-'}
              </Text>
              <Text className="text-zinc-400 text-sm font-medium">Ranking</Text>
            </View>
          </View>

          {/* Hydration Progress */}
          <View className="bg-zinc-800 rounded-full h-4 mb-3 overflow-hidden">
            <View
              className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-full h-4"
              style={{ width: `${Math.min(hydrationProgress, 100)}%` }}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-zinc-400 text-sm font-medium">
              Progresso de hidratação
            </Text>
            <Text className="text-blue-400 text-sm font-semibold">
              {todayRecord?.amount || 0} / {todayRecord?.goal || 0}ml
            </Text>
          </View>
        </Card>

        {/* Current Event Card */}
        {currentEvent && (
          <Card className="mb-6 p-5 border-l-4 border-l-emerald-500">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-white font-extrabold text-xl">Evento Ativo</Text>
              <Zap size={20} color="#10b981" />
            </View>
            <Text className="text-emerald-500 font-black text-2xl mb-2">
              {currentEvent.name}
            </Text>
            <Text className="text-zinc-400 mb-5 leading-relaxed">
              {currentEvent.description}
            </Text>
            
            <View className="flex-row justify-between items-center bg-zinc-800 p-4 rounded-2xl">
              <View>
                <Text className="text-yellow-400 font-black text-2xl">
                  R$ {currentEvent.prizePool || 0}
                </Text>
                <Text className="text-zinc-400 text-sm font-medium">Prêmio</Text>
              </View>
              <View className="text-right">
                <Text className="text-white font-bold text-xl">
                  #{user?.currentRanking || '-'}
                </Text>
                <Text className="text-zinc-400 text-sm font-medium">Sua Posição</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Recovery Card (conditional) */}
        <Card className="mb-6 p-5 bg-gradient-to-r from-emerald-900/30 to-zinc-900 border border-emerald-500/30">
          <View className="flex-row items-center">
            <View className="bg-emerald-500/20 p-3 rounded-2xl mr-4">
              <Flame size={24} color="#10b981" />
            </View>
            <View className="flex-1">
              <Text className="text-emerald-500 font-bold text-base mb-1">
                Fim de semana disponível!
              </Text>
              <Text className="text-zinc-400 text-sm">
                Você ainda pode recuperar pontos.
              </Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <View className="flex-row gap-4">
          <Button
            title="Registrar Treino"
            onPress={() => router.push('/(tabs)/register')}
            style={{ flex: 1 }}
            icon={<Plus size={20} color="#fff" />}
          />
          <Button
            title="Adicionar Água"
            onPress={() => router.push('/(tabs)/register')}
            variant="secondary"
            style={{ flex: 1 }}
            icon={<Droplets size={20} color="#fff" />}
          />
        </View>
      </View>
    </ScrollView>
  );
}
