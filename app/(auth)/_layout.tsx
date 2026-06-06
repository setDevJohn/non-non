import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuthStore } from '@/store';

export default function AuthLayout() {
  const { isAuthenticated, isLoading, onboardingCompleted } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (onboardingCompleted) {
        router.replace('/(tabs)/dashboard');
      } else {
        router.replace('/(auth)/onboarding');
      }
    }
  }, [isAuthenticated, isLoading, onboardingCompleted, router]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
