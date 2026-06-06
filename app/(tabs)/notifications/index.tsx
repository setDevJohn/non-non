import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, SafeScreen, RefreshWrapper, EmptyState, Badge } from '@/components/ui';
import { Bell, AlertCircle, Calendar, Flame } from 'lucide-react-native';
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
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-foreground font-bold text-3xl">Notificações</Text>
            {unreadCount > 0 && (
              <TouchableOpacity onPress={handleMarkAllAsRead} activeOpacity={0.7}>
                <Text className="text-primary font-semibold">Marcar todas como lidas</Text>
              </TouchableOpacity>
            )}
          </View>

        {notifications.length === 0 ? (
          <EmptyState
            icon={<Bell size={72} color="#3f3f46" />}
            title="Nenhuma notificação"
            description="Você está por dia!"
          />
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => markAsRead(notification.id)}
              activeOpacity={0.7}
            >
              <Card
                variant="interactive"
                className={`mb-4 p-5 ${
                  !notification.read ? 'bg-secondary border-l-4 border-l-primary' : ''
                }`}
              >
                <View className="flex-row">
                  <View className="mr-4">
                    <View className={`p-3 rounded-xl ${
                      notification.category === 'social' ? 'bg-warning/20' :
                      notification.category === 'system' ? 'bg-primary/20' :
                      notification.category === 'event' ? 'bg-info/20' :
                      notification.category === 'recovery' ? 'bg-card' :
                      'bg-destructive/20'
                    }`}>
                      {getIcon(notification.type)}
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-foreground font-bold text-lg mb-1">
                      {notification.title}
                    </Text>
                    <Text className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {notification.message}
                    </Text>
                    <Text className="text-muted-foreground text-xs">
                      {new Date(notification.createdAt).toLocaleDateString('pt-BR')} •{' '}
                      {new Date(notification.createdAt).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                  {!notification.read && (
                    <View className="w-3 h-3 rounded-full bg-primary ml-2" />
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
