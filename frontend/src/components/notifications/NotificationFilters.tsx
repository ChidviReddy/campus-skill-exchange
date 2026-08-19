import { useNotifications } from "@/hooks/useNotifications";
import type { NotificationFilter } from "@/data/notifications";

const filters: { id: NotificationFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "session", label: "Sessions" },
  { id: "message", label: "Chats" },
  { id: "review", label: "Reviews" },
  { id: "credit", label: "Credits" },
];

const NotificationFilters = () => {
  const { activeFilter, setActiveFilter, unreadCount } = useNotifications();

  return (
    <section className="flex flex-wrap items-center gap-3">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`cursor-pointer inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-violet-600 text-white shadow-xs"
                : "border border-violet-200 bg-white text-[#33227a] hover:bg-violet-50"
            }`}
          >
            {filter.label}

            {filter.id === "unread" && unreadCount > 0 && (
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                  isActive
                    ? "bg-white text-violet-700"
                    : "bg-violet-600 text-white"
                }`}
              >
                {unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </section>
  );
};

export default NotificationFilters;