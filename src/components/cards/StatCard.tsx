import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/components/ui';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color }) => {
  return (
    <View className="items-center flex-1">
      <View className="bg-zinc-800 p-3 rounded-2xl mb-3">
        {icon}
      </View>
      <Text className="text-white font-black text-2xl">
        {value}
      </Text>
      <Text className="text-zinc-400 text-sm font-medium">{label}</Text>
    </View>
  );
};
