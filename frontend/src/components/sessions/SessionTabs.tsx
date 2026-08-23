import type { SessionFilter } from "@/data/sessions";
import { useSessions } from "@/hooks/useSessions";
import { isSessionExpired, isInitialRequestExpired } from "@/utils/sessionTime";

type SessionTabsProps = {
  activeFilter: SessionFilter;
  onFilterChange: (filter: SessionFilter) => void;
};

const SessionTabs = ({ activeFilter, onFilterChange }: SessionTabsProps) => {
  const { sessions, currentUser } = useSessions();

  // Dynamic calculations based strictly on currentUser.id
  const userSessions = sessions.filter((s) => {
    if (s.status === "pending") return s.learnerId === currentUser.id;
    return s.learnerId === currentUser.id || s.mentorId === currentUser.id;
  });

  const completedCount = userSessions.filter((s) => s.status === "completed").length;

  const counts: Record<SessionFilter, number> = {
    all: userSessions.length,
    upcoming: userSessions.filter(
      (s) => (s.status === "upcoming" && !isSessionExpired(s)) || s.isStarted
    ).length,
    pending: userSessions.filter(
      (s) => s.status === "pending" && !isInitialRequestExpired(s)
    ).length,
    completed: Math.min(completedCount, 10),
    cancelled: userSessions.filter(
      (s) =>
        s.status === "cancelled" ||
        s.status === "rejected" ||
        isSessionExpired(s) ||
        (s.status === "pending" && isInitialRequestExpired(s))
    ).length,
    rejected: userSessions.filter((s) => s.status === "rejected").length,
  };

  const tabs: { label: string; value: SessionFilter }[] = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <section className="overflow-x-auto">
      <div className="inline-flex rounded-2xl border border-violet-100 bg-white p-2 shadow-sm">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.value;
          const count = counts[tab.value] ?? 0;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onFilterChange(tab.value)}
              className={`cursor-pointer inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-violet-600 font-semibold text-white shadow-sm"
                  : "font-medium text-slate-600 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-violet-100 text-violet-700"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SessionTabs;