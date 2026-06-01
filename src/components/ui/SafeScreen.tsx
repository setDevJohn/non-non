import React from 'react';
import { View, ViewProps, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeScreenProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export function SafeScreen({ children, className = '', edges = ['top'], ...props }: SafeScreenProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className={`flex-1 bg-zinc-950 ${className}`}
      style={{
        paddingTop: edges.includes('top') ? insets.top : 0,
        paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
        paddingLeft: edges.includes('left') ? insets.left : 0,
        paddingRight: edges.includes('right') ? insets.right : 0,
      }}
      {...props}
    >
      {children}
    </View>
  );
}
