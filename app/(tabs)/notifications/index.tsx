import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, SafeScreen, RefreshWrapper } from '@/components/ui';
import { Bell, Trophy, AlertCircle, Calendar, TrendingUp, Flame, Award, CheckCircle2 } from 'lucide-react-native';
import { useNotificationsStore } from '@/store';

export default function NotificationsScreen() {
  const { notifications, unreadCount, isLoading, fetchNotifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationsStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchNotifications();
    } catch (error) {
      console.error('Error refreshing notifications:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'social':
        return <Flame size={24} color="#facc15" />;
      case 'system':
        return <Bell size={24} color="#10b981" />;
      case 'event':
        return <Calendar size={24} color="#3b82f6" />;
      default:
        return <AlertCircle size={24} color="#ef4444" />;
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
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-white font-extrabold text-3xl">Notificações</Text>
            {unreadCount > 0 && (
              <TouchableOpacity onPress={handleMarkAllAsRead} activeOpacity={0.7}>
                <Text className="text-emerald-500 font-semibold">Marcar todas como lidas</Text>
              </TouchableOpacity>
            )}
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
                      {getIcon(notification.type)}
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
    </RefreshWrapper>
  </SafeScreen>
  );
}
