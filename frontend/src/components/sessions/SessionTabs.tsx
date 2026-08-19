import type { SessionFilter } from "@/data/sessions";

type SessionTabsProps = {
  activeFilter: SessionFilter;
  onFilterChange: (filter: SessionFilter) => void;
};

const tabs: { label: string; value: SessionFilter }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const SessionTabs = ({ activeFilter, onFilterChange }: SessionTabsProps) => {
  return (
    <section className="overflow-x-auto">
      <div className="inline-flex rounded-2xl border border-violet-100 bg-white p-2 shadow-sm">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onFilterChange(tab.value)}
              className={`cursor-pointer rounded-xl px-6 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-violet-600 font-semibold text-white hover:bg-violet-700"
                  : "font-medium text-slate-600 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SessionTabs;