import { CalendarDays, Inbox, Search, Sparkles, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import { useWallet } from "@/hooks/useWallet";
import { isInitialRequestExpired, isRescheduleRequestExpired } from "@/utils/sessionTime";

const WelcomeBanner = () => {
  const navigate = useNavigate();
  const { currentUser, sessions, rescheduleRequests } = useSessions();
  const { balance } = useWallet();

  // Incoming pending requests count (initial + reschedule)
  const incomingInitialCount = sessions.filter(
    (s) =>
      s.mentorId === currentUser.id &&
      s.status === "pending" &&
      !isInitialRequestExpired(s)
  ).length;

  const incomingRescheduleCount = rescheduleRequests.filter(
    (r) =>
      r.requestedForId === currentUser.id &&
      r.status === "pending" &&
      !isRescheduleRequestExpired(r)
  ).length;

  const pendingRequestsCount = incomingInitialCount + incomingRescheduleCount;

  return (
    <section className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-500 p-6 sm:p-8 text-white shadow-lg">
      <div className="flex items-center justify-between">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
              <Sparkles size={14} />
              SkillSwap Peer Platform
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              {currentUser.role}
            </span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Welcome back, {currentUser.name} 👋
          </h1>

          <p className="mt-2.5 max-w-xl text-sm sm:text-base text-violet-100">
            Keep learning, keep teaching, and grow your network by exchanging
            skills with fellow students.
          </p>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-violet-700 shadow-sm transition hover:scale-105 hover:bg-violet-50"
            >
              <Search size={16} />
              Explore Skills
            </button>

            <button
              type="button"
              onClick={() => navigate("/my-sessions")}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:bg-white/20"
            >
              <CalendarDays size={16} />
              My Sessions
            </button>

            {pendingRequestsCount > 0 && (
              <button
                type="button"
                onClick={() => navigate("/mentor-requests")}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition hover:scale-105 hover:bg-amber-300"
              >
                <Inbox size={16} />
                <span>Requests</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  {pendingRequestsCount}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => navigate("/wallet")}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:bg-white/20"
            >
              <Wallet size={16} />
              <span>Wallet ({balance} Credits)</span>
            </button>
          </div>
        </div>

        {/* Right Decoration */}
        <div className="hidden lg:flex shrink-0">
          <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white/10 backdrop-blur">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 text-5xl">
              🚀
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;