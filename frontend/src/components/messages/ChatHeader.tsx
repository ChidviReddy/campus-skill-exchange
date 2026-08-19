import { ArrowLeft } from "lucide-react";
import type { Conversation } from "@/data/messages";

type ChatHeaderProps = {
  conversation: Conversation;
  onBack?: () => void;
};

const ChatHeader = ({ conversation, onBack }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-violet-100 bg-white px-6 py-4">
      <div className="flex items-center gap-3.5">
        {/* Mobile back button */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer -ml-2 mr-1 rounded-xl p-2 text-slate-500 hover:bg-violet-50 hover:text-violet-700 md:hidden"
            aria-label="Back to conversations"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        {/* Avatar */}
        <div className="relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-bold text-white shadow-xs">
            {conversation.participantAvatar ||
              conversation.participantName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
          </div>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
        </div>

        {/* Name & Role */}
        <div>
          <h3 className="font-semibold text-slate-900 leading-tight">
            {conversation.participantName}
          </h3>
          <p className="text-xs text-slate-500">
            {conversation.participantRole} · <span className="text-green-600 font-medium">Online</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
