import React from 'react';
import { View } from 'react-native';
import { ControlledInput } from '@/components/ui';

interface RegisterFormProps {
  control: any;
  errors: any;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ control, errors }) => {
  return (
    <View className="gap-4">
      <ControlledInput
        name="name"
        control={control}
        label="Nome Completo"
        placeholder="Seu nome"
        error={errors.name?.message}
      />

      <ControlledInput
        name="email"
        control={control}
        label="Email"
        placeholder="seu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email?.message}
      />

      <ControlledInput
        name="password"
        control={control}
        label="Senha"
        placeholder="********"
        secureTextEntry
        error={errors.password?.message}
      />

      <ControlledInput
        name="heightCm"
        control={control}
        label="Altura (cm)"
        placeholder="Ex: 175"
        keyboardType="numeric"
        error={errors.heightCm?.message}
      />

      <ControlledInput
        name="weightKg"
        control={control}
        label="Peso (kg)"
        placeholder="Ex: 70"
        keyboardType="numeric"
        error={errors.weightKg?.message}
      />

      <ControlledInput
        name="birthDate"
        control={control}
        label="Data de Nascimento"
        placeholder="DD/MM/YYYY"
        error={errors.birthDate?.message}
      />
    </View>
  );
};
