import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/components/ui';
import { Award } from 'lucide-react-native';
import { Achievement } from '@/types/achievement';

interface BadgeCardProps {
  badge: Achievement;
  isUnlocked?: boolean;
  progress?: number;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge, isUnlocked = false, progress = 0 }) => {
  const getTierColor = () => {
    switch (badge.tier) {
      case 'bronze':
        return 'text-amber-700';
      case 'silver':
        return 'text-slate-300';
      case 'gold':
        return 'text-yellow-400';
      default:
        return 'text-zinc-400';
    }
  };

  const getTierBg = () => {
    switch (badge.tier) {
      case 'bronze':
        return 'bg-amber-700/20';
      case 'silver':
        return 'bg-slate-300/20';
      case 'gold':
        return 'bg-yellow-400/20';
      default:
        return 'bg-zinc-800';
    }
  };

  return (
    <Card className={`p-4 ${isUnlocked ? '' : 'opacity-50'}`}>
      <View className="items-center">
        <View className={`w-20 h-20 rounded-full items-center justify-center mb-3 ${getTierBg()}`}>
          <Award size={40} color={isUnlocked ? '#facc15' : '#52525b'} />
        </View>
        <Text className={`font-bold text-lg mb-1 ${getTierColor()}`}>
          {badge.name}
        </Text>
        <Text className="text-zinc-400 text-xs text-center mb-3">
          {badge.description}
        </Text>
        {!isUnlocked && (
          <View className="w-full">
            <View className="w-full bg-zinc-800 rounded-full h-2 mb-1">
              <View
                className="bg-emerald-500 rounded-full h-2"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </View>
            <Text className="text-zinc-500 text-xs text-center">{progress.toFixed(0)}%</Text>
          </View>
        )}
      </View>
    </Card>
  );
};
