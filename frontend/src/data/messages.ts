export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const initialConversations: Conversation[] = [
  {
    id: "c1",
    participantId: "priya-sharma",
    participantName: "Priya Sharma",
    participantRole: "React Developer",
    participantAvatar: "PS",
    lastMessage: "Sounds good! See you in the React Basics session.",
    lastMessageTime: "10:45 AM",
    unreadCount: 1,
  },
  {
    id: "c2",
    participantId: "rahul-verma",
    participantName: "Rahul Verma",
    participantRole: "Senior CS Student",
    participantAvatar: "RV",
    lastMessage: "Let's review the binary tree traversal examples.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "c3",
    participantId: "arjun-mehta",
    participantName: "Arjun Mehta",
    participantRole: "Product Designer",
    participantAvatar: "AM",
    lastMessage: "Shared the Figma design file for practice.",
    lastMessageTime: "Aug 18",
    unreadCount: 2,
  },
  {
    id: "c4",
    participantId: "sneha-patel",
    participantName: "Sneha Patel",
    participantRole: "Backend Engineer",
    participantAvatar: "SP",
    lastMessage: "Looking forward to discussing system architectures.",
    lastMessageTime: "Aug 15",
    unreadCount: 0,
  },
];

export const initialMessages: Message[] = [
  // Conversation c1 - Priya Sharma
  {
    id: "m1-1",
    conversationId: "c1",
    senderId: "priya-sharma",
    senderName: "Priya Sharma",
    text: "Hi Chidvi! Are you ready for our upcoming React session?",
    timestamp: "10:30 AM",
    isRead: true,
  },
  {
    id: "m1-2",
    conversationId: "c1",
    senderId: "me",
    senderName: "Chidvi",
    text: "Hey Priya! Yes, I've prepared a few questions about useEffect and custom hooks.",
    timestamp: "10:40 AM",
    isRead: true,
  },
  {
    id: "m1-3",
    conversationId: "c1",
    senderId: "priya-sharma",
    senderName: "Priya Sharma",
    text: "Sounds good! See you in the React Basics session.",
    timestamp: "10:45 AM",
    isRead: false,
  },

  // Conversation c2 - Rahul Verma
  {
    id: "m2-1",
    conversationId: "c2",
    senderId: "me",
    senderName: "Chidvi",
    text: "Hi Rahul, could we cover tree traversals tomorrow?",
    timestamp: "Yesterday, 4:15 PM",
    isRead: true,
  },
  {
    id: "m2-2",
    conversationId: "c2",
    senderId: "rahul-verma",
    senderName: "Rahul Verma",
    text: "Let's review the binary tree traversal examples.",
    timestamp: "Yesterday, 4:30 PM",
    isRead: true,
  },

  // Conversation c3 - Arjun Mehta
  {
    id: "m3-1",
    conversationId: "c3",
    senderId: "arjun-mehta",
    senderName: "Arjun Mehta",
    text: "Hey, here are the wireframes we talked about in our UI review.",
    timestamp: "Aug 18, 2:00 PM",
    isRead: false,
  },
  {
    id: "m3-2",
    conversationId: "c3",
    senderId: "arjun-mehta",
    senderName: "Arjun Mehta",
    text: "Shared the Figma design file for practice.",
    timestamp: "Aug 18, 2:05 PM",
    isRead: false,
  },

  // Conversation c4 - Sneha Patel
  {
    id: "m4-1",
    conversationId: "c4",
    senderId: "sneha-patel",
    senderName: "Sneha Patel",
    text: "Looking forward to discussing system architectures.",
    timestamp: "Aug 15, 6:00 PM",
    isRead: true,
  },
];
