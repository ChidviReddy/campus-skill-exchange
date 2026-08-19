import { useState } from "react";
import { Search, MessageSquare } from "lucide-react";
import type { Conversation } from "@/data/messages";
import ConversationItem from "./ConversationItem";

type ConversationListProps = {
  conversations: Conversation[];
  activeConversationId: string | undefined;
  onSelectConversation: (id: string) => void;
};

const ConversationList = ({
  conversations,
  activeConversationId,
  onSelectConversation,
}: ConversationListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participantRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce(
    (acc, c) => acc + (c.unreadCount || 0),
    0
  );

  return (
    <div className="flex h-full flex-col border-r border-violet-100 bg-white">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-[#211653]">Messages</h2>
            {totalUnread > 0 && (
              <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs font-bold text-white">
                {totalUnread}
              </span>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <MessageSquare size={24} />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-800">
              No conversations yet
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Start a conversation with a SkillSwap member to begin chatting.
            </p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-500">
              No conversations matching "{searchQuery}"
            </p>
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={conv.id === activeConversationId}
              onSelect={() => onSelectConversation(conv.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
