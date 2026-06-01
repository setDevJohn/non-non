import api from './api';
import { FeedPost, CreateCommentData } from '@/types';
import { showToast } from '@/utils/toast';

export const feedService = {
  getGlobalFeed: async (page = 1, limit = 20): Promise<any> => {
    const response = await api.get(`/feed/global?page=${page}&limit=${limit}`);
    return response.data;
  },

  getEventFeed: async (eventId: string, page = 1, limit = 20): Promise<any> => {
    const response = await api.get(`/feed/event/${eventId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  getUserFeed: async (userId: string, page = 1, limit = 20): Promise<any> => {
    const response = await api.get(`/feed/user/${userId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  likePost: async (postId: string): Promise<any> => {
    const response = await api.post(`/feed/${postId}/like`);
    return response.data;
  },

  commentOnPost: async (postId: string, content: string): Promise<any> => {
    const response = await api.post(`/feed/${postId}/comment`, { content });
    showToast.success('Comentário adicionado!');
    return response.data;
  },

  getPostComments: async (postId: string, page = 1, limit = 20): Promise<any> => {
    const response = await api.get(`/feed/${postId}/comments?page=${page}&limit=${limit}`);
    return response.data;
  },
};
