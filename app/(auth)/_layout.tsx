import { Stack } from 'expo-router';
import { useAuthStore } from '@/store';

export default function AuthLayout() {
  const { isAuthenticated, onboardingCompleted } = useAuthStore();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!onboardingCompleted ? (
        <Stack.Screen name="onboarding" />
      ) : !isAuthenticated ? (
        <>
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </>
      ) : null}
    </Stack>
  );
}
