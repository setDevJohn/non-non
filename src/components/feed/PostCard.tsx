import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui';
import { Heart, MessageCircle, Trophy, Droplets } from 'lucide-react-native';
import { FeedPost } from '@/types/feed';

interface PostCardProps {
  post: FeedPost;
  onLike?: () => void;
  onComment?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  const getPostIcon = () => {
    switch (post.type) {
      case 'workout':
        return <Trophy size={20} color="#facc15" />;
      case 'hydration':
        return <Droplets size={20} color="#3b82f6" />;
      case 'achievement':
        return <Trophy size={20} color="#facc15" />;
      case 'event':
        return <Trophy size={20} color="#facc15" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-4 p-5">
      <View className="flex-row items-center mb-4">
        <View className="w-12 h-12 bg-zinc-800 rounded-full items-center justify-center mr-3">
          <Text className="text-white font-bold text-lg">
            {post.userName?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-white font-semibold text-base">{post.userName}</Text>
          <Text className="text-zinc-500 text-xs">
            {new Date(post.createdAt).toLocaleDateString('pt-BR')}
          </Text>
        </View>
        {getPostIcon()}
      </View>

      {post.content?.workout && (
        <Text className="text-zinc-300 text-base leading-relaxed mb-4">
          Treino: {post.content.workout.type} - {post.content.workout.duration}min
        </Text>
      )}

      {post.content?.hydration && (
        <Text className="text-zinc-300 text-base leading-relaxed mb-4">
          Hidratação: {post.content.hydration.amount}ml / {post.content.hydration.goal}ml
        </Text>
      )}

      {post.content?.achievement && (
        <Text className="text-zinc-300 text-base leading-relaxed mb-4">
          Conquista: {post.content.achievement.name} ({post.content.achievement.tier})
        </Text>
      )}

      {post.content?.event && (
        <Text className="text-zinc-300 text-base leading-relaxed mb-4">
          {post.content.event.message}
        </Text>
      )}

      <View className="flex-row gap-6 pt-4 border-t border-zinc-800">
        <TouchableOpacity onPress={onLike} className="flex-row items-center">
          <Heart size={20} color={post.likedByUser ? "#ef4444" : "#a1a1aa"} fill={post.likedByUser ? "#ef4444" : "none"} />
          <Text className="text-zinc-400 text-sm ml-2">{post.likes || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComment} className="flex-row items-center">
          <MessageCircle size={20} color="#a1a1aa" />
          <Text className="text-zinc-400 text-sm ml-2">{post.comments?.length || 0}</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};
