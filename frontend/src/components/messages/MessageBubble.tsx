import type { Message } from "@/data/messages";

type MessageBubbleProps = {
  message: Message;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isMe = message.senderId === "me";

  return (
    <div
      className={`flex w-full flex-col ${
        isMe ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`max-w-[80%] sm:max-w-[70%] break-words px-4 py-3 shadow-xs ${
          isMe
            ? "rounded-2xl rounded-tr-xs bg-violet-600 text-white text-sm"
            : "rounded-2xl rounded-tl-xs bg-slate-100 text-slate-800 text-sm"
        }`}
      >
        <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
      </div>

      <span
        className={`mt-1 px-1 text-[11px] ${
          isMe ? "text-slate-400" : "text-slate-400"
        }`}
      >
        {message.timestamp}
      </span>
    </div>
  );
};

export default MessageBubble;
