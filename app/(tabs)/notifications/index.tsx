import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui';
import { Bell, Trophy, AlertCircle, Calendar, TrendingUp, Flame, Award, CheckCircle2 } from 'lucide-react-native';

const mockNotifications = [
  {
    id: '1',
    category: 'social' as const,
    type: 'surpassed' as const,
    title: 'Você foi ultrapassado!',
    message: 'Maria Santos agora está à sua frente no ranking.',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    category: 'system' as const,
    type: 'workout_reminder' as const,
    title: 'Hora de treinar!',
    message: 'Não esqueça de registrar seu treino hoje.',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    category: 'event' as const,
    type: 'event_invite' as const,
    title: 'Convite para evento',
    message: 'Você foi convidado para participar do Desafio Corporativo.',
    read: true,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    category: 'recovery' as const,
    type: 'weekend_recovery' as const,
    title: 'Recuperação disponível',
    message: 'Fim de semana disponível para recuperação de pontos.',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '5',
    category: 'social' as const,
    type: 'achievement_unlocked' as const,
    title: 'Nova conquista!',
    message: 'Você desbloqueou a conquista Guardião das Marés!',
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (category: string, type: string) => {
    switch (category) {
      case 'social':
        return <Flame size={24} color="#facc15" />;
      case 'system':
        return <Bell size={24} color="#10b981" />;
      case 'event':
        return <Calendar size={24} color="#3b82f6" />;
      case 'recovery':
        return <TrendingUp size={24} color="#a1a1aa" />;
      default:
        return <AlertCircle size={24} color="#ef4444" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  return (
    <ScrollView 
      className="flex-1 bg-zinc-950"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6 pt-12">
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-white font-extrabold text-3xl">Notificações</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-emerald-500 font-semibold">Marcar todas como lidas</Text>
          </TouchableOpacity>
        </View>

        {notifications.length === 0 ? (
          <Card className="items-center py-16">
            <Bell size={72} color="#3f3f46" />
            <Text className="text-zinc-400 font-semibold text-lg mt-4">
              Nenhuma notificação
            </Text>
            <Text className="text-zinc-500 text-sm mt-2">
              Você está por dia!
            </Text>
          </Card>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => markAsRead(notification.id)}
              activeOpacity={0.7}
            >
              <Card
                className={`mb-4 p-5 ${
                  !notification.read ? 'bg-zinc-800 border-l-4 border-l-emerald-500' : ''
                }`}
              >
                <View className="flex-row">
                  <View className="mr-4">
                    <View className={`p-3 rounded-2xl ${
                      notification.category === 'social' ? 'bg-yellow-500/20' :
                      notification.category === 'system' ? 'bg-emerald-500/20' :
                      notification.category === 'event' ? 'bg-blue-500/20' :
                      notification.category === 'recovery' ? 'bg-zinc-700' :
                      'bg-red-500/20'
                    }`}>
                      {getIcon(notification.category, notification.type)}
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      {notification.title}
                    </Text>
                    <Text className="text-zinc-400 text-sm mb-3 leading-relaxed">
                      {notification.message}
                    </Text>
                    <Text className="text-zinc-500 text-xs">
                      {new Date(notification.createdAt).toLocaleDateString('pt-BR')} •{' '}
                      {new Date(notification.createdAt).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                  {!notification.read && (
                    <View className="w-3 h-3 rounded-full bg-emerald-500 ml-2" />
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}
