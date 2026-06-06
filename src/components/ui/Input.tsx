import React from 'react';
import { TextInput, View, Text, ViewStyle, TextInputProps } from 'react-native';
import { cn } from '@/utils/cn';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  containerStyle?: ViewStyle;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerClassName,
  containerStyle,
  iconLeft,
  iconRight,
  className,
  style,
  ...props
}) => {
  return (
    <View style={containerStyle} className={containerClassName}>
      {label && (
        <Text className="mb-2 font-semibold text-foreground text-sm">{label}</Text>
      )}
      <View className="relative">
        {iconLeft && (
          <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            {iconLeft}
          </View>
        )}
        <TextInput
          className={cn(
            'h-12 rounded-xl border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground',
            iconLeft && 'pl-10',
            iconRight && 'pr-10',
            error && 'border-destructive',
            className
          )}
          style={style}
          placeholderTextColor="#71717a"
          {...props}
        />
        {iconRight && (
          <View className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
            {iconRight}
          </View>
        )}
      </View>
      {error && (
        <Text className="mt-1 text-destructive text-sm">{error}</Text>
      )}
      {helperText && !error && (
        <Text className="mt-1 text-muted-foreground text-sm">{helperText}</Text>
      )}
    </View>
  );
};
