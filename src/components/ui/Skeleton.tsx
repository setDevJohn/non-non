import React from 'react';
import { View, ViewStyle } from 'react-native';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  style,
}) => {
  return (
    <View
      style={style}
      className={cn('rounded-xl bg-muted animate-pulse', className)}
    />
  );
};

interface SkeletonTextProps {
  className?: string;
  lines?: number;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  className,
  lines = 3,
}) => {
  return (
    <View className={cn('gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </View>
  );
};

interface SkeletonAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <Skeleton
      className={cn('rounded-full', sizeClasses[size], className)}
    />
  );
};
