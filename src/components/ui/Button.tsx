import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, ViewStyle, TextStyle } from 'react-native';
import { cn } from '@/utils/cn';
import colors from '@/theme/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}) => {
  const baseStyles = 'rounded-xl items-center justify-center flex-row';
  
  const variantStyles = {
    default: 'bg-primary',
    secondary: 'bg-secondary',
    outline: 'border-2 border-primary bg-transparent',
    ghost: 'bg-transparent',
    destructive: 'bg-destructive',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-3',
    md: 'h-12 px-4',
    lg: 'h-14 px-6',
    icon: 'h-10 w-10',
  };
  
  const textVariantStyles = {
    default: 'text-white font-semibold',
    secondary: 'text-white font-semibold',
    outline: 'text-primary font-semibold',
    ghost: 'text-primary font-semibold',
    destructive: 'text-white font-semibold',
  };
  
  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    icon: '',
  };
  
  const disabledStyle = disabled || loading ? 'opacity-50' : '';
  const fullWidthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={style}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyle,
        fullWidthStyle
      )}
      activeOpacity={0.7}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'ghost' ? colors.primary.DEFAULT : '#fff'} 
          size={size === 'sm' ? 'small' : size === 'lg' ? 'large' : undefined}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View className="mr-2">
              {icon}
            </View>
          )}
          <Text
            className={cn(
              textVariantStyles[variant],
              textSizeStyles[size],
              icon && iconPosition === 'right' && 'mr-2',
              icon && iconPosition === 'left' && 'ml-2'
            )}
            style={textStyle}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <View className="ml-2">
              {icon}
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
