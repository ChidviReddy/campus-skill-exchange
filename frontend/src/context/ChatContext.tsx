import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  initialConversations,
  initialMessages,
} from "@/data/messages";
import type { Conversation, Message } from "@/data/messages";
import { useSessions } from "@/hooks/useSessions";
import { useNotifications } from "@/hooks/useNotifications";

export interface ChatContextType {
  conversations: Conversation[];
  messages: Message[];
  totalUnreadCount: number;
  getConversationById: (id: string | undefined) => Conversation | undefined;
  getConversationByParticipantName: (
    name: string
  ) => Conversation | undefined;
  getOrCreateConversation: (
    targetUserId: string,
    sessionId?: string
  ) => Conversation;
  getOrCreateConversationForMentor: (
    mentorName: string,
    mentorRole?: string,
    mentorAvatar?: string,
    sessionId?: string
  ) => Conversation;
  getMessagesByConversationId: (
    conversationId: string | undefined
  ) => Message[];
  sendMessage: (conversationId: string, text: string) => void;
  markConversationAsRead: (conversationId: string) => void;
  markAllAsRead: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

// Helper for current time formatting
const getCurrentTimeFormatted = (): string => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser, users, getUserById } = useSessions();
  const { addNotification } = useNotifications();

  const [rawConversations, setRawConversations] =
    useState<Conversation[]>(initialConversations);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Derive user-specific conversation list dynamically for currentUser
  const userConversations: Conversation[] = useMemo(() => {
    return rawConversations
      .filter((c) => c.participantIds.includes(currentUser.id))
      .map((c) => {
        const otherParticipantId = c.participantIds.find(
          (id) => id !== currentUser.id
        );
        const otherUser = otherParticipantId
          ? getUserById(otherParticipantId) ||
            users.find((u) => u.id === otherParticipantId)
          : undefined;

        const convMessages = messages.filter((m) => m.conversationId === c.id);
        const lastMsg =
          convMessages.length > 0
            ? convMessages[convMessages.length - 1]
            : undefined;

        const unreadCount = convMessages.filter(
          (m) => m.receiverId === currentUser.id && (!m.read && !m.isRead)
        ).length;

        const participantName =
          otherUser?.name ||
          c.participantName ||
          (otherParticipantId ? `User ${otherParticipantId}` : "SkillSwap Member");

        const participantRole =
          otherUser?.role || c.participantRole || "Member";

        const participantAvatar =
          otherUser?.avatar ||
          participantName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

        return {
          ...c,
          participantId: otherParticipantId || "",
          participantName,
          participantRole,
          participantAvatar,
          lastMessage: lastMsg ? lastMsg.text : c.lastMessage,
          lastMessageTime: lastMsg ? lastMsg.timestamp : c.lastMessageTime,
          unreadCount,
        };
      });
  }, [rawConversations, currentUser.id, getUserById, users, messages]);

  // Total unread messages for currentUser
  const totalUnreadCount = useMemo(() => {
    return messages.filter(
      (m) => m.receiverId === currentUser.id && (!m.read && !m.isRead)
    ).length;
  }, [messages, currentUser.id]);

  const getConversationById = (
    id: string | undefined
  ): Conversation | undefined => {
    if (!id) return undefined;
    return userConversations.find((c) => c.id === id);
  };

  const getConversationByParticipantName = (
    name: string
  ): Conversation | undefined => {
    return userConversations.find(
      (c) =>
        c.participantName &&
        c.participantName.toLowerCase() === name.toLowerCase()
    );
  };

  // Find or create conversation by target user ID
  const getOrCreateConversation = (
    targetUserId: string,
    sessionId?: string
  ): Conversation => {
    // 1. Check if conversation already exists between currentUser and targetUserId
    const existing = rawConversations.find(
      (c) =>
        c.participantIds.includes(currentUser.id) &&
        c.participantIds.includes(targetUserId)
    );

    if (existing) {
      // If sessionId is provided and wasn't previously linked, update it
      if (sessionId && !existing.sessionId) {
        setRawConversations((prev) =>
          prev.map((c) => (c.id === existing.id ? { ...c, sessionId } : c))
        );
      }
      const enriched = userConversations.find((c) => c.id === existing.id);
      if (enriched) return enriched;
    }

    const otherUser =
      getUserById(targetUserId) || users.find((u) => u.id === targetUserId);

    const initials =
      otherUser?.avatar ||
      (otherUser?.name || "User")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const newConv: Conversation = {
      id: `c-${Date.now()}`,
      participantIds: [currentUser.id, targetUserId],
      sessionId,
      lastMessage: "Conversation started",
      lastMessageTime: getCurrentTimeFormatted(),
      unreadCount: 0,
      participantId: targetUserId,
      participantName: otherUser?.name || "SkillSwap User",
      participantRole: otherUser?.role || "Member",
      participantAvatar: initials,
    };

    setRawConversations((prev) => [newConv, ...prev]);
    return newConv;
  };

  // Compatibility helper for mentor names
  const getOrCreateConversationForMentor = (
    mentorName: string,
    _mentorRole?: string,
    _mentorAvatar?: string,
    sessionId?: string
  ): Conversation => {
    // Find target user from users list
    const cleanName = mentorName.toLowerCase().trim();
    const matchedUser = users.find(
      (u) =>
        u.name.toLowerCase().trim() === cleanName ||
        cleanName.includes(u.name.toLowerCase().trim()) ||
        u.name.toLowerCase().trim().includes(cleanName)
    );

    if (matchedUser) {
      return getOrCreateConversation(matchedUser.id, sessionId);
    }

    // Fallback if user ID is not directly matched by name
    const fallbackId = mentorName.toLowerCase().replace(/\s+/g, "-");
    return getOrCreateConversation(fallbackId, sessionId);
  };

  const getMessagesByConversationId = (
    conversationId: string | undefined
  ): Message[] => {
    if (!conversationId) return [];
    // Ensure current user is a participant of the conversation
    const conv = rawConversations.find((c) => c.id === conversationId);
    if (!conv || !conv.participantIds.includes(currentUser.id)) {
      return [];
    }
    return messages.filter((m) => m.conversationId === conversationId);
  };

  const sendMessage = (conversationId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const conv = rawConversations.find((c) => c.id === conversationId);
    if (!conv || !conv.participantIds.includes(currentUser.id)) {
      return;
    }

    // Receiver is the other participant
    const receiverId =
      conv.participantIds.find((id) => id !== currentUser.id) ||
      conv.participantIds[0];

    const timeFormatted = getCurrentTimeFormatted();

    const newMessage: Message = {
      id: `m-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      conversationId,
      senderId: currentUser.id,
      receiverId,
      senderName: currentUser.name,
      text: trimmed,
      timestamp: timeFormatted,
      read: false,
      isRead: false,
    };

    // Update messages state
    setMessages((prev) => [...prev, newMessage]);

    // Update conversation lastMessage & move to top
    setRawConversations((prev) => {
      const target = prev.find((c) => c.id === conversationId);
      if (!target) return prev;

      const updatedConv: Conversation = {
        ...target,
        lastMessage: trimmed,
        lastMessageTime: timeFormatted,
      };

      const others = prev.filter((c) => c.id !== conversationId);
      return [updatedConv, ...others];
    });

    // Create notification for receiverId ONLY
    const previewText =
      trimmed.length > 35 ? `${trimmed.substring(0, 32)}...` : trimmed;

    addNotification({
      userId: receiverId,
      type: "message",
      title: "New message",
      message: `New message from ${currentUser.name}: "${previewText}"`,
      timestamp: "Just now",
      relatedId: conversationId,
      relatedRoute: `/messages/${conversationId}`,
      group: "today",
    });
  };

  const markConversationAsRead = (conversationId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (
          m.conversationId === conversationId &&
          m.receiverId === currentUser.id &&
          (!m.read || !m.isRead)
        ) {
          return {
            ...m,
            read: true,
            isRead: true,
          };
        }
        return m;
      })
    );
  };

  const markAllAsRead = () => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.receiverId === currentUser.id && (!m.read || !m.isRead)) {
          return {
            ...m,
            read: true,
            isRead: true,
          };
        }
        return m;
      })
    );
  };

  return (
    <ChatContext.Provider
      value={{
        conversations: userConversations,
        messages,
        totalUnreadCount,
        getConversationById,
        getConversationByParticipantName,
        getOrCreateConversation,
        getOrCreateConversationForMentor,
        getMessagesByConversationId,
        sendMessage,
        markConversationAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
