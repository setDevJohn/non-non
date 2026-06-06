import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/components/ui';
import { Comment } from '@/types/feed';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <View className="bg-zinc-800 rounded-2xl p-4 mb-3">
      <View className="flex-row items-center mb-2">
        <View className="w-8 h-8 bg-zinc-700 rounded-full items-center justify-center mr-2">
          <Text className="text-white font-bold text-sm">
            {comment.userName?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text className="text-white font-semibold text-sm">{comment.userName}</Text>
      </View>
      <Text className="text-zinc-300 text-sm leading-relaxed">{comment.text}</Text>
    </View>
  );
};
