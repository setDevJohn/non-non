import React from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  scrollable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  style,
  scrollable = false,
}) => {
  const baseStyles = 'rounded-3xl bg-zinc-900 border border-zinc-800 p-4';
  
  if (scrollable) {
    return (
      <ScrollView
        style={style}
        className={cn(baseStyles, className)}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }
  
  return (
    <View style={style} className={cn(baseStyles, className)}>
      {children}
    </View>
  );
};
