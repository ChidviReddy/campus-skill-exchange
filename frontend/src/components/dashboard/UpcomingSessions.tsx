import { CalendarDays, Clock, ArrowRight, Video, Sparkles, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import { isSessionExpired, getSessionStartDateTime, isSessionBeforeStart, formatStartTimeOnly } from "@/utils/sessionTime";

const UpcomingSessions = () => {
  const navigate = useNavigate();
  const { sessions, currentUser, getPendingRescheduleForSession } = useSessions();

  // Find all valid upcoming unexpired sessions where current user is learner or mentor
  const upcomingList = sessions
    .filter(
      (s) =>
        (s.learnerId === currentUser.id || s.mentorId === currentUser.id) &&
        ((s.status === "upcoming" &&
          (!isSessionExpired(s) || Boolean(getPendingRescheduleForSession(s.id)))) ||
          s.isStarted)
    )
    .sort((a, b) => {
      // In-progress sessions first
      if (a.isStarted && !b.isStarted) return -1;
      if (!a.isStarted && b.isStarted) return 1;
      const timeA = getSessionStartDateTime(a.date, a.time)?.getTime() || 0;
      const timeB = getSessionStartDateTime(b.date, b.time)?.getTime() || 0;
      return timeA - timeB;
    });

  const nearestSession = upcomingList[0];
  const subsequentSessions = upcomingList.slice(1, 3);

  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-slate-800">
            Upcoming Sessions
          </h2>
          {upcomingList.length > 0 && (
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-bold text-violet-700">
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

      <div className="mt-5">
        {!nearestSession ? (
          <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/40 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <CalendarDays size={24} />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-800">
              No upcoming sessions
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              You have no peer learning or teaching sessions scheduled right now. Explore skills to book your next session.
            </p>
            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="mt-4 cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-violet-700 hover:shadow-md"
            >
              <Sparkles size={14} />
              Explore Skills
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Spotlight Card: Nearest Upcoming Session */}
            <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/80 via-white to-fuchsia-50/30 p-4 sm:p-5 shadow-xs transition hover:border-violet-300">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-violet-100/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-bold text-violet-700">
                    {nearestSession.isStarted ? "In Progress" : "Nearest Session"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    {nearestSession.learnerId === currentUser.id ? "Learning" : "Teaching"}
                  </span>
                </div>

                <span className="text-xs font-semibold text-violet-700">
                  {nearestSession.credits} Credits
                </span>
              </div>

              <div className="mt-3">
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                  {nearestSession.topic}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <UserIcon size={14} className="text-violet-500" />
                    {nearestSession.learnerId === currentUser.id
                      ? `with ${nearestSession.mentor}`
                      : `with ${nearestSession.learnerName || "Learner"}`}
                  </span>

                  <span className="flex items-center gap-1.5 text-slate-500">
                    <CalendarDays size={14} className="text-slate-400" />
                    {nearestSession.date}
                  </span>

                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Clock size={14} className="text-slate-400" />
                    {nearestSession.time} ({nearestSession.duration})
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-violet-100/60">
                <button
                  type="button"
                  onClick={() => navigate(`/session-details/${nearestSession.id}`)}
                  className="cursor-pointer flex-1 rounded-xl border border-violet-200 bg-white px-3 py-2 text-center text-xs font-semibold text-violet-700 shadow-2xs transition hover:bg-violet-50 hover:border-violet-300"
                >
                  View Details
                </button>

                {nearestSession.isStarted || nearestSession.status === "in_progress" ? (
                  <button
                    type="button"
                    onClick={() => navigate(`/session-room/${nearestSession.id}`)}
                    className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-2xs transition hover:bg-emerald-700 hover:shadow-sm"
                  >
                    <Video size={14} className="animate-pulse" />
                    Enter Live Session
                  </button>
                ) : currentUser.id === nearestSession.mentorId ? (
                  isSessionBeforeStart(nearestSession.date, nearestSession.time) ? (
                    <button
                      type="button"
                      disabled
                      className="cursor-not-allowed inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-500 opacity-80"
                      title={`Start Session will be available at ${formatStartTimeOnly(nearestSession.time)}`}
                    >
                      <Video size={14} />
                      Starts at {formatStartTimeOnly(nearestSession.time)}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(`/session-room/${nearestSession.id}`)}
                      className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-2xs transition hover:bg-emerald-700 hover:shadow-sm"
                    >
                      <Video size={14} />
                      Start Session
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate(`/session-room/${nearestSession.id}`)}
                    className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-2xs transition hover:bg-violet-700 hover:shadow-sm"
                  >
                    <Video size={14} />
                    Join Session
                  </button>
                )}
              </div>
            </div>

            {/* Additional upcoming sessions */}
            {subsequentSessions.length > 0 && (
              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Later Sessions
                </p>
                {subsequentSessions.map((session) => {
                  const isLearner = session.learnerId === currentUser.id;
                  const otherParty = isLearner
                    ? `with ${session.mentor}`
                    : `with ${session.learnerName || "Learner"}`;

                  return (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => navigate(`/session-details/${session.id}`)}
                      className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-left transition hover:border-violet-200 hover:bg-violet-50/40"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-xs text-slate-800 truncate">
                          {session.topic}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {otherParty} • {session.duration}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-xs font-semibold text-slate-700">
                          {session.date}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {session.time.split("–")[0].split("-")[0].trim()}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingSessions;