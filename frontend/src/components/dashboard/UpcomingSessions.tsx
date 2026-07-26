import { CalendarDays } from "lucide-react";

const sessions = [
  {
    id: 1,
    title: "React Basics",
    mentor: "Priya S.",
    date: "Today",
    time: "5:00 PM",
    bg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    id: 2,
    title: "UI/UX Fundamentals",
    mentor: "Arjun M.",
    date: "Tomorrow",
    time: "11:00 AM",
    bg: "bg-rose-100",
    iconColor: "text-rose-700",
  },
];

const UpcomingSessions = () => {
  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">
        Upcoming Sessions
      </h2>

      <div className="mt-6 space-y-5">
        {sessions.map((session, index) => (
          <div key={session.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${session.bg}`}
                >
                  <CalendarDays
                    size={18}
                    className={session.iconColor}
                  />
                </div>

                <div>
                  <h3 className="font-medium text-slate-800">
                    {session.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    with {session.mentor}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">
                  {session.date}
                </p>

                <p className="text-sm text-slate-500">
                  {session.time}
                </p>
              </div>
            </div>

            {index !== sessions.length - 1 && (
              <div className="mt-5 border-b border-slate-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;