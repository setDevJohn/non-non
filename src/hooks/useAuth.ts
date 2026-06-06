import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store';

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, router]);

  return { user, isAuthenticated };
};
