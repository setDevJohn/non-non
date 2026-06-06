export type FeedType = 'workout' | 'hydration' | 'achievement' | 'event';

export interface FeedPost {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  eventId?: string;
  eventName?: string;
  type: FeedType;
  content: FeedContent;
  likes: number;
  comments: Comment[];
  likedByUser?: boolean;
  createdAt: string;
}

export interface FeedContent {
  workout?: {
    type: string;
    duration: number;
    photo?: string;
  };
  hydration?: {
    amount: number;
    goal: number;
  };
  achievement?: {
    name: string;
    tier: string;
  };
  event?: {
    message: string;
  };
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentData {
  content: string;
}
