import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store';
import { Button } from '@/components/ui';
import { Dumbbell, Trophy, Users, Droplets } from 'lucide-react-native';

const onboardingSlides = [
  {
    id: 1,
    title: 'Treine. Compita. Vença.',
    description: 'Bem-vindo ao Gym Competition! Transforme seus treinos em uma experiência competitiva e social.',
    icon: <Dumbbell size={120} color="#10b981" />,
  },
  {
    id: 2,
    title: 'Sistema de Pontos',
    description: 'Segunda: +2 pts\nTerça-Quinta: +1 pt\nSexta: +3 pts\nFim de semana: Recuperação\nÁgua: +1 pt',
    icon: <Trophy size={120} color="#facc15" />,
  },
  {
    id: 3,
    title: 'Conquistas e Feed Social',
    description: 'Desbloqueie badges, compartilhe seus treinos e compita com amigos em eventos emocionantes.',
    icon: <Users size={120} color="#3b82f6" />,
  },
  {
    id: 4,
    title: 'Hidratação é Chave',
    description: 'Acompanhe sua ingestão de água diária e ganhe pontos extras por bater suas metas.',
    icon: <Droplets size={120} color="#3b82f6" />,
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { completeOnboarding } = useAuthStore();

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      completeOnboarding();
      router.replace('/(auth)/login');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace('/(auth)/login');
  };

  const currentSlide = onboardingSlides[currentIndex];

  return (
    <View className="flex-1 bg-zinc-950">
      <ScrollView contentContainerClassName="flex-1 justify-center p-8">
        <View className="items-center mb-12">
          {currentSlide.icon}
        </View>
        
        <Text className="text-white font-extrabold text-3xl text-center mb-4">
          {currentSlide.title}
        </Text>
        
        <Text className="text-zinc-400 text-center text-lg leading-relaxed mb-8">
          {currentSlide.description}
        </Text>

        <View className="flex-row justify-center mb-8">
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                index === currentIndex ? 'bg-emerald-500 w-8' : 'bg-zinc-700 w-2'
              }`}
            />
          ))}
        </View>

        <Button
          title={currentIndex === onboardingSlides.length - 1 ? 'Começar' : 'Próximo'}
          onPress={handleNext}
          className="mb-4"
        />

        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-zinc-500 text-center font-medium">
            Pular
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
