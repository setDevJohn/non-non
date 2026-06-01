import { create } from 'zustand';
import { feedService } from '@/services';

interface FeedState {
  posts: any[];
  isLoading: boolean;
  fetchGlobalFeed: (page?: number, limit?: number) => Promise<void>;
  fetchEventFeed: (eventId: string, page?: number, limit?: number) => Promise<void>;
  fetchUserFeed: (userId: string, page?: number, limit?: number) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  commentOnPost: (postId: string, content: string) => Promise<void>;
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: [],
  isLoading: false,

  fetchGlobalFeed: async (page = 1, limit = 20) => {
    set({ isLoading: true });
    try {
      const data = await feedService.getGlobalFeed(page, limit);
      set({ posts: data.posts, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchEventFeed: async (eventId: string, page = 1, limit = 20) => {
    set({ isLoading: true });
    try {
      const data = await feedService.getEventFeed(eventId, page, limit);
      set({ posts: data.posts, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchUserFeed: async (userId: string, page = 1, limit = 20) => {
    set({ isLoading: true });
    try {
      const data = await feedService.getUserFeed(userId, page, limit);
      set({ posts: data.posts, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  likePost: async (postId: string) => {
    try {
      await feedService.likePost(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, likedByUser: !post.likedByUser, likes: post.likedByUser ? post.likes - 1 : post.likes + 1 }
            : post
        ),
      }));
    } catch (error) {
      throw error;
    }
  },

  commentOnPost: async (postId: string, content: string) => {
    try {
      await feedService.commentOnPost(postId, content);
    } catch (error) {
      throw error;
    }
  },
}));
