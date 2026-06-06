import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store';
import { Button } from '@/components/ui';
import { Dumbbell, Trophy, Users, Droplets } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const onboardingSlides = [
  {
    id: 1,
    title: 'Treine. Compita. Vença.',
    description: 'Transforme seus treinos em uma experiência competitiva e social com eventos e desafios.',
    icon: <Dumbbell size={140} color="#10b981" />,
    gradient: 'from-emerald-500/20 to-zinc-900',
    iconBg: 'bg-emerald-500/20',
  },
  {
    id: 2,
    title: 'Pontuação Inteligente',
    description: 'Segunda: +2 pts • Terça-Quinta: +1 pt • Sexta: +3 pts • Fim de semana: Recuperação • Água: +1 pt',
    icon: <Trophy size={140} color="#facc15" />,
    gradient: 'from-yellow-500/20 to-zinc-900',
    iconBg: 'bg-yellow-500/20',
  },
  {
    id: 3,
    title: 'Conquistas e Social',
    description: 'Desbloqueie badges, compartilhe treinos e compita com amigos em eventos.',
    icon: <Users size={140} color="#3b82f6" />,
    gradient: 'from-blue-500/20 to-zinc-900',
    iconBg: 'bg-blue-500/20',
  },
  {
    id: 4,
    title: 'Hidratação',
    description: 'Acompanhe sua ingestão de água diária e ganhe pontos extras.',
    icon: <Droplets size={140} color="#3b82f6" />,
    gradient: 'from-cyan-500/20 to-zinc-900',
    iconBg: 'bg-cyan-500/20',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { completeOnboarding } = useAuthStore();
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    
    // Run animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex, fadeAnim, slideAnim]);

  const handleNext = async () => {
    if (currentIndex < onboardingSlides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await completeOnboarding();
      router.replace('/(tabs)/dashboard');
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    router.replace('/(tabs)/dashboard');
  };

  const currentSlide = onboardingSlides[currentIndex];

  return (
    <View className="flex-1 bg-zinc-950">
      <ScrollView 
        contentContainerClassName="flex-1 justify-center"
        showsVerticalScrollIndicator={false}
      >
        {/* Icon Card */}
        <Animated.View 
          className="items-center mb-8 px-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          }}
        >
          {currentSlide.icon}
        </Animated.View>
        
        {/* Content - Fixed Height */}
        <Animated.View 
          className="px-8 mb-8 h-40 justify-center"
          style={{
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          }}
        >
          <Text className="text-white font-extrabold text-4xl text-center mb-4 leading-tight">
            {currentSlide.title}
          </Text>
          
          <Text className="text-zinc-400 text-center text-lg leading-relaxed">
            {currentSlide.description}
          </Text>
        </Animated.View>

        {/* Progress Indicators */}
        <Animated.View 
          className="flex-row justify-center mb-8 px-8"
          style={{
            opacity: fadeAnim,
          }}
        >
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                index === currentIndex ? 'bg-emerald-500 w-12' : 'bg-zinc-800 w-2'
              }`}
            />
          ))}
        </Animated.View>

        {/* Buttons */}
        <Animated.View 
          className="px-8 mb-6"
          style={{
            opacity: fadeAnim,
          }}
        >
          <Button
            title={currentIndex === onboardingSlides.length - 1 ? 'Começar Agora' : 'Próximo'}
            onPress={handleNext}
          />

          <TouchableOpacity onPress={handleSkip} className="mt-4">
            <Text className="text-zinc-500 text-center font-medium">
              Pular
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
