import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Home, MessageCircle, Plus, Calendar, User } from 'lucide-react-native';

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const footerItems = [
    { icon: Home, label: 'Início', path: '/(tabs)/dashboard' },
    { icon: MessageCircle, label: 'Feed', path: '/(tabs)/feed' },
    { icon: Plus, label: 'Registrar', path: '/(tabs)/register', highlight: true },
    { icon: Calendar, label: 'Eventos', path: '/(tabs)/events' },
    { icon: User, label: 'Perfil', path: '/(tabs)/profile' },
  ];

  return (
    <View className="bg-zinc-900 border-t border-zinc-800 px-4 py-3">
      <View className="flex-row justify-around items-center">
        {footerItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          const isHighlight = item.highlight;
          
          return (
            <TouchableOpacity
              key={item.path}
              className={`flex-1 items-center py-2 ${isHighlight ? '-mt-6' : ''}`}
              onPress={() => router.push(item.path as any)}
              activeOpacity={0.7}
            >
              <View
                className={`${
                  isHighlight
                    ? 'bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-500/30'
                    : ''
                }`}
              >
                <Icon
                  size={isHighlight ? 28 : 20}
                  color={isActive ? '#10b981' : isHighlight ? '#fff' : '#a1a1aa'}
                />
              </View>
              <Text
                className={`text-xs mt-1 font-medium ${
                  isActive ? 'text-emerald-500' : 'text-zinc-400'
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
