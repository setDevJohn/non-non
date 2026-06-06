import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, X, CheckCircle, Trophy, Flame, Calendar } from 'lucide-react-native';

interface Notification {
  id: string;
  type: 'achievement' | 'workout' | 'event' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function NotificationsModal({ visible, onClose }: NotificationsModalProps) {
  const insets = useSafeAreaInsets();

  // Mock notifications - replace with actual data from API
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'achievement',
      title: 'Nova Conquista!',
      message: 'Você desbloqueou a conquista "Guerreiro da Semana"',
      timestamp: '2h atrás',
      read: false,
    },
    {
      id: '2',
      type: 'workout',
      title: 'Treino Registrado',
      message: 'Seu treino de hoje foi registrado com sucesso',
      timestamp: '5h atrás',
      read: false,
    },
    {
      id: '3',
      type: 'event',
      title: 'Evento Atualizado',
      message: 'O evento "Desafio de Verão" foi atualizado',
      timestamp: '1d atrás',
      read: true,
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Lembrete de Água',
      message: 'Não esqueça de beber água!',
      timestamp: '1d atrás',
      read: true,
    },
  ];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'achievement':
        return <Trophy size={20} color="#facc15" />;
      case 'workout':
        return <Flame size={20} color="#10b981" />;
      case 'event':
        return <Calendar size={20} color="#3b82f6" />;
      case 'reminder':
        return <Bell size={20} color="#a1a1aa" />;
      default:
        return <Bell size={20} color="#a1a1aa" />;
    }
  };

  const getNotificationBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'achievement':
        return 'bg-yellow-500/20';
      case 'workout':
        return 'bg-emerald-500/20';
      case 'event':
        return 'bg-blue-500/20';
      case 'reminder':
        return 'bg-zinc-800';
      default:
        return 'bg-zinc-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-zinc-950" style={{ paddingTop: insets.top }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-zinc-800">
          <View className="flex-row items-center">
            <Bell size={24} color="#10b981" />
            <Text className="text-white font-extrabold text-xl ml-3">Notificações</Text>
            {unreadCount > 0 && (
              <View className="bg-emerald-500 px-2 py-0.5 rounded-full ml-3">
                <Text className="text-white font-semibold text-xs">{unreadCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <X size={24} color="#a1a1aa" />
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-4">
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                className={`mb-3 p-4 rounded-2xl ${notification.read ? 'bg-zinc-900' : 'bg-zinc-800'}`}
                activeOpacity={0.7}
              >
                <View className="flex-row">
                  <View className={`p-3 rounded-2xl mr-4 ${getNotificationBgColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-white font-semibold text-base">
                        {notification.title}
                      </Text>
                      {!notification.read && (
                        <View className="bg-emerald-500 w-2 h-2 rounded-full" />
                      )}
                    </View>
                    <Text className="text-zinc-400 text-sm mb-2 leading-relaxed">
                      {notification.message}
                    </Text>
                    <Text className="text-zinc-500 text-xs">{notification.timestamp}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {notifications.length === 0 && (
              <View className="items-center py-16">
                <Bell size={72} color="#3f3f46" />
                <Text className="text-zinc-400 font-semibold text-lg mt-4">
                  Nenhuma notificação
                </Text>
                <Text className="text-zinc-500 text-sm mt-2">
                  Você está por dia!
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Mark All as Read Button */}
        {unreadCount > 0 && (
          <View className="p-4 border-t border-zinc-800" style={{ paddingBottom: insets.bottom + 16 }}>
            <TouchableOpacity
              className="bg-zinc-800 py-4 rounded-2xl items-center"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <CheckCircle size={20} color="#10b981" />
                <Text className="text-emerald-500 font-semibold ml-2">
                  Marcar todas como lidas
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}
