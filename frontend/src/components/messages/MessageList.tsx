import { useEffect, useRef } from "react";
import type { Message } from "@/data/messages";
import MessageBubble from "./MessageBubble";

type MessageListProps = {
  messages: Message[];
};

const MessageList = ({ messages }: MessageListProps) => {
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#faf9fd]">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-center">
          <p className="text-sm text-slate-400">
            No messages yet. Send a message to start chatting!
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
      <div ref={scrollEndRef} />
    </div>
  );
};

export default MessageList;
