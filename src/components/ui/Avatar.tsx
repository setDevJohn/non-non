import React from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import { cn } from '@/utils/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  className,
  style,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  return (
    <View
      style={style}
      className={cn(
        'rounded-full bg-secondary items-center justify-center overflow-hidden',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          className="w-full h-full"
          resizeMode="cover"
          accessibilityLabel={alt}
        />
      ) : (
        <Text className="font-semibold text-secondary-foreground">
          {initials}
        </Text>
      )}
    </View>
  );
};

interface AvatarGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  className,
}) => {
  return (
    <View className={cn('flex -space-x-3', className)}>
      {children}
    </View>
  );
};
