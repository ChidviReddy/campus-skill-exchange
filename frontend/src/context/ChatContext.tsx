import { createContext, useState } from "react";
import type { ReactNode } from "react";
import {
  initialConversations,
  initialMessages,
} from "@/data/messages";
import type { Conversation, Message } from "@/data/messages";

export interface ChatContextType {
  conversations: Conversation[];
  messages: Message[];
  getConversationById: (id: string | undefined) => Conversation | undefined;
  getConversationByParticipantName: (
    name: string
  ) => Conversation | undefined;
  getOrCreateConversationForMentor: (
    mentorName: string,
    mentorRole?: string,
    mentorAvatar?: string
  ) => Conversation;
  getMessagesByConversationId: (
    conversationId: string | undefined
  ) => Message[];
  sendMessage: (conversationId: string, text: string) => void;
  markConversationAsRead: (conversationId: string) => void;
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
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const getConversationById = (
    id: string | undefined
  ): Conversation | undefined => {
    if (!id) return undefined;
    return conversations.find((c) => c.id === id);
  };

  const getConversationByParticipantName = (
    name: string
  ): Conversation | undefined => {
    return conversations.find(
      (c) => c.participantName.toLowerCase() === name.toLowerCase()
    );
  };

  const getOrCreateConversationForMentor = (
    mentorName: string,
    mentorRole?: string,
    mentorAvatar?: string
  ): Conversation => {
    const existing = getConversationByParticipantName(mentorName);
    if (existing) {
      return existing;
    }

    const initials =
      mentorAvatar ||
      mentorName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const newConv: Conversation = {
      id: `c-${Date.now()}`,
      participantId: mentorName.toLowerCase().replace(/\s+/g, "-"),
      participantName: mentorName,
      participantRole: mentorRole || "Mentor",
      participantAvatar: initials,
      lastMessage: "Conversation started",
      lastMessageTime: getCurrentTimeFormatted(),
      unreadCount: 0,
    };

    setConversations((prev) => [newConv, ...prev]);
    return newConv;
  };

  const getMessagesByConversationId = (
    conversationId: string | undefined
  ): Message[] => {
    if (!conversationId) return [];
    return messages.filter((m) => m.conversationId === conversationId);
  };

  const sendMessage = (conversationId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const timeFormatted = getCurrentTimeFormatted();

    const newMessage: Message = {
      id: `m-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      conversationId,
      senderId: "me",
      senderName: "Chidvi",
      text: trimmed,
      timestamp: timeFormatted,
      isRead: true,
    };

    // Update messages
    setMessages((prev) => [...prev, newMessage]);

    // Update conversation lastMessage & move to top of list
    setConversations((prev) => {
      const conv = prev.find((c) => c.id === conversationId);
      if (!conv) return prev;

      const updatedConv: Conversation = {
        ...conv,
        lastMessage: trimmed,
        lastMessageTime: timeFormatted,
      };

      const others = prev.filter((c) => c.id !== conversationId);
      return [updatedConv, ...others];
    });
  };

  const markConversationAsRead = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId && c.unreadCount > 0) {
          return {
            ...c,
            unreadCount: 0,
          };
        }
        return c;
      })
    );

    setMessages((prev) =>
      prev.map((m) => {
        if (m.conversationId === conversationId && !m.isRead) {
          return {
            ...m,
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
        conversations,
        messages,
        getConversationById,
        getConversationByParticipantName,
        getOrCreateConversationForMentor,
        getMessagesByConversationId,
        sendMessage,
        markConversationAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
