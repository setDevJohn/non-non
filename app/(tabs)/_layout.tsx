import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { Menu } from 'lucide-react-native';
import { useAuthStore } from '@/store';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const insets = useSafeAreaInsets();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <View className="flex-1 bg-zinc-950">
        {/* Header with menu button */}
        <View 
          className="bg-zinc-900 border-b border-zinc-800 p-4 flex-row items-center"
          style={{ paddingTop: insets.top + 8 }}
        >
          <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
            <Menu size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white font-extrabold text-xl ml-4">Gym Competition</Text>
        </View>

        {/* Content */}
        <View className="flex-1 pb-16">
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          >
            <Tabs.Screen name="dashboard" />
            <Tabs.Screen name="events" />
            <Tabs.Screen name="register" />
            <Tabs.Screen name="ranking" />
            <Tabs.Screen name="profile" />
          </Tabs>
        </View>

        {/* Footer */}
        <Footer />
      </View>
    </>
  );
}
