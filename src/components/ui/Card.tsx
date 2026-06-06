import React from 'react';
import { View, ViewStyle, ScrollView, TouchableOpacity } from 'react-native';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'interactive';
  scrollable?: boolean;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  style,
  variant = 'default',
  scrollable = false,
  onPress,
}) => {
  const baseStyles = 'rounded-xl border border-border bg-card p-4';
  
  const variantStyles = {
    default: '',
    elevated: 'shadow-sm',
    interactive: 'active:opacity-80',
  };
  
  const CardComponent = onPress ? TouchableOpacity : View;
  
  if (scrollable) {
    return (
      <ScrollView
        style={style}
        className={cn(baseStyles, variantStyles[variant], className)}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }
  
  return (
    <CardComponent
      style={style}
      className={cn(baseStyles, variantStyles[variant], className)}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      {children}
    </CardComponent>
  );
};
