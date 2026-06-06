import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, ViewStyle } from 'react-native';
import { X } from 'lucide-react-native';
import { cn } from '@/utils/cn';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export const Sheet: React.FC<SheetProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  style,
}) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={() => onOpenChange(false)}
    >
      <TouchableOpacity
        className="flex-1 bg-black/50"
        activeOpacity={1}
        onPress={() => onOpenChange(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="mt-auto bg-card rounded-t-3xl border-t border-border"
          style={style}
        >
          <View className={cn('p-4', className)}>
            <View className="flex-row items-center justify-between mb-4">
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
              <TouchableOpacity
                onPress={() => onOpenChange(false)}
                className="p-2 rounded-full bg-secondary"
                activeOpacity={0.7}
              >
                <X size={20} color="#a1a1aa" />
              </TouchableOpacity>
            </View>
            <ScrollView className="max-h-[70vh]">
              {children}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

interface SheetFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const SheetFooter: React.FC<SheetFooterProps> = ({ children, className }) => {
  return <View className={cn('flex-row gap-3 mt-4 pt-4 border-t border-border', className)}>{children}</View>;
};

interface SheetHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export const SheetHeader: React.FC<SheetHeaderProps> = ({ title, description, className }) => {
  return (
    <View className={cn('mb-4', className)}>
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
  );
};
