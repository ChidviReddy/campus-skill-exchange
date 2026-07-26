const chats = [
  {
    id: 1,
    initials: "PS",
    name: "Priya S.",
    message: "Sounds good, see you then!",
  },
  {
    id: 2,
    initials: "AM",
    name: "Arjun M.",
    message: "Shared: figma-wireframe.pdf",
  },
];

const RecentChats = () => {
  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">
        Recent Chats
      </h2>

      <div className="mt-6 space-y-5">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="flex w-full cursor-pointer items-center gap-4 rounded-xl p-2 text-left transition hover:bg-violet-50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
              {chat.initials}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-slate-800">
                {chat.name}
              </h3>

              <p className="truncate text-sm text-slate-500">
                {chat.message}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentChats;