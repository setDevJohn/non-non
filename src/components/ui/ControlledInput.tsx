import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextInputProps, ViewStyle } from 'react-native';
import { Input } from './Input';

interface ControlledInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChange'> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: string;
  containerClassName?: string;
  containerStyle?: ViewStyle;
}

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  label,
  error,
  containerClassName,
  containerStyle,
  ...props
}: ControlledInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          label={label}
          error={error}
          containerClassName={containerClassName}
          containerStyle={containerStyle}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          {...props}
        />
      )}
    />
  );
}
