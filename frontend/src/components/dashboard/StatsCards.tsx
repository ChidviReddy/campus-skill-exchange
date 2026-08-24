import {
  Coins,
  CalendarDays,
  GraduationCap,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import { useSessions } from "@/hooks/useSessions";
import { isSessionExpired } from "@/utils/sessionTime";

const StatsCards = () => {
  const navigate = useNavigate();
  const { balance, totalEarned, totalSpent } = useWallet();
  const { currentUser, sessions, getPendingRescheduleForSession } = useSessions();

  // Upcoming valid unexpired sessions where current user is learner or mentor
  const upcomingCount = sessions.filter(
    (s) =>
      (s.learnerId === currentUser.id || s.mentorId === currentUser.id) &&
      ((s.status === "upcoming" &&
        (!isSessionExpired(s) || Boolean(getPendingRescheduleForSession(s.id)))) ||
        s.isStarted)
  ).length;

  // Sessions taught as mentor (completed only)
  const sessionsTaught = sessions.filter(
    (s) => s.mentorId === currentUser.id && s.status === "completed"
  ).length;

  // Sessions learned as learner (completed only)
  const sessionsLearned = sessions.filter(
    (s) => s.learnerId === currentUser.id && s.status === "completed"
  ).length;

  const stats = [
    {
      title: "Credit Balance",
      value: String(balance),
      subtitle: `${totalEarned > 0 || totalSpent > 0 ? `+${totalEarned} earned / -${totalSpent} spent` : (balance >= 5 ? "Ready for sessions" : "Low balance")}`,
      icon: Coins,
      color: "bg-violet-100 text-violet-700",
      route: "/wallet",
    },
    {
      title: "Upcoming Sessions",
      value: String(upcomingCount),
      subtitle: `${upcomingCount > 0 ? `${upcomingCount} scheduled` : "No upcoming sessions"}`,
      icon: CalendarDays,
      color: "bg-fuchsia-100 text-fuchsia-700",
      route: "/my-sessions",
    },
    {
      title: "Sessions Taught",
      value: String(sessionsTaught),
      subtitle: `${sessionsTaught > 0 ? `+${sessionsTaught * 10} credits earned` : "Share your skills"}`,
      icon: GraduationCap,
      color: "bg-blue-100 text-blue-700",
      route: "/my-sessions",
    },
    {
      title: "Sessions Learned",
      value: String(sessionsLearned),
      subtitle: `${sessionsLearned > 0 ? `${sessionsLearned * 5} credits invested` : "Start learning today"}`,
      icon: BookOpen,
      color: "bg-emerald-100 text-emerald-700",
      route: "/my-sessions",
    },
  ];

  return (
    <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            onClick={() => navigate(stat.route)}
            className="cursor-pointer rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-800">
                  {stat.value}
                </h2>

                <div className="mt-3 flex items-center gap-2">
                  <TrendingUp
                    size={15}
                    className="text-emerald-500"
                  />

                  <span className="text-sm text-slate-500">
                    {stat.subtitle}
                  </span>
                </div>
              </div>

              <div
                className={`rounded-2xl p-4 ${stat.color}`}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default StatsCards;