import api from "./api";
import type { Notification } from "@/data/notifications";

export const notificationApi = {
  async getNotifications(): Promise<{ notifications: Notification[]; unreadCount: number }> {
    const res = await api.get<{
      success: boolean;
      data: Notification[];
      unreadCount: number;
    }>("/notifications");
    return {
      notifications: res.data.data,
      unreadCount: res.data.unreadCount,
    };
  },

  async markAsRead(id: string): Promise<{ success: boolean }> {
    const res = await api.patch<{ success: boolean }>(`/notifications/${id}/read`);
    return res.data;
  },

  async markAsReadByRelatedId(relatedId: string): Promise<{ success: boolean }> {
    const res = await api.patch<{ success: boolean }>(`/notifications/related/${relatedId}/read`);
    return res.data;
  },

  async markAllAsRead(): Promise<{ success: boolean }> {
    const res = await api.patch<{ success: boolean }>("/notifications/read-all");
    return res.data;
  },

  async getPreferences(): Promise<{
    sessionRequests: boolean;
    sessionReminders: boolean;
    messages: boolean;
    reviews: boolean;
    credits: boolean;
    emailNotifications: boolean;
  }> {
    const res = await api.get<{
      success: boolean;
      data: {
        sessionRequests: boolean;
        sessionReminders: boolean;
        messages: boolean;
        reviews: boolean;
        credits: boolean;
        emailNotifications: boolean;
      };
    }>("/notifications/preferences");
    return res.data.data;
  },

  async updatePreferences(preferences: {
    sessionRequests: boolean;
    sessionReminders: boolean;
    messages: boolean;
    reviews: boolean;
    credits: boolean;
    emailNotifications: boolean;
  }): Promise<{ success: boolean; message: string }> {
    const res = await api.put<{ success: boolean; message: string }>("/notifications/preferences", {
      preferences,
    });
    return res.data;
  },
};
