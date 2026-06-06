import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/store';
import { ACHIEVEMENTS } from '@/constants';
import { Card, SafeScreen } from '@/components/ui';
import { Trophy, Calendar, Target, Droplets, Award, LogOut, Flame, RefreshCw } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout, clearOnboardingCache } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeScreen>
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6 pb-4">
          {/* Profile Header */}
          <Card className="mb-8 items-center py-10">
          <View className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 items-center justify-center mb-5">
            <Text className="text-white font-black text-5xl">
              {user?.name?.charAt(0)}
            </Text>
          </View>
          <Text className="text-white font-extrabold text-3xl mb-1">
            {user?.name}
          </Text>
          <Text className="text-zinc-400 mb-6">{user?.email}</Text>
          
          <View className="flex-row gap-10">
            <View className="items-center">
              <View className="bg-emerald-500/20 p-3 rounded-2xl mb-2">
                <Flame size={24} color="#10b981" />
              </View>
              <Text className="text-emerald-500 font-black text-2xl">
                {user?.totalPoints || 0}
              </Text>
              <Text className="text-zinc-400 text-sm font-medium">Pontos</Text>
            </View>
            <View className="items-center">
              <View className="bg-zinc-800 p-3 rounded-2xl mb-2">
                <Calendar size={24} color="#a1a1aa" />
              </View>
              <Text className="text-white font-black text-2xl">
                {user?.daysTrainedMonth || 0}
              </Text>
              <Text className="text-zinc-400 text-sm font-medium">Dias/Mês</Text>
            </View>
            <View className="items-center">
              <View className="bg-zinc-800 p-3 rounded-2xl mb-2">
                <Award size={24} color="#a1a1aa" />
              </View>
              <Text className="text-white font-black text-2xl">
                {user?.daysTrainedTotal || 0}
              </Text>
              <Text className="text-zinc-400 text-sm font-medium">Total</Text>
            </View>
          </View>
        </Card>

        {/* Stats */}
        <View className="flex-row gap-4 mb-8">
          <Card className="flex-1 items-center py-5">
            <View className="bg-zinc-800 p-3 rounded-2xl mb-3">
              <Calendar size={28} color="#a1a1aa" />
            </View>
            <Text className="text-white font-bold text-xl">
              {user?.heightCm}cm
            </Text>
            <Text className="text-zinc-400 text-sm font-medium">Altura</Text>
          </Card>
          <Card className="flex-1 items-center py-5">
            <View className="bg-zinc-800 p-3 rounded-2xl mb-3">
              <Target size={28} color="#a1a1aa" />
            </View>
            <Text className="text-white font-bold text-xl">
              {user?.weightKg}kg
            </Text>
            <Text className="text-zinc-400 text-sm font-medium">Peso</Text>
          </Card>
          <Card className="flex-1 items-center py-5">
            <View className="bg-zinc-800 p-3 rounded-2xl mb-3">
              <Droplets size={28} color="#a1a1aa" />
            </View>
            <Text className="text-white font-bold text-xl">
              {user?.hydrationGoalsCompleted || 0}
            </Text>
            <Text className="text-zinc-400 text-sm font-medium">Metas</Text>
          </Card>
        </View>

        {/* Achievements */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-white font-extrabold text-2xl">Conquistas</Text>
          <Text className="text-zinc-400 text-sm font-medium">
            {ACHIEVEMENTS.filter(a => a.unlocked).length} / {ACHIEVEMENTS.length}
          </Text>
        </View>
        
        <View className="flex-row flex-wrap gap-4 mb-8">
          {ACHIEVEMENTS.map((achievement) => (
            <Card
              key={achievement.id}
              className={`flex-1 min-w-[150px] ${
                achievement.unlocked
                  ? 'bg-zinc-800'
                  : 'bg-zinc-900 opacity-50'
              }`}
            >
              <View className="items-center py-5">
                <View className={`p-3 rounded-full mb-3 ${
                  achievement.unlocked
                    ? 'bg-zinc-700'
                    : 'bg-zinc-800'
                }`}>
                  <Trophy
                    size={36}
                    color={
                      achievement.unlocked
                        ? achievement.tier === 'gold'
                          ? '#fde047'
                          : achievement.tier === 'silver'
                          ? '#cbd5e1'
                          : '#b45309'
                        : '#3f3f46'
                    }
                  />
                </View>
                <Text className="text-white font-semibold text-center mt-2 text-sm">
                  {achievement.name}
                </Text>
                <Text className={`text-center text-xs mt-1 capitalize font-medium ${
                  achievement.unlocked
                    ? 'text-zinc-400'
                    : 'text-zinc-500'
                }`}>
                  {achievement.tier}
                </Text>
                {!achievement.unlocked && (
                  <View className="mt-3 w-full px-2">
                    <View className="bg-zinc-700 rounded-full h-2 overflow-hidden">
                      <View
                        className="bg-emerald-500 rounded-full h-2"
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      />
                    </View>
                    <Text className="text-zinc-500 text-xs text-center mt-2 font-medium">
                      {achievement.progress}/{achievement.maxProgress}
                    </Text>
                  </View>
                )}
              </View>
            </Card>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
          <Card className="bg-red-500/10 mt-4 border-red-500/30 py-5">
            <View className="flex-row items-center justify-center">
              <LogOut size={20} color="#ef4444" />
              <Text className="text-red-500 font-semibold text-center ml-2">
                Sair da Conta
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeScreen>
  );
}
