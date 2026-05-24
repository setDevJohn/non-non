import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFeedStore } from '@/store';
import { Card } from '@/components/ui';
import { Heart, MessageCircle, Trophy, Droplets, Flame, Award } from 'lucide-react-native';

// Mock feed data since we don't have a feed store yet
const mockFeedPosts = [
  {
    id: '1',
    userId: '1',
    userName: 'João Silva',
    userPhoto: undefined,
    type: 'workout' as const,
    content: {
      workout: {
        type: 'Academia',
        duration: 60,
      },
    },
    likes: 24,
    comments: [],
    likedByUser: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '2',
    userName: 'Maria Santos',
    userPhoto: undefined,
    type: 'hydration' as const,
    content: {
      hydration: {
        amount: 3000,
        goal: 2625,
      },
    },
    likes: 18,
    comments: [],
    likedByUser: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    userId: '3',
    userName: 'Pedro Costa',
    userPhoto: undefined,
    type: 'achievement' as const,
    content: {
      achievement: {
        name: 'Guardião das Marés',
        tier: 'silver',
      },
    },
    likes: 45,
    comments: [],
    likedByUser: false,
    createdAt: new Date().toISOString(),
  },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState(mockFeedPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likedByUser: !post.likedByUser, likes: post.likedByUser ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const renderPostContent = (post: typeof mockFeedPosts[0]) => {
    switch (post.type) {
      case 'workout':
        return (
          <View className="bg-zinc-800 rounded-2xl p-5 mb-4">
            <View className="flex-row items-center mb-3">
              <View className="bg-emerald-500/20 p-2 rounded-xl mr-3">
                <Flame size={20} color="#10b981" />
              </View>
              <Text className="text-white font-semibold">
                Treino: {post.content.workout?.type}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-zinc-400 text-sm">
                {post.content.workout?.duration} minutos
              </Text>
            </View>
          </View>
        );
      case 'hydration':
        return (
          <View className="bg-zinc-800 rounded-2xl p-5 mb-4">
            <View className="flex-row items-center mb-3">
              <View className="bg-blue-500/20 p-2 rounded-xl mr-3">
                <Droplets size={20} color="#3b82f6" />
              </View>
              <Text className="text-white font-semibold">
                Meta de Água Batida!
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-blue-400 font-semibold text-lg">
                {post.content.hydration?.amount}ml
              </Text>
              <Text className="text-zinc-500 text-sm ml-2">
                / {post.content.hydration?.goal}ml
              </Text>
            </View>
          </View>
        );
      case 'achievement':
        return (
          <View className="bg-zinc-800 rounded-2xl p-5 mb-4">
            <View className="flex-row items-center mb-3">
              <View className="bg-yellow-500/20 p-2 rounded-xl mr-3">
                <Award size={20} color="#facc15" />
              </View>
              <Text className="text-white font-semibold">
                Conquista Desbloqueada!
              </Text>
            </View>
            <Text className="text-yellow-400 font-black text-lg mb-1">
              {post.content.achievement?.name}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-zinc-400 text-sm capitalize">
                {post.content.achievement?.tier}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView 
      className="flex-1 bg-zinc-950"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6 pt-12">
        <Text className="text-white font-extrabold text-3xl mb-6">Feed Social</Text>

        {posts.map((post) => (
          <Card key={post.id} className="mb-5 p-5">
            <View className="flex-row items-center mb-5">
              <View className="w-14 h-14 rounded-full bg-zinc-800 items-center justify-center mr-4">
                <Text className="text-white font-black text-xl">
                  {post.userName.charAt(0)}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-lg">{post.userName}</Text>
                <Text className="text-zinc-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            </View>

            {renderPostContent(post)}

            <View className="flex-row items-center justify-between mt-5 pt-5 border-t border-zinc-800">
              <TouchableOpacity
                onPress={() => handleLike(post.id)}
                activeOpacity={0.7}
                className="flex-row items-center"
              >
                <Heart
                  size={22}
                  color={post.likedByUser ? '#ef4444' : '#a1a1aa'}
                  fill={post.likedByUser ? '#ef4444' : 'none'}
                />
                <Text className="text-zinc-400 ml-2 font-medium">{post.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity activeOpacity={0.7} className="flex-row items-center">
                <MessageCircle size={22} color="#a1a1aa" />
                <Text className="text-zinc-400 ml-2 font-medium">{post.comments.length}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}
