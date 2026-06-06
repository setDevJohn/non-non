import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, SafeScreen } from '@/components/ui';
import { AlertCircle, Home } from 'lucide-react-native';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeScreen>
      <View className="flex-1 items-center justify-center p-6">
        <View className="bg-zinc-900 p-6 rounded-full mb-6">
          <AlertCircle size={64} color="#ef4444" />
        </View>
        
        <Text className="text-white font-extrabold text-3xl mb-3 text-center">
          Página não encontrada
        </Text>
        
        <Text className="text-zinc-400 text-base text-center mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida.
        </Text>
        
        <View className="w-full gap-4">
          <Button
            title="Voltar para Home"
            onPress={() => router.replace('/(tabs)/dashboard')}
            icon={<Home size={20} color="#fff" />}
          />
          
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center py-4"
          >
            <Text className="text-zinc-400 font-semibold text-base">
              Voltar para a página anterior
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}
