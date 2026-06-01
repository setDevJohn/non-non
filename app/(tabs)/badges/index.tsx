import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, SafeScreen, RefreshWrapper } from '@/components/ui';
import { Trophy, Award, Lock, Star } from 'lucide-react-native';
import { useBadgesStore } from '@/store';
import { useAuthStore } from '@/store';

export default function BadgesScreen() {
  const { allBadges, userBadges, isLoading, fetchAllBadges, fetchUserBadges } = useBadgesStore();
  const { user } = useAuthStore();
  const [selectedTier, setSelectedTier] = useState<'all' | 'gold' | 'silver' | 'bronze'>('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllBadges();
    fetchUserBadges();
  }, [fetchAllBadges, fetchUserBadges]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchAllBadges(), fetchUserBadges()]);
    } catch (error) {
      console.error('Error refreshing badges:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const tiers = [
    { key: 'all' as const, label: 'Todas' },
    { key: 'gold' as const, label: 'Ouro' },
    { key: 'silver' as const, label: 'Prata' },
    { key: 'bronze' as const, label: 'Bronze' },
  ];

  const filteredBadges = allBadges.filter((badge: any) => {
    if (selectedTier === 'all') return true;
    return badge.tier === selectedTier;
  });

  const getBadgeProgress = (badgeId: string) => {
    const userBadge = userBadges.find((ub: any) => ub.badgeId === badgeId);
    return userBadge?.progress || 0;
  };

  const isBadgeUnlocked = (badgeId: string) => {
    const userBadge = userBadges.find((ub: any) => ub.badgeId === badgeId);
    return userBadge?.earnedAt !== null;
  };

  const unlockedCount = userBadges.filter((ub: any) => ub.earnedAt !== null).length;
  const totalCount = allBadges.length;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'text-yellow-400';
      case 'silver':
        return 'text-slate-300';
      case 'bronze':
        return 'text-amber-700';
      default:
        return 'text-zinc-400';
    }
  };

  const getTierBgColor = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'bg-yellow-500/20';
      case 'silver':
        return 'bg-slate-500/20';
      case 'bronze':
        return 'bg-amber-700/20';
      default:
        return 'bg-zinc-800';
    }
  };

  const getTierIconColor = (tier: string) => {
    switch (tier) {
      case 'gold':
        return '#fde047';
      case 'silver':
        return '#cbd5e1';
      case 'bronze':
        return '#b45309';
      default:
        return '#3f3f46';
    }
  };

  return (
    <SafeScreen>
      <RefreshWrapper
        onRefresh={onRefresh}
        refreshing={refreshing}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-white font-extrabold text-3xl">Conquistas</Text>
            <View className="bg-emerald-500/20 p-3 rounded-2xl">
              <Award size={24} color="#10b981" />
            </View>
          </View>

        {/* Stats Card */}
        <Card className="mb-8 p-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white font-bold text-lg">Progresso Geral</Text>
            <View className="flex-row items-center">
              <Star size={18} color="#facc15" />
              <Text className="text-yellow-400 font-semibold ml-2">
                {unlockedCount} / {totalCount}
              </Text>
            </View>
          </View>
          <View className="bg-zinc-800 rounded-full h-4 overflow-hidden">
            <View
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full h-4"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </View>
          <Text className="text-zinc-400 text-sm mt-3 text-center">
            {Math.round((unlockedCount / totalCount) * 100)}% desbloqueado
          </Text>
        </Card>

        {/* Tier Filter */}
        <View className="flex-row gap-2 mb-6">
          {tiers.map((tier) => (
            <TouchableOpacity
              key={tier.key}
              onPress={() => setSelectedTier(tier.key)}
              className={`flex-1 py-3 rounded-2xl ${
                selectedTier === tier.key
                  ? 'bg-emerald-500'
                  : 'bg-zinc-800'
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  selectedTier === tier.key ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {tier.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Badges Grid */}
        <View className="flex-row flex-wrap gap-4">
          {filteredBadges.map((badge) => {
            const unlocked = isBadgeUnlocked(badge.id);
            const progress = getBadgeProgress(badge.id);
            const criteria = badge.criteria ? JSON.parse(badge.criteria) : {};
            const maxProgress = criteria.required || 100;

            return (
              <Card
                key={badge.id}
                className={`flex-1 min-w-[150px] ${
                  unlocked
                    ? 'bg-zinc-800'
                    : 'bg-zinc-900 opacity-60'
                }`}
              >
                <View className="items-center py-6">
                  <View className={`p-4 rounded-full mb-4 ${
                    unlocked
                      ? getTierBgColor(badge.tier)
                      : 'bg-zinc-800'
                  }`}>
                    {unlocked ? (
                      <Trophy
                        size={40}
                        color={getTierIconColor(badge.tier)}
                      />
                    ) : (
                      <Lock size={40} color="#3f3f46" />
                    )}
                  </View>
                  <Text className="text-white font-semibold text-center mt-2 text-base mb-1">
                    {badge.name}
                  </Text>
                  <Text className={`text-center text-xs capitalize font-medium mb-3 ${
                    unlocked
                      ? getTierColor(badge.tier)
                      : 'text-zinc-500'
                  }`}>
                    {badge.tier}
                  </Text>
                  {badge.description && (
                    <Text className="text-zinc-400 text-xs text-center px-2 mb-3 leading-relaxed">
                      {badge.description}
                    </Text>
                  )}
                  {!unlocked && (
                    <View className="w-full px-3">
                      <View className="bg-zinc-700 rounded-full h-2 overflow-hidden mb-2">
                        <View
                          className="bg-emerald-500 rounded-full h-2"
                          style={{ width: `${(progress / maxProgress) * 100}%` }}
                        />
                      </View>
                      <Text className="text-zinc-500 text-xs text-center font-medium">
                        {progress}/{maxProgress}
                      </Text>
                    </View>
                  )}
                  {unlocked && (
                    <View className="bg-emerald-500/20 px-3 py-1 rounded-full">
                      <Text className="text-emerald-500 text-xs font-semibold">
                        Desbloqueado
                      </Text>
                    </View>
                  )}
                </View>
              </Card>
            );
          })}
        </View>

        {filteredBadges.length === 0 && (
          <Card className="items-center py-16">
            <Trophy size={72} color="#3f3f46" />
            <Text className="text-zinc-400 font-semibold text-lg mt-4">
              Nenhuma conquista encontrada
            </Text>
            <Text className="text-zinc-500 text-sm mt-2">
              Continue treinando para desbloquear conquistas!
            </Text>
          </Card>
        )}
      </View>
    </RefreshWrapper>
  </SafeScreen>
  );
}
