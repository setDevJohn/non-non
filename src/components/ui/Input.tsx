import React from 'react';
import { TextInput, View, Text, ViewStyle, TextInputProps } from 'react-native';
import { cn } from '@/utils/cn';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerClassName,
  containerStyle,
  className,
  style,
  ...props
}) => {
  return (
    <View style={containerStyle} className={containerClassName}>
      {label && (
        <Text className="mb-2 font-medium text-zinc-400 text-sm">{label}</Text>
      )}
      <TextInput
        className={cn(
          'bg-zinc-800 mb-2 px-4 py-3 border border-zinc-700 rounded-2xl text-white placeholder:text-zinc-500',
          error && 'border-red-500',
          className
        )}
        style={style}
        placeholderTextColor="#71717a"
        {...props}
      />
      {error && (
        <Text className="mt-1 text-red-500 text-sm">{error}</Text>
      )}
    </View>
  );
};
