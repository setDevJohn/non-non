import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/store';
import { ACHIEVEMENTS } from '@/constants';
import { Card, SafeScreen, Avatar, Section, Badge } from '@/components/ui';
import { Trophy, Calendar, Target, Droplets, Award, LogOut, Flame } from 'lucide-react-native';
import { getAuthToken } from '@/services/api';

export default function ProfileScreen() {
  const { user, logout, clearOnboardingCache } = useAuthStore();
  const [userStats, setUserStats] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.6:3000';
        console.log('API URL:', apiUrl);
        
        const token = await getAuthToken();
        console.log('Token exists:', !!token);
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${apiUrl}/users/me/stats`, {
          headers,
        });
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user stats');
        }
        
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
        // Set default stats when API is unavailable
        setUserStats({
          totalPoints: 0,
          currentStreak: 0,
          totalWorkouts: 0,
        });
      }
    };

    fetchUserStats();
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeScreen>
      <ScrollView 
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-6 pb-4">
          {/* Profile Header */}
          <Card className="mb-8 items-center py-10">
          <Avatar name={user?.name} size="xl" className="mb-5" />
          <Text className="text-foreground font-bold text-3xl mb-1">
            {user?.name}
          </Text>
          <Text className="text-muted-foreground mb-6">{user?.email}</Text>
          
          <View className="flex-row gap-10">
            <View className="items-center">
              <View className="bg-primary/20 p-3 rounded-xl mb-2">
                <Flame size={24} color="#10b981" />
              </View>
              <Text className="text-primary font-bold text-2xl">
                {userStats?.totalPoints || 0}
              </Text>
              <Text className="text-muted-foreground text-sm font-medium">Pontos</Text>
            </View>
            <View className="items-center">
              <View className="bg-secondary p-3 rounded-xl mb-2">
                <Calendar size={24} color="#a1a1aa" />
              </View>
              <Text className="text-foreground font-bold text-2xl">
                {userStats?.currentStreak || 0}
              </Text>
              <Text className="text-muted-foreground text-sm font-medium">Sequência</Text>
            </View>
            <View className="items-center">
              <View className="bg-secondary p-3 rounded-xl mb-2">
                <Award size={24} color="#a1a1aa" />
              </View>
              <Text className="text-foreground font-bold text-2xl">
                {userStats?.totalWorkouts || 0}
              </Text>
              <Text className="text-muted-foreground text-sm font-medium">Total</Text>
            </View>
          </View>
        </Card>

        {/* Stats */}
        <View className="flex-row gap-4 mb-8">
          <Card className="flex-1 items-center py-5">
            <View className="bg-secondary p-3 rounded-xl mb-3">
              <Calendar size={28} color="#a1a1aa" />
            </View>
            <Text className="text-foreground font-bold text-xl">
              {user?.heightCm}cm
            </Text>
            <Text className="text-muted-foreground text-sm font-medium">Altura</Text>
          </Card>
          <Card className="flex-1 items-center py-5">
            <View className="bg-secondary p-3 rounded-xl mb-3">
              <Target size={28} color="#a1a1aa" />
            </View>
            <Text className="text-foreground font-bold text-xl">
              {user?.weightKg}kg
            </Text>
            <Text className="text-muted-foreground text-sm font-medium">Peso</Text>
          </Card>
          <Card className="flex-1 items-center py-5">
            <View className="bg-secondary p-3 rounded-xl mb-3">
              <Droplets size={28} color="#a1a1aa" />
            </View>
            <Text className="text-foreground font-bold text-xl">
              {user?.hydrationGoalMl}ml
            </Text>
            <Text className="text-muted-foreground text-sm font-medium">Meta Diária</Text>
          </Card>
        </View>

        {/* Achievements */}
        <Section 
          title="Conquistas"
          description={`${ACHIEVEMENTS.filter(a => a.unlocked).length} / ${ACHIEVEMENTS.length}`}
        >
          <View className="flex-row flex-wrap gap-4">
            {ACHIEVEMENTS.map((achievement) => (
              <Card
                key={achievement.id}
                variant={achievement.unlocked ? 'default' : 'interactive'}
                className={`flex-1 min-w-[150px] ${
                  !achievement.unlocked ? 'opacity-50' : ''
                }`}
              >
                <View className="items-center py-5">
                  <View className={`p-3 rounded-full mb-3 ${
                    achievement.unlocked
                      ? 'bg-secondary'
                      : 'bg-card'
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
                  <Text className="text-foreground font-semibold text-center mt-2 text-sm">
                    {achievement.name}
                  </Text>
                  <Text className={`text-center text-xs mt-1 capitalize font-medium ${
                    achievement.unlocked
                      ? 'text-muted-foreground'
                      : 'text-muted-foreground'
                  }`}>
                    {achievement.tier}
                  </Text>
                  {!achievement.unlocked && (
                    <View className="mt-3 w-full px-2">
                      <View className="bg-border rounded-full h-2 overflow-hidden">
                        <View
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </View>
                      <Text className="text-muted-foreground text-xs text-center mt-2 font-medium">
                        {achievement.progress}/{achievement.maxProgress}
                      </Text>
                    </View>
                  )}
                </View>
              </Card>
            ))}
          </View>
        </Section>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
          <Card className="bg-destructive/10 mt-4 border-destructive/30 py-5">
            <View className="flex-row items-center justify-center">
              <LogOut size={20} color="#ef4444" />
              <Text className="text-destructive font-semibold text-center ml-2">
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
