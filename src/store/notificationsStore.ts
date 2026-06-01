import { create } from 'zustand';
import { notificationsService } from '@/services';

interface NotificationsState {
  notifications: any[];
  unreadCount: number;
  isLoading: boolean;
  fetchNotifications: (page?: number, limit?: number) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async (page = 1, limit = 20) => {
    set({ isLoading: true });
    try {
      const data = await notificationsService.getUserNotifications(page, limit);
      set({ 
        notifications: data.notifications, 
        unreadCount: data.unreadCount,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  markAsRead: async (notificationId: string) => {
    try {
      await notificationsService.markAsRead(notificationId);
      set((state) => ({
        notifications: state.notifications.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      throw error;
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationsService.markAllAsRead();
      set((state) => ({
        notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      throw error;
    }
  },

  deleteNotification: async (notificationId: string) => {
    try {
      await notificationsService.deleteNotification(notificationId);
      set((state) => ({
        notifications: state.notifications.filter((notif) => notif.id !== notificationId),
        unreadCount: state.notifications.find((n) => n.id === notificationId)?.read ? state.unreadCount : Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      throw error;
    }
  },
}));
