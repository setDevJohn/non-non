import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Tabs } from 'expo-router';
import { useAuthStore } from '@/store';
import { Footer } from '@/components/layout/Footer';

export default function TabsLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-zinc-950 items-center justify-center">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Content */}
      <View className="flex-1 pb-20">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
          }}
        >
          <Tabs.Screen name="dashboard" />
          <Tabs.Screen name="feed" />
          <Tabs.Screen name="register" />
          <Tabs.Screen name="events" />
          <Tabs.Screen name="profile" />
        </Tabs>
      </View>

      {/* Footer */}
      <Footer />
    </View>
  );
}
