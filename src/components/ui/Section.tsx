import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { cn } from '@/utils/cn';

interface SectionProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  action,
  children,
  className,
  style,
}) => {
  return (
    <View style={style} className={cn('mb-6 gap-4', className)}>
      {(title || description || action) && (
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            {title && (
              <Text className="text-foreground font-semibold text-lg">
                {title}
              </Text>
            )}
            {description && (
              <Text className="text-muted-foreground text-sm mt-1">
                {description}
              </Text>
            )}
          </View>
          {action && <View className="ml-4">{action}</View>}
        </View>
      )}
      {children}
    </View>
  );
};
