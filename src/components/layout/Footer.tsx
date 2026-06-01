import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Trophy, Bell, User } from 'lucide-react-native';

export function Footer() {
  const router = useRouter();

  const footerItems = [
    { icon: Plus, label: 'Registrar', path: '/(tabs)/register' },
    { icon: Trophy, label: 'Ranking', path: '/(tabs)/ranking' },
    { icon: Bell, label: 'Notificações', path: '/(tabs)/notifications' },
    { icon: User, label: 'Perfil', path: '/(tabs)/profile' },
  ];

  return (
    <View className="bg-zinc-900 border-t border-zinc-800 px-4 py-3">
      <View className="flex-row justify-around items-center">
        {footerItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <TouchableOpacity
              key={item.path}
              className="flex-1 items-center py-2"
              onPress={() => router.push(item.path as any)}
              activeOpacity={0.7}
            >
              <Icon size={20} color="#a1a1aa" />
              <Text className="text-zinc-400 text-xs mt-1 font-medium">
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
