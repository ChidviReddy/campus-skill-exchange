export type NotificationType =
  | "session"
  | "message"
  | "review"
  | "credit"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedId?: string;
  relatedRoute?: string;
  group?: "today" | "earlier";
}

export type NotificationFilter =
  | "all"
  | "unread"
  | "session"
  | "message"
  | "review"
  | "credit"
  | "system";

export const initialNotifications: Notification[] = [
  {
    id: "n1",
    type: "session",
    title: "Session confirmed",
    message: "Priya Sharma accepted your React Basics session request.",
    timestamp: "10 minutes ago",
    isRead: false,
    relatedId: "1",
    relatedRoute: "/session-details/1",
    group: "today",
  },
  {
    id: "n2",
    type: "review",
    title: "Review submitted",
    message: "Priya Sharma left you a 5-star review for peer mentoring.",
    timestamp: "1 hour ago",
    isRead: false,
    relatedId: "1",
    relatedRoute: "/review-session/1",
    group: "today",
  },
  {
    id: "n3",
    type: "credit",
    title: "Credits earned",
    message: "You earned +10 credits for completing a mentoring session.",
    timestamp: "2 hours ago",
    isRead: false,
    relatedId: "wallet",
    relatedRoute: "/wallet",
    group: "today",
  },
  {
    id: "n4",
    type: "message",
    title: "New message",
    message: "Arjun Mehta sent you a message about UI/UX design wireframes.",
    timestamp: "3 hours ago",
    isRead: true,
    relatedId: "c3",
    relatedRoute: "/messages/c3",
    group: "today",
  },
  {
    id: "n5",
    type: "session",
    title: "Session updated",
    message: "Rahul Verma suggested a new time for Data Structures in Python.",
    timestamp: "Yesterday, 2:15 PM",
    isRead: true,
    relatedId: "2",
    relatedRoute: "/session-details/2",
    group: "earlier",
  },
  {
    id: "n6",
    type: "system",
    title: "Session reminder",
    message: "Reminder: UI/UX fundamentals session starts in 1 hour.",
    timestamp: "2 days ago",
    isRead: true,
    relatedId: "3",
    relatedRoute: "/session-room/3",
    group: "earlier",
  },
];
