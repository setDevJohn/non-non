import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { Home, Calendar, Plus, Trophy, User, Settings, LogOut, X, Bell, Award, MessageCircle } from 'lucide-react-native';
import { useAuthStore } from '@/store';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const insets = useSafeAreaInsets();

  const menuItems = [
    { icon: Home, label: 'Início', path: '/(tabs)/dashboard' },
    { icon: Calendar, label: 'Eventos', path: '/(tabs)/events' },
    { icon: Plus, label: 'Registrar', path: '/(tabs)/register' },
    { icon: MessageCircle, label: 'Feed', path: '/(tabs)/feed' },
    { icon: Trophy, label: 'Ranking', path: '/(tabs)/ranking' },
    { icon: Award, label: 'Conquistas', path: '/(tabs)/badges' },
    { icon: Bell, label: 'Notificações', path: '/(tabs)/notifications' },
    { icon: User, label: 'Perfil', path: '/(tabs)/profile' },
  ];

  const handleNavigate = (path: string) => {
    router.push(path as any);
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <View className="absolute inset-0 z-50">
      {/* Overlay */}
      <TouchableOpacity 
        className="flex-1 bg-black/50" 
        activeOpacity={1}
        onPress={onClose}
      />
      
      {/* Sidebar */}
      <View className="absolute left-0 top-0 bottom-0 w-72 bg-zinc-900 border-r border-zinc-800">
        {/* Header */}
        <View 
          className="p-6 border-b border-zinc-800 flex-row justify-between items-center"
          style={{ paddingTop: insets.top + 8 }}
        >
          <Text className="text-white font-extrabold text-xl">Gym Competition</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#a1a1aa" />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <ScrollView className="flex-1 p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <TouchableOpacity
                key={item.path}
                className={`flex-row items-center p-4 rounded-2xl mb-2 ${
                  isActive ? 'bg-emerald-500/20' : 'bg-zinc-800'
                }`}
                onPress={() => handleNavigate(item.path)}
              >
                <Icon 
                  size={20} 
                  color={isActive ? '#10b981' : '#a1a1aa'} 
                />
                <Text 
                  className={`ml-3 font-medium ${
                    isActive ? 'text-emerald-500' : 'text-zinc-400'
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Footer */}
        <View className="p-4 border-t border-zinc-800">
          <TouchableOpacity
            className="flex-row items-center p-4 rounded-2xl bg-zinc-800"
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Settings size={20} color="#a1a1aa" />
            <Text className="ml-3 font-medium text-zinc-400">Configurações</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="flex-row items-center p-4 rounded-2xl bg-red-500/10 mt-2"
            onPress={handleLogout}
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="ml-3 font-medium text-red-500">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
