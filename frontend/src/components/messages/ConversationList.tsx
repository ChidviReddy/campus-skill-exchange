import { useState, useMemo } from "react";
import { Search, MessageSquare, UserPlus, Users, Sparkles, MessageCircle } from "lucide-react";
import type { Conversation } from "@/data/messages";
import ConversationItem from "./ConversationItem";
import UserAvatar from "@/components/ui/UserAvatar";
import { useSessions } from "@/hooks/useSessions";
import { useChat } from "@/hooks/useChat";

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
  const [activeTab, setActiveTab] = useState<"conversations" | "members">("conversations");

  const { users, currentUser } = useSessions();
  const { getOrCreateConversation } = useChat();

  // 1. Existing conversations matching search query
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase().trim();
    return conversations.filter(
      (c) =>
        (c.participantName || "").toLowerCase().includes(q) ||
        (c.participantRole || "").toLowerCase().includes(q) ||
        (c.lastMessage || "").toLowerCase().includes(q)
    );
  }, [conversations, searchQuery]);

  // 2. Campus members matching search query (excluding oneself)
  const matchingMembers = useMemo(() => {
    const cleanQ = searchQuery.toLowerCase().trim();
    const otherUsers = users.filter((u) => u.id && u.id !== currentUser.id);

    if (!cleanQ) {
      return otherUsers;
    }

    return otherUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(cleanQ) ||
        (u.department || "").toLowerCase().includes(cleanQ) ||
        (u.role || "").toLowerCase().includes(cleanQ) ||
        u.teaches?.some((t) => t.toLowerCase().includes(cleanQ)) ||
        u.learns?.some((l) => l.toLowerCase().includes(cleanQ))
    );
  }, [users, currentUser.id, searchQuery]);

  const totalUnread = conversations.reduce(
    (acc, c) => acc + (c.unreadCount || 0),
    0
  );

  const handleStartChatWithUser = (userId: string) => {
    const conv = getOrCreateConversation(userId);
    if (conv?.id) {
      onSelectConversation(conv.id);
    }
    setActiveTab("conversations");
    setSearchQuery("");
  };

  return (
    <div className="flex h-full flex-col border-r border-violet-100 bg-white">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-[#211653]">Messages</h2>
            {totalUnread > 0 && (
              <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs font-bold text-white shadow-xs">
                {totalUnread}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveTab((prev) => (prev === "members" ? "conversations" : "members"));
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shadow-xs cursor-pointer ${
              activeTab === "members"
                ? "bg-violet-600 text-white"
                : "bg-violet-50 text-violet-700 hover:bg-violet-100"
            }`}
          >
            <UserPlus size={14} />
            <span>{activeTab === "members" ? "View Chats" : "New Chat"}</span>
          </button>
        </div>

        {/* Search input with dynamic prompt */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by name, skill, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Quick Tabs */}
        <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100/80 p-1 text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab("conversations")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 transition cursor-pointer ${
              activeTab === "conversations"
                ? "bg-white text-violet-700 shadow-2xs font-bold"
                : "hover:text-slate-900"
            }`}
          >
            <MessageSquare size={13} />
            <span>Chats ({conversations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("members")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 transition cursor-pointer ${
              activeTab === "members"
                ? "bg-white text-violet-700 shadow-2xs font-bold"
                : "hover:text-slate-900"
            }`}
          >
            <Users size={13} />
            <span>Members ({matchingMembers.length})</span>
          </button>
        </div>
      </div>

      {/* Main List Section */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* ─── TAB 2: CAMPUS MEMBERS LIST ─────────────────────────────── */}
        {activeTab === "members" ? (
          <div className="space-y-2">
            <div className="px-2 py-1 flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Campus Members</span>
              <span>{matchingMembers.length} found</span>
            </div>

            {matchingMembers.length === 0 ? (
              <div className="p-8 text-center">
                <Users size={28} className="mx-auto text-slate-300" />
                <p className="mt-2 text-sm text-slate-600 font-medium">No members found</p>
                <p className="text-xs text-slate-400">Try searching for a different student name or skill.</p>
              </div>
            ) : (
              matchingMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => handleStartChatWithUser(member.id)}
                  className="cursor-pointer flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-2xs transition-all hover:border-violet-200 hover:bg-violet-50/50 hover:shadow-xs group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <UserAvatar
                      avatar={member.avatar}
                      name={member.name}
                      sizeClassName="h-11 w-11 shrink-0"
                      textClassName="text-sm font-bold"
                    />
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-bold text-slate-900 group-hover:text-violet-900">
                        {member.name}
                      </h4>
                      <p className="truncate text-xs text-slate-500">
                        {member.department || "VIT Campus"} {member.year ? `• ${member.year}` : ""}
                      </p>
                      {member.teaches && member.teaches.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {member.teaches.slice(0, 2).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md bg-violet-100/70 px-1.5 py-0.5 text-[10px] font-medium text-violet-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartChatWithUser(member.id);
                    }}
                    className="shrink-0 flex items-center gap-1 rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-violet-700"
                  >
                    <MessageCircle size={14} />
                    <span>Chat</span>
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          /* ─── TAB 1: CONVERSATIONS LIST ─────────────────────────────── */
          <div className="space-y-2">
            {conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  <MessageSquare size={24} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-800">
                  No conversations yet
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-xs">
                  Start chatting with fellow students or mentors on campus.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("members")}
                  className="mt-4 flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-violet-700 cursor-pointer"
                >
                  <UserPlus size={14} />
                  <span>Start a New Chat</span>
                </button>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm font-medium text-slate-600">
                  No ongoing chats matching "{searchQuery}"
                </p>
                {matchingMembers.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-slate-500 mb-2">
                      Found {matchingMembers.length} campus member(s) matching this name:
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab("members")}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-violet-100 text-violet-700 font-bold px-3 py-1.5 text-xs hover:bg-violet-200 transition cursor-pointer"
                    >
                      <Users size={14} />
                      View Matching Members
                    </button>
                  </div>
                )}
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

            {/* Quick helper when user searches: also show matching members below ongoing chats */}
            {searchQuery.trim() && matchingMembers.length > 0 && activeTab === "conversations" && (
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between px-2 pb-2">
                  <span className="text-[11px] font-bold text-violet-900 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles size={12} className="text-violet-600" />
                    Start New Chat with Members ({matchingMembers.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("members")}
                    className="text-[11px] font-bold text-violet-600 hover:text-violet-800"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-1.5">
                  {matchingMembers.slice(0, 3).map((member) => (
                    <div
                      key={member.id}
                      onClick={() => handleStartChatWithUser(member.id)}
                      className="cursor-pointer flex items-center justify-between gap-2.5 rounded-xl border border-violet-100/70 bg-violet-50/30 p-2.5 transition hover:bg-violet-100/60"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <UserAvatar
                          avatar={member.avatar}
                          name={member.name}
                          sizeClassName="h-9 w-9 shrink-0"
                          textClassName="text-xs font-bold"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-slate-800">
                            {member.name}
                          </p>
                          <p className="truncate text-[11px] text-slate-500">
                            {member.department || "Student"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartChatWithUser(member.id);
                        }}
                        className="shrink-0 flex items-center gap-1 rounded-lg bg-violet-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-2xs hover:bg-violet-700"
                      >
                        <MessageSquare size={12} />
                        <span>Chat</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
