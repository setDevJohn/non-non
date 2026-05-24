import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <View className={cn('flex-1 items-center justify-center p-8', className)}>
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-white font-extrabold text-xl text-center mb-2">
        {title}
      </Text>
      {description && (
        <Text className="text-zinc-400 text-center mb-6">
          {description}
        </Text>
      )}
      {action}
    </View>
  );
};
