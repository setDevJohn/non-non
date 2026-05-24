import api from './api';
import { FeedPost, CreateCommentData } from '@/types';

export const feedService = {
  getFeed: async (eventId?: string): Promise<FeedPost[]> => {
    const url = eventId ? `/feed?eventId=${eventId}` : '/feed';
    const response = await api.get(url);
    return response.data;
  },

  likePost: async (postId: string): Promise<void> => {
    await api.post(`/feed/${postId}/like`);
  },

  unlikePost: async (postId: string): Promise<void> => {
    await api.delete(`/feed/${postId}/like`);
  },

  addComment: async (data: CreateCommentData): Promise<void> => {
    await api.post(`/feed/${data.postId}/comments`, { text: data.text });
  },
};
