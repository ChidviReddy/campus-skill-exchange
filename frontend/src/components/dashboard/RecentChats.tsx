import { useNavigate } from "react-router-dom";
import { useChat } from "@/hooks/useChat";

const RecentChats = () => {
  const navigate = useNavigate();
  const { conversations } = useChat();

  const recentList = conversations.slice(0, 2);

  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Recent Chats
        </h2>
        <button
          type="button"
          onClick={() => navigate("/messages")}
          className="cursor-pointer text-xs font-semibold text-violet-600 hover:text-violet-700"
        >
          View all
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {recentList.map((chat) => (
          <button
            key={chat.id}
            type="button"
            onClick={() => navigate(`/messages/${chat.id}`)}
            className="flex w-full cursor-pointer items-center gap-4 rounded-xl p-2 text-left transition hover:bg-violet-50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
              {chat.participantAvatar ||
                chat.participantName.slice(0, 2).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-slate-800">
                {chat.participantName}
              </h3>

              <p className="truncate text-sm text-slate-500">
                {chat.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentChats;