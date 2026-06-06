import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, ViewStyle } from 'react-native';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react-native';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  style?: ViewStyle;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onValueChange,
  placeholder = 'Selecione uma opção',
  error,
  className,
  style,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <View style={style} className={className}>
      {label && (
        <Text className="mb-2 font-semibold text-foreground text-sm">{label}</Text>
      )}
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className={cn(
          'h-12 rounded-xl border border-border bg-background px-4 flex-row items-center justify-between',
          error && 'border-destructive'
        )}
        activeOpacity={0.7}
      >
        <Text
          className={cn(
            'flex-1 text-base',
            selectedOption ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {selectedOption?.label || placeholder}
        </Text>
        <ChevronDown size={20} color="#71717a" />
      </TouchableOpacity>
      {error && (
        <Text className="mt-1 text-destructive text-sm">{error}</Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View className="mt-auto bg-card rounded-t-3xl p-4 border-t border-border">
            <Text className="text-foreground font-semibold text-lg mb-4">
              {label || 'Selecione'}
            </Text>
            <ScrollView className="max-h-80">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => {
                    onValueChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'p-4 rounded-xl mb-2',
                    value === option.value ? 'bg-primary' : 'bg-secondary'
                  )}
                  activeOpacity={0.7}
                >
                  <Text
                    className={cn(
                      'text-base',
                      value === option.value ? 'text-white' : 'text-foreground'
                    )}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              className="mt-4 py-3 rounded-xl bg-secondary"
              activeOpacity={0.7}
            >
              <Text className="text-foreground font-semibold text-center">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
