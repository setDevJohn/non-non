import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { cn } from '@/utils/cn';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}) => {
  const baseStyles = 'rounded-2xl items-center justify-center flex-row';
  
  const variantStyles = {
    primary: 'bg-emerald-500',
    secondary: 'bg-zinc-800',
    outline: 'border-2 border-emerald-500 bg-transparent',
    ghost: 'bg-transparent',
  };
  
  const sizeStyles = {
    sm: 'py-2 px-4',
    md: 'py-3 px-6',
    lg: 'py-4 px-8',
  };
  
  const textVariantStyles = {
    primary: 'text-white font-semibold',
    secondary: 'text-white font-semibold',
    outline: 'text-emerald-500 font-semibold',
    ghost: 'text-emerald-500 font-semibold',
  };
  
  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const disabledStyle = disabled || loading ? 'opacity-50' : '';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={style}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyle
      )}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#10b981' : '#fff'} />
      ) : (
        <>
          {icon && iconPosition === 'left' && <>{icon}</>}
          <Text
            className={cn(
              textVariantStyles[variant],
              textSizeStyles[size],
              icon && 'mx-2'
            )}
            style={textStyle}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && <>{icon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};
