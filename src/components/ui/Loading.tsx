import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { cn } from '@/utils/cn';

interface LoadingProps {
  size?: 'small' | 'large';
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  text,
  className,
}) => {
  return (
    <View className={cn('flex-1 items-center justify-center', className)}>
      <ActivityIndicator size={size} color="#10b981" />
      {text && (
        <Text className="text-zinc-400 mt-4 font-medium">{text}</Text>
      )}
    </View>
  );
};
