import React from 'react';
import { ScrollView, RefreshControl, ScrollViewProps, ViewStyle } from 'react-native';

interface RefreshWrapperProps extends ScrollViewProps {
  onRefresh: () => Promise<void> | void;
  refreshing: boolean;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

export function RefreshWrapper({
  onRefresh,
  refreshing,
  children,
  contentContainerStyle,
  ...props
}: RefreshWrapperProps) {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#10b981"
          colors={['#10b981']}
        />
      }
      contentContainerStyle={contentContainerStyle}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
