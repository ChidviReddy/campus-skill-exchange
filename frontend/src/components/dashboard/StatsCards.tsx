import {
  Coins,
  GraduationCap,
  BookOpen,
  Star,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import { useSessions } from "@/hooks/useSessions";

const StatsCards = () => {
  const navigate = useNavigate();
  const { balance } = useWallet();
  const { currentUser, sessions, getUserRating } = useSessions();

  // Dynamic user calculations
  const ratingData = getUserRating(currentUser.id);

  // Sessions taught as mentor
  const completedTaught = sessions.filter(
    (s) => s.mentorId === currentUser.id && s.status === "completed"
  ).length;
  const totalTaught = Math.max(completedTaught, currentUser.sessionsCount || 0);

  // Sessions learned as student
  const completedLearned = sessions.filter(
    (s) => s.learnerId === currentUser.id && s.status === "completed"
  ).length;

  const stats = [
    {
      title: "Credit Balance",
      value: String(balance),
      subtitle: `${balance >= 5 ? "Ready for sessions" : "Low balance"}`,
      icon: Coins,
      color: "bg-violet-100 text-violet-700",
      route: "/wallet",
    },
    {
      title: "Sessions Taught",
      value: String(totalTaught),
      subtitle: `${totalTaught > 0 ? "+10 credits per session" : "Share your skills"}`,
      icon: GraduationCap,
      color: "bg-blue-100 text-blue-700",
      route: "/my-sessions",
    },
    {
      title: "Sessions Learned",
      value: String(completedLearned),
      subtitle: `${completedLearned > 0 ? "Continuous learning" : "Start learning today"}`,
      icon: BookOpen,
      color: "bg-emerald-100 text-emerald-700",
      route: "/my-sessions",
    },
    {
      title: "Average Rating",
      value: ratingData.reviewCount > 0 ? ratingData.rating.toFixed(1) : (currentUser.rating ? currentUser.rating.toFixed(1) : "5.0"),
      subtitle: `Based on ${ratingData.reviewCount || currentUser.reviewCount || 0} reviews`,
      icon: Star,
      color: "bg-amber-100 text-amber-700",
      route: `/profile/${currentUser.id}`,
    },
  ];

  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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