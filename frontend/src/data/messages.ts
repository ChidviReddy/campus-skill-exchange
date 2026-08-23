export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
  isRead: boolean; // Backwards-compatibility alias
}

export interface Conversation {
  id: string;
  participantIds: string[];
  sessionId?: string;
  lastMessageId?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  // Dynamic UI properties resolved per active user
  participantId?: string;
  participantName?: string;
  participantRole?: string;
  participantAvatar?: string;
}

export const initialConversations: Conversation[] = [
  {
    id: "c1",
    participantIds: ["chidvi", "1"],
    sessionId: "1",
    lastMessage: "Sounds good! See you in the React Basics session.",
    lastMessageTime: "10:45 AM",
  },
  {
    id: "c2",
    participantIds: ["chidvi", "2"],
    sessionId: "2",
    lastMessage: "Let's review the binary tree traversal examples.",
    lastMessageTime: "Yesterday, 4:30 PM",
  },
  {
    id: "c3",
    participantIds: ["chidvi", "4"],
    lastMessage: "Shared the Figma design file for practice.",
    lastMessageTime: "Aug 18, 2:05 PM",
  },
  {
    id: "c4",
    participantIds: ["1", "2"],
    sessionId: "5",
    lastMessage: "Looking forward to discussing system architectures with you.",
    lastMessageTime: "Aug 15, 6:10 PM",
  },
  {
    id: "c5",
    participantIds: ["2", "3"],
    lastMessage: "Hi Rahul, sharing the new UI components for the dashboard.",
    lastMessageTime: "Aug 14, 11:00 AM",
  },
];

export const initialMessages: Message[] = [
  // Conversation c1 - Chidvi (chidvi) & Priya Sharma (1)
  {
    id: "m1-1",
    conversationId: "c1",
    senderId: "1",
    receiverId: "chidvi",
    senderName: "Priya Sharma",
    text: "Hi Chidvi! Are you ready for our upcoming React session?",
    timestamp: "10:30 AM",
    read: true,
    isRead: true,
  },
  {
    id: "m1-2",
    conversationId: "c1",
    senderId: "chidvi",
    receiverId: "1",
    senderName: "Chidvi",
    text: "Hey Priya! Yes, I've prepared a few questions about useEffect and custom hooks.",
    timestamp: "10:40 AM",
    read: true,
    isRead: true,
  },
  {
    id: "m1-3",
    conversationId: "c1",
    senderId: "1",
    receiverId: "chidvi",
    senderName: "Priya Sharma",
    text: "Sounds good! See you in the React Basics session.",
    timestamp: "10:45 AM",
    read: false,
    isRead: false,
  },

  // Conversation c2 - Chidvi (chidvi) & Rahul Verma (2)
  {
    id: "m2-1",
    conversationId: "c2",
    senderId: "chidvi",
    receiverId: "2",
    senderName: "Chidvi",
    text: "Hi Rahul, could we cover tree traversals tomorrow?",
    timestamp: "Yesterday, 4:15 PM",
    read: true,
    isRead: true,
  },
  {
    id: "m2-2",
    conversationId: "c2",
    senderId: "2",
    receiverId: "chidvi",
    senderName: "Rahul Verma",
    text: "Let's review the binary tree traversal examples.",
    timestamp: "Yesterday, 4:30 PM",
    read: true,
    isRead: true,
  },

  // Conversation c3 - Chidvi (chidvi) & Arjun Mehta (4)
  {
    id: "m3-1",
    conversationId: "c3",
    senderId: "4",
    receiverId: "chidvi",
    senderName: "Arjun Mehta",
    text: "Hey, here are the wireframes we talked about in our UI review.",
    timestamp: "Aug 18, 2:00 PM",
    read: false,
    isRead: false,
  },
  {
    id: "m3-2",
    conversationId: "c3",
    senderId: "4",
    receiverId: "chidvi",
    senderName: "Arjun Mehta",
    text: "Shared the Figma design file for practice.",
    timestamp: "Aug 18, 2:05 PM",
    read: false,
    isRead: false,
  },

  // Conversation c4 - Priya Sharma (1) & Rahul Verma (2)
  {
    id: "m4-1",
    conversationId: "c4",
    senderId: "2",
    receiverId: "1",
    senderName: "Rahul Verma",
    text: "Hi Priya, do you have time to discuss the frontend integration for the ML model?",
    timestamp: "Aug 15, 6:00 PM",
    read: true,
    isRead: true,
  },
  {
    id: "m4-2",
    conversationId: "c4",
    senderId: "1",
    receiverId: "2",
    senderName: "Priya Sharma",
    text: "Looking forward to discussing system architectures with you.",
    timestamp: "Aug 15, 6:10 PM",
    read: true,
    isRead: true,
  },

  // Conversation c5 - Rahul Verma (2) & Sneha Reddy (3)
  {
    id: "m5-1",
    conversationId: "c5",
    senderId: "3",
    receiverId: "2",
    senderName: "Sneha Reddy",
    text: "Hi Rahul, sharing the new UI components for the dashboard.",
    timestamp: "Aug 14, 11:00 AM",
    read: true,
    isRead: true,
  },
];
