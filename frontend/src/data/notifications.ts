export type NotificationType =
  | "session"
  | "message"
  | "review"
  | "credit"
  | "system";

export interface Notification {
  id: string;
  userId: string; // Recipient user ID (e.g. "chidvi", "1", "2")
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
  // --- CHIDVI's Notifications (Learner) ---
  {
    id: "n1",
    userId: "chidvi",
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
    userId: "chidvi",
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
    userId: "chidvi",
    type: "credit",
    title: "Credits spent",
    message: "You spent 5 credits for learning React Basics.",
    timestamp: "2 hours ago",
    isRead: false,
    relatedId: "wallet",
    relatedRoute: "/wallet",
    group: "today",
  },
  {
    id: "n4",
    userId: "chidvi",
    type: "message",
    title: "New message",
    message: "Arjun Mehta sent you a message about UI/UX design wireframes.",
    timestamp: "3 hours ago",
    isRead: true,
    relatedId: "c3",
    relatedRoute: "/messages/c3",
    group: "today",
  },

  // --- PRIYA's Notifications (Mentor) ---
  {
    id: "n5",
    userId: "1",
    type: "session",
    title: "New session request",
    message: "Chidvi requested a React Basics mentorship session with you.",
    timestamp: "15 minutes ago",
    isRead: false,
    relatedId: "1",
    relatedRoute: "/mentor-requests",
    group: "today",
  },
  {
    id: "n6",
    userId: "1",
    type: "credit",
    title: "Credits earned",
    message: "You earned +10 credits for completing a mentoring session.",
    timestamp: "2 hours ago",
    isRead: true,
    relatedId: "wallet",
    relatedRoute: "/wallet",
    group: "today",
  },

  // --- RAHUL's Notifications ---
  {
    id: "n7",
    userId: "2",
    type: "system",
    title: "Session reminder",
    message: "Reminder: Machine Learning Basics session scheduled for tomorrow.",
    timestamp: "Yesterday, 2:15 PM",
    isRead: true,
    relatedId: "2",
    relatedRoute: "/my-sessions",
    group: "earlier",
  },
];
