import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'destructive' | 'neutral' | 'primary';
  className?: string;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className,
  style,
}) => {
  const variantStyles = {
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    destructive: 'bg-destructive/20 text-destructive',
    neutral: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary/20 text-primary',
  };

  return (
    <View
      style={style}
      className={cn(
        'px-2 py-1 rounded-full text-xs font-semibold',
        variantStyles[variant],
        className
      )}
    >
      <Text className={cn('text-xs font-semibold', variantStyles[variant].split(' ')[1])}>
        {children}
      </Text>
    </View>
  );
};
