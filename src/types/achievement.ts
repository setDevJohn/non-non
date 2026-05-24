export type AchievementTier = 'bronze' | 'silver' | 'gold';

export type AchievementCategory = 'water' | 'workout' | 'social' | 'event';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string;
  criteria: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  progress: number;
  unlocked: boolean;
  unlockedAt?: string;
}
