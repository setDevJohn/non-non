import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useEventStore, useRankingsStore } from '@/store';
import { Card, RefreshWrapper, SafeScreen } from '@/components/ui';
import { Trophy, Medal, TrendingUp, Award } from 'lucide-react-native';

export default function RankingScreen() {
  const { events, fetchEvents } = useEventStore();
  const { weeklyRanking, eventRanking, userPosition, fetchWeeklyRanking, fetchEventRanking, fetchUserPosition } = useRankingsStore();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents();
    fetchWeeklyRanking();
    fetchUserPosition();
  }, [fetchEvents, fetchWeeklyRanking, fetchUserPosition]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchEvents(), fetchWeeklyRanking(), fetchUserPosition()]);
    } catch (error) {
      console.error('Error refreshing ranking:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const activeEvent = events.find((e) => e.status === 'active');
  const selectedEvent = selectedEventId 
    ? events.find((e) => e.id === selectedEventId)
    : activeEvent;

  // Use rankings from API if available, otherwise fall back to event participants
  const currentRanking = selectedEventId && eventRanking.length > 0 
    ? eventRanking 
    : weeklyRanking;

  const sortedParticipants = currentRanking || [];

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal size={24} color="#fde047" />;
      case 2:
        return <Medal size={24} color="#cbd5e1" />;
      case 3:
        return <Medal size={24} color="#b45309" />;
      default:
        return <Trophy size={20} color="#a1a1aa" />;
    }
  };

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-slate-300';
      case 3:
        return 'text-amber-700';
      default:
        return 'text-zinc-400';
    }
  };

  return (
    <SafeScreen>
      <RefreshWrapper
        onRefresh={onRefresh}
        refreshing={refreshing}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-white font-extrabold text-3xl">Rankings</Text>
            <View className="bg-emerald-500/20 p-3 rounded-2xl">
              <Trophy size={24} color="#10b981" />
            </View>
          </View>

        {/* Event Selection */}
        {events.length > 0 && (
          <View className="mb-6">
            <Text className="text-zinc-400 font-semibold mb-3">Selecione o Evento</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3">
              {events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  onPress={() => setSelectedEventId(event.id)}
                  className={`px-4 py-3 rounded-2xl ${
                    selectedEvent?.id === event.id
                      ? 'bg-emerald-500'
                      : 'bg-zinc-800'
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      selectedEvent?.id === event.id ? 'text-white' : 'text-zinc-400'
                    }`}
                  >
                    {event.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Top 3 Podium */}
        {sortedParticipants.length >= 3 && (
          <View className="flex-row items-end justify-center mb-8">
            {/* 2nd Place */}
            <View className="items-center mx-2">
              <View className="bg-zinc-800 p-4 rounded-2xl mb-3">
                {getMedalIcon(2)}
              </View>
              <View className="w-16 h-16 rounded-full bg-zinc-700 items-center justify-center mb-2">
                <Text className="text-white font-black text-xl">
                  {sortedParticipants[1]?.user?.name?.charAt(0) || '?'}
                </Text>
              </View>
              <Text className="text-white font-bold text-sm mb-1">
                {sortedParticipants[1]?.user?.name?.split(' ')[0] || 'Usuário'}
              </Text>
              <Text className="text-slate-300 font-black text-lg">
                {sortedParticipants[1]?.points || 0}
              </Text>
              <View className="bg-slate-700 w-12 h-20 rounded-t-2xl mt-2" />
            </View>

            {/* 1st Place */}
            <View className="items-center mx-2">
              <View className="bg-yellow-500/20 p-4 rounded-2xl mb-3">
                {getMedalIcon(1)}
              </View>
              <View className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 items-center justify-center mb-2 border-4 border-yellow-400">
                <Text className="text-white font-black text-2xl">
                  {sortedParticipants[0]?.user?.name?.charAt(0) || '?'}
                </Text>
              </View>
              <Text className="text-white font-bold text-base mb-1">
                {sortedParticipants[0]?.user?.name?.split(' ')[0] || 'Usuário'}
              </Text>
              <Text className="text-yellow-400 font-black text-2xl">
                {sortedParticipants[0]?.points || 0}
              </Text>
              <View className="bg-yellow-500 w-14 h-28 rounded-t-2xl mt-2" />
            </View>

            {/* 3rd Place */}
            <View className="items-center mx-2">
              <View className="bg-zinc-800 p-4 rounded-2xl mb-3">
                {getMedalIcon(3)}
              </View>
              <View className="w-16 h-16 rounded-full bg-zinc-700 items-center justify-center mb-2">
                <Text className="text-white font-black text-xl">
                  {sortedParticipants[2]?.user?.name?.charAt(0) || '?'}
                </Text>
              </View>
              <Text className="text-white font-bold text-sm mb-1">
                {sortedParticipants[2]?.user?.name?.split(' ')[0] || 'Usuário'}
              </Text>
              <Text className="text-amber-700 font-black text-lg">
                {sortedParticipants[2]?.points || 0}
              </Text>
              <View className="bg-amber-900 w-12 h-16 rounded-t-2xl mt-2" />
            </View>
          </View>
        )}

        {/* Full Rankings List */}
        <Card className="mb-6">
          <View className="flex-row items-center justify-between mb-5 pb-4 border-b border-zinc-800">
            <Text className="text-white font-extrabold text-xl">Classificação</Text>
            <View className="flex-row items-center">
              <TrendingUp size={18} color="#10b981" />
              <Text className="text-emerald-500 font-semibold ml-2">
                {sortedParticipants.length} participantes
              </Text>
            </View>
          </View>

          {sortedParticipants.length === 0 ? (
            <View className="items-center py-12">
              <Award size={64} color="#3f3f46" />
              <Text className="text-zinc-400 font-semibold text-lg mt-4">
                Nenhum participante
              </Text>
              <Text className="text-zinc-500 text-sm mt-2">
                Seja o primeiro a participar!
              </Text>
            </View>
          ) : (
            sortedParticipants.map((participant, index) => (
              <View
                key={participant.userId}
                className={`flex-row items-center py-4 ${
                  index < sortedParticipants.length - 1 ? 'border-b border-zinc-800' : ''
                }`}
              >
                <View className="w-10 h-10 rounded-full bg-zinc-800 items-center justify-center mr-4">
                  <Text className="text-white font-black text-lg">
                    {participant.user?.name?.charAt(0) || '?'}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold text-base">
                    {participant.user?.name || 'Usuário'}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <View className="mr-4">
                    {getMedalIcon(index + 1)}
                  </View>
                  <Text className={`${getMedalColor(index + 1)} font-black text-xl w-12 text-center`}>
                    {participant.points || 0}
                  </Text>
                </View>
              </View>
            ))
          )}
        </Card>
      </View>
    </RefreshWrapper>
  </SafeScreen>
  );
}
