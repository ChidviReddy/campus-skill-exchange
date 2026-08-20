import { createContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { initialNotifications } from "@/data/notifications";
import type {
  Notification,
  NotificationFilter,
} from "@/data/notifications";

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  activeFilter: NotificationFilter;
  setActiveFilter: (filter: NotificationFilter) => void;
  filteredNotifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (
    notification: Omit<Notification, "id" | "isRead"> & { id?: string; isRead?: boolean }
  ) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] =
    useState<NotificationFilter>("all");

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  };

  const addNotification = (
    notif: Omit<Notification, "id" | "isRead"> & { id?: string; isRead?: boolean }
  ) => {
    const newNotif: Notification = {
      id: notif.id || `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: notif.type,
      title: notif.title,
      message: notif.message,
      timestamp: notif.timestamp || "Just now",
      isRead: notif.isRead ?? false,
      relatedId: notif.relatedId,
      relatedRoute: notif.relatedRoute,
      group: notif.group || "today",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") return notifications;
    if (activeFilter === "unread")
      return notifications.filter((n) => !n.isRead);
    if (activeFilter === "session")
      return notifications.filter((n) => n.type === "session");
    if (activeFilter === "message")
      return notifications.filter((n) => n.type === "message");
    if (activeFilter === "review")
      return notifications.filter((n) => n.type === "review");
    if (activeFilter === "credit")
      return notifications.filter((n) => n.type === "credit");
    if (activeFilter === "system")
      return notifications.filter((n) => n.type === "system");
    return notifications;
  }, [notifications, activeFilter]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        activeFilter,
        setActiveFilter,
        filteredNotifications,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
