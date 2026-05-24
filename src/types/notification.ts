export type NotificationCategory = 'system' | 'social' | 'event' | 'recovery';

export type NotificationType = 
  | 'workout_reminder'
  | 'hydration_goal'
  | 'surpassed'
  | 'below_average'
  | 'weekend_recovery'
  | 'event_invite'
  | 'achievement_unlocked'
  | 'ranking_change';

export interface Notification {
  id: string;
  userId: string;
  category: NotificationCategory;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}
