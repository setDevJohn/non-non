import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { useAuthStore } from '@/store';
import { NotificationsModal } from './NotificationsModal';

interface HeaderProps {
  onNotificationPress?: () => void;
}

export function Header({ onNotificationPress }: HeaderProps) {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const [showNotifications, setShowNotifications] = React.useState(false);

  const handleNotificationPress = () => {
    setShowNotifications(true);
    onNotificationPress?.();
  };

  return (
    <>
      <View
        className="bg-zinc-900 border-b border-zinc-800 px-4 pb-4"
        style={{ paddingTop: insets.top + 12 }}
      >
        <View className="flex-row items-center justify-between">
          {/* Avatar and Welcome Area */}
          <View className="flex-row items-center flex-1">
            {/* Avatar */}
            <View className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 items-center justify-center mr-4 border-2 border-emerald-500/30">
              <Text className="text-white font-black text-lg">
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </View>

            {/* Welcome Area */}
            <View className="flex-1">
              <Text className="text-zinc-400 text-xs font-bold mb-0.5">
                BEM-VINDO(A) DE VOLTA
              </Text>
              <Text className="text-white font-extrabold text-lg leading-tight">
                {user?.name?.split(' ')[0] || 'atleta'}
              </Text>
            </View>
          </View>

          {/* Notifications */}
          <TouchableOpacity
            onPress={handleNotificationPress}
            className="bg-zinc-800 p-3 rounded-2xl relative"
            activeOpacity={0.7}
          >
            <Bell size={20} color="#a1a1aa" />
            <View className="absolute -top-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-zinc-900" />
          </TouchableOpacity>
        </View>
      </View>

      <NotificationsModal
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}
