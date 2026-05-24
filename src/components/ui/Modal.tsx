import React, { useEffect } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import { cn } from '@/utils/cn';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
}) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.overlay}
      >
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={styles.container}
        >
          {(title || showCloseButton) && (
            <View className="flex-row items-center justify-between mb-4">
              {title && (
                <Text className="text-white font-extrabold text-xl flex-1">
                  {title}
                </Text>
              )}
              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  className="p-2 rounded-full bg-zinc-800"
                >
                  <X size={24} color="#a1a1aa" />
                </TouchableOpacity>
              )}
            </View>
          )}
          {children}
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#18181b',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
});
