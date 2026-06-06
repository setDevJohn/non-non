import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { eventService } from '@/services';
import { Event } from '@/types';
import { Card, Button, SafeScreen } from '@/components/ui';
import { ArrowLeft, Users, Trophy, Calendar, Clock, Share2, Settings } from 'lucide-react-native';

export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ranking' | 'feed'>('ranking');

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const eventData = await eventService.getEventById(id);
      setEvent(eventData);
    } catch (error) {
      console.error('Error loading event:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeScreen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10b981" />
        </View>
      </SafeScreen>
    );
  }

  if (!event) {
    return (
      <SafeScreen>
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-zinc-400 text-lg text-center">Evento não encontrado</Text>
          <Button
            title="Voltar"
            onPress={() => router.back()}
            className="mt-4"
          />
        </View>
      </SafeScreen>
    );
  }

  const sortedParticipants = [...event.participants].sort((a, b) => a.ranking - b.ranking);

  return (
    <SafeScreen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity onPress={() => router.back()} className="bg-zinc-900 p-3 rounded-2xl">
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <View className="flex-row gap-3">
              <TouchableOpacity className="bg-zinc-900 p-3 rounded-2xl">
                <Share2 size={24} color="#a1a1aa" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-zinc-900 p-3 rounded-2xl">
                <Settings size={24} color="#a1a1aa" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Event Info Card */}
          <Card className="mb-6 p-5 border-l-4 border-l-emerald-500">
            <Text className="text-white font-extrabold text-2xl mb-3">{event.name}</Text>
            <Text className="text-zinc-400 text-base leading-relaxed mb-5">{event.description}</Text>

            <View className="flex-row gap-4 mb-4">
              <View className="flex-row items-center flex-1">
                <Calendar size={18} color="#a1a1aa" className="mr-2" />
                <View>
                  <Text className="text-zinc-500 text-xs">Início</Text>
                  <Text className="text-white font-semibold text-sm">
                    {new Date(event.startDate).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center flex-1">
                <Clock size={18} color="#a1a1aa" className="mr-2" />
                <View>
                  <Text className="text-zinc-500 text-xs">Fim</Text>
                  <Text className="text-white font-semibold text-sm">
                    {new Date(event.endDate).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between items-center bg-zinc-800 p-4 rounded-2xl">
              <View className="flex-row items-center">
                <Users size={20} color="#a1a1aa" className="mr-2" />
                <Text className="text-white font-semibold">
                  {event.participants.length} / {event.maxParticipants}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Trophy size={20} color="#facc15" className="mr-2" />
                <Text className="text-yellow-400 font-black text-lg">R$ {event.prizePool || 0}</Text>
              </View>
            </View>
          </Card>

          {/* Tabs */}
          <View className="flex-row gap-2 mb-6">
            <TouchableOpacity
              onPress={() => setActiveTab('ranking')}
              className={`flex-1 py-4 rounded-2xl ${
                activeTab === 'ranking' ? 'bg-emerald-500' : 'bg-zinc-800'
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === 'ranking' ? 'text-white' : 'text-zinc-400'
                }`}
              >
                Ranking
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('feed')}
              className={`flex-1 py-4 rounded-2xl ${
                activeTab === 'feed' ? 'bg-emerald-500' : 'bg-zinc-800'
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === 'feed' ? 'text-white' : 'text-zinc-400'
                }`}
              >
                Feed
              </Text>
            </TouchableOpacity>
          </View>

          {/* Ranking Tab */}
          {activeTab === 'ranking' && (
            <View>
              {sortedParticipants.length === 0 ? (
                <Card className="items-center py-12">
                  <Users size={48} color="#3f3f46" />
                  <Text className="text-zinc-400 font-semibold text-base mt-4">
                    Nenhum participante ainda
                  </Text>
                </Card>
              ) : (
                sortedParticipants.map((participant, index) => (
                  <Card
                    key={participant.userId}
                    className={`mb-3 p-4 ${
                      index === 0
                        ? 'border-l-4 border-l-yellow-400 bg-yellow-400/5'
                        : index === 1
                        ? 'border-l-4 border-l-slate-300 bg-slate-300/5'
                        : index === 2
                        ? 'border-l-4 border-l-amber-700 bg-amber-700/5'
                        : ''
                    }`}
                  >
                    <View className="flex-row items-center">
                      <View
                        className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
                          index === 0
                            ? 'bg-yellow-400'
                            : index === 1
                            ? 'bg-slate-300'
                            : index === 2
                            ? 'bg-amber-700'
                            : 'bg-zinc-800'
                        }`}
                      >
                        <Text className="font-black text-base">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-semibold text-base">{participant.userName}</Text>
                        <Text className="text-zinc-400 text-sm">{participant.points} pontos</Text>
                      </View>
                      <View className="bg-zinc-800 px-3 py-1 rounded-full">
                        <Text className="text-emerald-500 font-bold text-sm">#{participant.ranking}</Text>
                      </View>
                    </View>
                  </Card>
                ))
              )}
            </View>
          )}

          {/* Feed Tab */}
          {activeTab === 'feed' && (
            <Card className="items-center py-12">
              <Text className="text-zinc-400 font-semibold text-base">Feed do evento em breve</Text>
              <Text className="text-zinc-500 text-sm mt-2">Acompanhe as atividades dos participantes</Text>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
