const NotificationsHeader = () => {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-medium tracking-tight text-[#211653]">
          Notifications
        </h1>

        <p className="mt-1 text-base text-slate-500">
          Stay updated on your sessions, chats, and credits.
        </p>
      </div>

      <button
        className="cursor-pointer self-start text-base font-medium text-violet-600 transition hover:text-violet-700 sm:self-center"
      >
        Mark all as read
      </button>
    </section>
  );
};

export default NotificationsHeader;