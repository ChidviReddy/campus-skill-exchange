import { CalendarDays, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import { isSessionExpired } from "@/utils/sessionTime";

const UpcomingSessions = () => {
  const navigate = useNavigate();
  const { sessions, currentUser } = useSessions();

  const upcomingList = sessions.filter(
    (s) =>
      (s.learnerId === currentUser.id || s.mentorId === currentUser.id) &&
      ((s.status === "upcoming" && !isSessionExpired(s)) || s.isStarted)
  );

  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-slate-800">
            Upcoming Sessions
          </h2>
          {upcomingList.length > 0 && (
            <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700">
              {upcomingList.length}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate("/my-sessions")}
          className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
        >
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {upcomingList.length === 0 ? (
          <div className="rounded-2xl bg-slate-50/80 p-6 text-center">
            <CalendarDays className="mx-auto text-slate-400" size={24} />
            <p className="mt-2 text-xs font-semibold text-slate-600">
              No upcoming sessions scheduled
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Explore skills and request a mentorship session to get started.
            </p>
          </div>
        ) : (
          upcomingList.slice(0, 3).map((session, index) => {
            const isLearner = session.learnerId === currentUser.id;
            const otherParty = isLearner
              ? `with ${session.mentor}`
              : `with ${session.learnerName || "Learner"}`;

            return (
              <div key={session.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/session-details/${session.id}`)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-xl p-1 text-left transition hover:bg-violet-50/60"
                >
                  <div className="flex items-center gap-4 min-w-0 pr-2">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                      <CalendarDays size={18} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-800 text-sm truncate">
                        {session.topic}
                      </h3>

                      <p className="text-xs text-slate-500 truncate">
                        {otherParty}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-slate-700">
                      {session.date}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      {session.time.split("–")[0].split("-")[0].trim()}
                    </p>
                  </div>
                </button>

                {index !== Math.min(upcomingList.length, 3) - 1 && (
                  <div className="mt-4 border-b border-slate-100" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UpcomingSessions;