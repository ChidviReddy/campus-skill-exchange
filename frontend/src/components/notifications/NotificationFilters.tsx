const NotificationFilters = () => {
  return (
    <section className="flex flex-wrap items-center gap-3">
      {/* All */}
      <button
        className="cursor-pointer rounded-full bg-violet-600 px-7 py-2.5 text-base font-medium text-white transition hover:bg-violet-700"
      >
        All
      </button>

      {/* Unread */}
      <button
        className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-6 py-2.5 text-base font-medium text-[#33227a] transition hover:bg-violet-50"
      >
        Unread

        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-violet-600 px-1.5 text-sm font-semibold text-white">
          3
        </span>
      </button>

      {/* Sessions */}
      <button
        className="cursor-pointer rounded-full border border-violet-200 bg-white px-7 py-2.5 text-base font-medium text-[#33227a] transition hover:bg-violet-50"
      >
        Sessions
      </button>

      {/* Chats */}
      <button
        className="cursor-pointer rounded-full border border-violet-200 bg-white px-7 py-2.5 text-base font-medium text-[#33227a] transition hover:bg-violet-50"
      >
        Chats
      </button>

      {/* Credits */}
      <button
        className="cursor-pointer rounded-full border border-violet-200 bg-white px-7 py-2.5 text-base font-medium text-[#33227a] transition hover:bg-violet-50"
      >
        Credits
      </button>
    </section>
  );
};

export default NotificationFilters;