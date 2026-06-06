import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/components/ui';
import { Trophy } from 'lucide-react-native';

interface RankingItemProps {
  position: number;
  userName: string;
  points: number;
  isCurrentUser?: boolean;
}

export const RankingItem: React.FC<RankingItemProps> = ({ 
  position, 
  userName, 
  points, 
  isCurrentUser = false 
}) => {
  const getMedal = () => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return position;
  };

  const getBorderColor = () => {
    if (position === 1) return 'border-l-yellow-400 bg-yellow-400/5';
    if (position === 2) return 'border-l-slate-300 bg-slate-300/5';
    if (position === 3) return 'border-l-amber-700 bg-amber-700/5';
    return '';
  };

  return (
    <Card
      className={`mb-3 p-4 ${getBorderColor()} ${isCurrentUser ? 'border-emerald-500' : ''}`}
    >
      <View className="flex-row items-center">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
            position <= 3 ? 'bg-zinc-800' : 'bg-zinc-800'
          }`}
        >
          <Text className="font-black text-base">{getMedal()}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white font-semibold text-base">{userName}</Text>
          <Text className="text-zinc-400 text-sm">{points} pontos</Text>
        </View>
        <View className="bg-zinc-800 px-3 py-1 rounded-full">
          <Text className="text-emerald-500 font-bold text-sm">#{position}</Text>
        </View>
      </View>
    </Card>
  );
};
