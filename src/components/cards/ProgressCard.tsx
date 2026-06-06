import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/components/ui';

interface ProgressCardProps {
  title: string;
  progress: number;
  current: number;
  goal: number;
  unit?: string;
  color?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ 
  title, 
  progress, 
  current, 
  goal, 
  unit = 'ml',
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-400',
    emerald: 'from-emerald-500 to-emerald-400',
    yellow: 'from-yellow-500 to-yellow-400',
  };

  const textColorClasses = {
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    yellow: 'text-yellow-400',
  };

  return (
    <Card className="mb-6 p-5">
      <View className="flex-row items-center justify-between mb-5">
        <Text className="text-white font-extrabold text-xl">{title}</Text>
      </View>
      
      <View className="bg-zinc-800 rounded-full h-4 mb-3 overflow-hidden">
        <View
          className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full h-4`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-zinc-400 text-sm font-medium">
          Progresso
        </Text>
        <Text className={`${textColorClasses[color as keyof typeof textColorClasses]} text-sm font-semibold`}>
          {current} / {goal}{unit}
        </Text>
      </View>
    </Card>
  );
};
