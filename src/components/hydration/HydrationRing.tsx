import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/components/ui';
import { Droplets } from 'lucide-react-native';

interface HydrationRingProps {
  current: number;
  goal: number;
  onAddWater?: (amount: number) => void;
}

export const HydrationRing: React.FC<HydrationRingProps> = ({ current, goal, onAddWater }) => {
  const progress = (current / goal) * 100;
  const remaining = Math.max(0, goal - current);

  const quickAddOptions = [250, 500, 1000];

  return (
    <Card className="p-6 items-center">
      <View className="items-center mb-6">
        <View className="bg-zinc-800 p-4 rounded-full mb-4">
          <Droplets size={48} color="#3b82f6" />
        </View>
        <Text className="text-white font-black text-4xl mb-2">{current}ml</Text>
        <Text className="text-zinc-400 text-base">Meta: {goal}ml</Text>
      </View>

      <View className="w-full bg-zinc-800 rounded-full h-6 mb-2 overflow-hidden">
        <View
          className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-full h-6"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </View>
      <Text className="text-zinc-400 text-sm mb-6">
        {progress.toFixed(0)}% concluído • {remaining}ml restantes
      </Text>

      <View className="flex-row gap-3 w-full">
        {quickAddOptions.map((amount) => (
          <View key={amount} className="flex-1">
            <Text
              className="text-center text-blue-400 font-semibold text-base py-3 bg-zinc-800 rounded-xl"
              onPress={() => onAddWater?.(amount)}
            >
              +{amount}ml
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
};
