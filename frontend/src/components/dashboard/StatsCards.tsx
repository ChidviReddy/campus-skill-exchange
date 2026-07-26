import {
  Coins,
  GraduationCap,
  BookOpen,
  Star,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Credit Balance",
    value: "240",
    subtitle: "+15 this week",
    icon: Coins,
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Sessions Taught",
    value: "18",
    subtitle: "3 this month",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Sessions Learned",
    value: "12",
    subtitle: "2 this month",
    icon: BookOpen,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Average Rating",
    value: "4.9",
    subtitle: "Based on 27 reviews",
    icon: Star,
    color: "bg-amber-100 text-amber-700",
  },
];

const StatsCards = () => {
  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
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