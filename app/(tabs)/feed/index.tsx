import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, SafeScreen, Avatar, EmptyState, Badge } from '@/components/ui';
import { Heart, MessageCircle, Flame, Droplets, Award } from 'lucide-react-native';
import { useFeedStore } from '@/store';
import { RefreshWrapper } from '@/components/ui';

export default function FeedScreen() {
  const { posts, isLoading, fetchGlobalFeed, likePost } = useFeedStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchGlobalFeed();
  }, [fetchGlobalFeed]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchGlobalFeed();
    } catch (error) {
      console.error('Error refreshing feed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await likePost(postId);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const renderPostContent = (post: any) => {
    switch (post.type) {
      case 'workout':
        return (
          <View className="bg-secondary rounded-xl p-5 mb-4">
            <View className="flex-row items-center mb-3">
              <View className="bg-primary/20 p-2 rounded-xl mr-3">
                <Flame size={20} color="#10b981" />
              </View>
              <Text className="text-foreground font-semibold">
                Treino: {post.content}
              </Text>
            </View>
          </View>
        );
      case 'hydration':
        return (
          <View className="bg-secondary rounded-xl p-5 mb-4">
            <View className="flex-row items-center mb-3">
              <View className="bg-info/20 p-2 rounded-xl mr-3">
                <Droplets size={20} color="#3b82f6" />
              </View>
              <Text className="text-foreground font-semibold">
                Meta de Água Batida!
              </Text>
            </View>
            <Text className="text-info font-semibold text-lg">
              {post.content}
            </Text>
          </View>
        );
      case 'achievement':
        return (
          <View className="bg-secondary rounded-xl p-5 mb-4">
            <View className="flex-row items-center mb-3">
              <View className="bg-warning/20 p-2 rounded-xl mr-3">
                <Award size={20} color="#facc15" />
              </View>
              <Text className="text-foreground font-semibold">
                Conquista Desbloqueada!
              </Text>
            </View>
            <Text className="text-warning font-bold text-lg mb-1">
              {post.content}
            </Text>
          </View>
        );
      default:
        return (
          <View className="bg-secondary rounded-xl p-5 mb-4">
            <Text className="text-foreground">{post.content}</Text>
          </View>
        );
    }
  };

  return (
    <SafeScreen>
      <RefreshWrapper
        onRefresh={onRefresh}
        refreshing={refreshing}
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-6 pb-4">
          <Text className="text-foreground font-bold text-3xl mb-6">Feed Social</Text>

        {posts.length === 0 ? (
          <EmptyState
            icon={<Heart size={72} color="#3f3f46" />}
            title="Nenhum post ainda"
            description="Seja o primeiro a compartilhar!"
          />
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="mb-5 p-5">
              <View className="flex-row items-center mb-5">
                <Avatar name={post.user?.name} size="md" className="mr-4" />
                <View className="flex-1">
                  <Text className="text-foreground font-bold text-lg">{post.user?.name || 'Usuário'}</Text>
                  <Text className="text-muted-foreground text-sm">
                    {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              </View>

              {renderPostContent(post)}

              <View className="flex-row items-center justify-between mt-5 pt-5 border-t border-border">
                <TouchableOpacity
                  onPress={() => handleLike(post.id)}
                  activeOpacity={0.7}
                  className="flex-row items-center"
                >
                  <Heart
                    size={22}
                    color={post.likes?.some((l: any) => l.userId === post.userId) ? '#ef4444' : '#a1a1aa'}
                    fill={post.likes?.some((l: any) => l.userId === post.userId) ? '#ef4444' : 'none'}
                  />
                  <Text className="text-muted-foreground ml-2 font-medium">{post._count?.likes || 0}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.7} className="flex-row items-center">
                  <MessageCircle size={22} color="#a1a1aa" />
                  <Text className="text-muted-foreground ml-2 font-medium">{post._count?.comments || 0}</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
      </View>
    </RefreshWrapper>
  </SafeScreen>
  );
}
